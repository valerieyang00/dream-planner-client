import {useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';



ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);


export default function MyDashboard({expenses, destinationId}) {
    const [data, setData] = useState({
        labels: ['Transportation', 'Lodging', 'Food', 'Activities', 'Miscellaneous'],
        datasets: [],
      })
      
    //   const options = {
    //     indexAxis : 'y',
    //     elements: {
    //       bar: {
    //         borderWidth: 2,
    //       },
    //     },
    //     responsive: true,
    //     plugins: {
    //       legend: {
    //         position: 'right',
    //       },
    //       title: {
    //         display: true,
    //         text: 'Chart.js Horizontal Bar Chart',
    //       },
    //     },
    //   };
      
    //   const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      
    //   const totalData = {
    //     labels,
    //     datasets: [
    //       {
    //         label: 'Dataset 1',
    //         data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    //         borderColor: 'rgb(255, 99, 132)',
    //         backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //       },
    //       {
    //         label: 'Dataset 2',
    //         data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    //         borderColor: 'rgb(53, 162, 235)',
    //         backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //       },
    //     ],
    //   };
    
      useEffect (() => {

        const transportation = expenses.filter(expense => expense.category == 'transportation')
        const lodging = expenses.filter(expense => expense.category == 'lodging')
        const food = expenses.filter(expense => expense.category == 'food')
        const activities = expenses.filter(expense => expense.category == 'activities')
        const misc = expenses.filter(expense => expense.category == 'misc')

        const sumTrans = transportation.reduce((amount,expense) => amount + expense.amount, 0)
     
        const sumFood = food.reduce((amount,expense) => amount + expense.amount, 0)
     
        const sumLodging = lodging.reduce((amount,expense) => amount + expense.amount, 0)
     
        const sumActivities = activities.reduce((amount,expense) => amount + expense.amount, 0)
     
        const sumMisc = misc.reduce((amount,expense) => amount + expense.amount, 0) 

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

        setData({...data, datasets: datasetChange})       
                 

    },[expenses, destinationId])

    return (
        <div>
            {/* <Bar options={options} data={totalData} /> */}
            <Doughnut data={data} />       
        </div>
    )
}