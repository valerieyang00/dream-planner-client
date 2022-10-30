# Dream Planner
Everyone has a dream vacation in their bucketlist.  We're here to bring those dreams closer to reality with a budget tracker.  Users can post and share their dream vacation and calculate how much they need to save each week.  Once the user goes on their vacation, they can add actual expenses to the trips.

Users can share their expenses to others to help other see how much it really costs.  

## Team Members
- VSPD - Valerie, Sean, Prija, Devin

## User Stories
* User can create, read, update, and delete their profile
* User can create, read, update, and delete their destination details.
* User can create, read, update, and delete an expense from a destination.
* User can estimate how much to save weekly based on budged and expected travel date.
* User can mark/unmark trip as completed.
* User can access the app on any device

## Installation
* Fork and clone this repository
* Nagivate to the cloned repository in your terminal. Run the command ```npm i``` to install all of the packages needed to run this app.
* You will need to add a local file for functionality. In your terminal in the same location as above, run the following command: ```touch .env.local```
* In the ```.gitignore``` file, add ```.env.local```
* In the ```.env.local``` file, you need to set your router variable. Enter the following:
```
REACT_APP_SERVER_URL=http://localhost:8000
```
* You're all set! Run the command ```npm run start``` in your terminal and your client is ready to go.
* Enjoy planning your dreams!

## Snapshot 
![Main Layout](/img/main.png)
![Sign Layout](/img/signin.png)
![Profile Layout](/img/dream.png)

## Wireframes
![Route](/img/hierarchy1.png) 
![Route](/img/hierarchy2.png) 
![Route](/img/hierarchy3.png) 

## ERDs
![ERD](/img/erdlayout.png)

## RESTful Routes

### User
| HTTP METHOD | URL              | CRUD    | Response                              |
| ----------- | ---------------- | ------- | ------------------------------------- |
| GET | `/users/:userId` | READ | return a specific user profile |
| POST | `/users/register` | CREATE | create a user profile |
| PUT | `/users/:userId` | UPDATE | update a user profile in the database |
| DELETE | `/users/:userId` | DESTROY | delete a user profile |


### Dream Destination
| HTTP METHOD | URL              | CRUD    | Response                              |
| ----------- | ---------------- | ------- | ------------------------------------- |
| GET | `/users/:userId/destinations` | READ | see a specific destination |
| POST | `/users/:userId/destinations/:destinationId` | CREATE | add destination to profile |
| PUT | `/users/:userId/destinations/:destinationId` | UPDATE | ability to edit destination |
| DELETE | `/users/:userId/destinations/:destinationId` | DESTROY | delete destination details |


### Expense
| HTTP METHOD | URL              | CRUD    | Response                              |
| ----------- | ---------------- | ------- | ------------------------------------- |
| GET | `/destinations/:destinationId/expense` | READ | return all expenses for a destination |
| GET | `/:destinationId/expense/:expenseId` | READ | return a specific expense |
| POST | `/destinations/:destinationId/expense` | CREATE | create a expense |
| PUT | `/destinations/:destinationId/expense/:expenseId` | UPDATE | update an expense | 
| DELETE | `/destinations/:destinationId/courses/:expenseId` | DESTROY | delete an expense  |


## Daily Sprints
Day 1 
- Set up both server and client repos
- Set up User auth and database models on django/psql

Day 2
- Set up all backend and frontend routes and API calls
- Initial setup of all components on Client side
- Research dashboard options
- Research API's


Day 3
- Client side views
- Dashboards
- Seeder info

Day 4
- Styling with tailwind
- Finalize all functionalities included in MVP
- Stretch goals (if possible)

Day 5
- Continue Styling
- Test/Debug
- Stretch goals (if possible)

Day6
- Deployment
- Test/Debug

## Tech Stack Used
- Django
- React
- Node.js
- Python
- PostgreSQL
- JavaScript
- Git and GitHub
- Tailwind
- Axios

## MVP goals
- [x] User can create, read update, delete profile
- [x] User can create, read, update, delete destination details.
- [x] User can create, read, update, delete expense from a destination.
- [x] Learn Django for react
- [x] Wire Framing
- [x] Task Tracking
- [x] CSS - Tailwind 

## Stretch Goals
- [ ] API 
- [x] Expense Dashboard
- [ ] Social Page (view friends)
- [ ] Profile Photo
- [ ] Comments


## Major Hurdles 
TBD - post project review
