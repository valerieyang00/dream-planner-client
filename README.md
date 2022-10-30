# Dream Planner
Everyone has a dream vacation in their bucketlist.  We're here to bring those dreams closer to reality with a budget tracker.  Users can post and share their dream vacation and calculate how much they need to save each week.  Once the user goes on their vacation, they can add actual expenses to the trips and monitor their expenses against their budget.

 

## Team Members
- VSPD - Valerie, Sean, Prija, Devin

## User Stories
* User can create, read, update, and delete their profile
* User can create, read, update, and delete their destination details.
* User can create, read, update, and delete an expense from a destination.
* User can estimate how much to save weekly based on budget and expected travel date.
* User can mark/unmark trip as completed.
* User can access the app on any device.

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
| GET | `/users/:userId` | READ | Return a specific user profile |
| POST | `/users/register` | CREATE | Create a user profile |
| PUT | `/users/:userId` | UPDATE | Update a user profile in the database |
| DELETE | `/users/:userId` | DESTROY | Delete a user profile |


### Dream Destination
| HTTP METHOD | URL              | CRUD    | Response                              |
| ----------- | ---------------- | ------- | ------------------------------------- |
| GET | `/destinations` | READ | See a specific destination |
| POST | `/destinations/:destinationId` | CREATE | Add destination to profile |
| PUT | `/destinations/:destinationId/edit` | UPDATE | Ability to edit destination |
| DELETE | `/destinations/:destinationId/edit` | DESTROY | Delete destination details |


### Expense
| HTTP METHOD | URL              | CRUD    | Response                              |
| ----------- | ---------------- | ------- | ------------------------------------- |
| GET | `/destinations/:destinationId` | READ | Return expenses for a destination |
| POST | `/destinations/:destinationId/expenses/new` | CREATE | Create an expense |
| PUT | `/destinations/:destinationId/expense/:expenseId/edit` | UPDATE | Update an expense | 
| DELETE | `/destinations/:destinationId/` | DESTROY | Delete an expense  |


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
- [x] User can create, read update, and delete their profile.
- [x] User can create, read, update, and delete their destination details.
- [x] User can create, read, update, and delete an expense from their destination.
- [x] Learn Django for react
- [x] Wire Framing
- [x] Task Tracking
- [x] CSS - Tailwind 

## Stretch Goals
- [x] Dark Mode
- [x] Expense Dashboard
- [x] Mobile Responsive
- [x] Weekly Saving Estimate (based on budget and expected travel date)
- [ ] API 
- [ ] Social Page (view friends)
- [ ] Profile Photo
- [ ] Comments


## Major Hurdles 
* Django user auth
* Tailwind/Carousel
* Mobile responsiveness
