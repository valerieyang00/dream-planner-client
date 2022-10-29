import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';




ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);


export default function MyDashboard({ expenses, budget, destinationId }) {
    const [data, setData] = useState({
        labels: ['Transportation', 'Lodging', 'Food', 'Activities', 'Miscellaneous'],
        datasets: [],
    })

    const optionsBar = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
  
        responsive: true,
        plugins: {
            datalabels: {
                display: true,
            },
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'Total Expenses VS Budget',
            },
        },
    };
    const options = {
        responsive: true,
        plugins: {
            datalabels: {
                display: true,
            },
            legend: {
                position: 'left',
            },
            title: {
                display: false,
                text: 'Total Expenses by Category',
            },
        },
    };

    const labels = [''];

    const [totalData, setTotalData] = useState({
        labels,
        datasets: [],
    })

    useEffect(() => {

        const transportation = expenses.filter(expense => expense.category == 'transportation')
        const lodging = expenses.filter(expense => expense.category == 'lodging')
        const food = expenses.filter(expense => expense.category == 'food')
        const activities = expenses.filter(expense => expense.category == 'activities')
        const misc = expenses.filter(expense => expense.category == 'misc')

        const sumTrans = transportation.reduce((amount, expense) => amount + expense.amount, 0)

        const sumFood = food.reduce((amount, expense) => amount + expense.amount, 0)

        const sumLodging = lodging.reduce((amount, expense) => amount + expense.amount, 0)

        const sumActivities = activities.reduce((amount, expense) => amount + expense.amount, 0)

        const sumMisc = misc.reduce((amount, expense) => amount + expense.amount, 0)

        const totalExp = sumTrans + sumFood + sumLodging + sumActivities + sumMisc


        const datasetChange = [
            {
                label: 'Total Expenses by Category',
                data: [sumTrans, sumLodging, sumFood, sumActivities, sumMisc],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ]

        const totalDataChange = [{
            label: 'Total Expenses',
            data: labels.map(() => totalExp),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Budget',
            data: labels.map(() => budget),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        ]

        setData({ ...data, datasets: datasetChange })
        setTotalData({ ...totalData, datasets: totalDataChange })


    }, [expenses, destinationId])

    return (
        <div className="flex justify-center">
            <div className="rounded-lg shadow-lg bg-stone-100 max-w-lg" style={{margin: "1vw"}} >
                <div className="p-6">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">Expenses by Type</h5>
                    <div style={{width: "27rem"}}>
                        <Doughnut options={options} data={data} />
                    </div>
                </div>
            </div>
            <div className="rounded-lg shadow-lg bg-stone-100 max-w-lg" style={{margin: "1vw"}}>
                <div className="p-6">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">Total Expenses vs Budget</h5>
                    <div style={{marginTop: "5rem", width: "27rem"}}>
                        <Bar options={optionsBar} data={totalData} />
                    </div>
                </div>
            </div>
        </div>
    )
}