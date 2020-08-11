
# Project Overview

<h2> Gig App </h2>

## Project Description

Gig is a React/Ruby-on-Rails application which allows independent contractors, self-employed individuals and any gig-economy workers to schedule work and track their monthly income and upcoming gigs. While there are many calendar/budget apps on the market, Gig's primary focus is to make conducting business more efficient and easy in the new gig economy. It's simple. Whether you're a touring musician, web developer or event photographer, Gig will make your life easier.

## Project Links

- [Git Repo](https://github.com/tylerdavisgit/gig-app)
- [Front-End Git Repo](https://github.com/tylerdavisgit/gig-front-end)
- [Back-End Git Repo](https://github.com/tylerdavisgit/gig-back-end)

## Deployment Links

- [Front-End]()
- [Back-End]()

## Wireframes

- [Landing/Login](https://res.cloudinary.com/tylerdavisfilms/image/upload/v1597066456/GIG%20APP%20-%20SEIR%20FINAL%20PROJECT/WireFrames/Landing_Signup_Login_cydfjz.png)
- [Sign-Up](https://res.cloudinary.com/tylerdavisfilms/image/upload/v1597066764/GIG%20APP%20-%20SEIR%20FINAL%20PROJECT/WireFrames/SignUp_gour5f.png)
- [Menu/Dashboard](https://res.cloudinary.com/tylerdavisfilms/image/upload/v1597066456/GIG%20APP%20-%20SEIR%20FINAL%20PROJECT/WireFrames/Menu_Dashboard_wwlzzk.png)
- [Calendar Home/Month](https://res.cloudinary.com/tylerdavisfilms/image/upload/v1597066456/GIG%20APP%20-%20SEIR%20FINAL%20PROJECT/WireFrames/Month_Home_View_izi32l.png)
- [Gig Form](https://res.cloudinary.com/tylerdavisfilms/image/upload/v1597066995/GIG%20APP%20-%20SEIR%20FINAL%20PROJECT/WireFrames/NewGig_EditGig_w4mta9.png)
- [Week](https://res.cloudinary.com/tylerdavisfilms/image/upload/v1597066456/GIG%20APP%20-%20SEIR%20FINAL%20PROJECT/WireFrames/Week_View_xhmlm6.png)

### React Structure

[Component Chain]()

### User Stories

- Users want to easily keep track of their scheduled monthly income, even though they don't have a steady 9-5 job.
- Users want to breakdown their income on a yearly, monthly, weekly and daily basis.
- Users want to view their work schedule and track their income at the same time.
- Users want to easily add and delete gigs from their schedule and see their income tracker automatically update.
- Users wants to be able to delete their account if they so choose.

### MVP/PostMVP

#### MVP

- A calendar app with full CRUD functionality for adding, editing and deleting gigs.
- User authentication, sign-in, sign-out.
- The calendar must calculate the gigs scheduled for each year, month and week and display the total prominently when viewing the respective components.
- Must be responsive and mobile-first

#### PostMVP

- Allow users to also have a way to track hired workers so the income tracks payments coming in and out. Would be great for event planners who contract other independent workers.
- Allow users to search for and connect with other independent contractors.

## Components

| Component           |                                                                                                                 Description                                                                                                                 |
| ------------------- | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| App                 |                                                       Makes the initial data pull and includes React Router. This will be the landing page with the site title. Contains navigation.                                                        |
| Landing             |                                                                        Contains a welcome card with the site title, and a link to the sign-up form and log-in page.                                                                         |
| Signup              |                                                     User can sign up and provide email, name, job title(Photographer, Musician, Planner, Web Developer, etc.). Must create a password.                                                      |
| Login               |                                                                                                  Shows input fields for login credentials.                                                                                                  |
| Menu/Dashboard      | The menu/dashboard will show links to view month, week, or day. It will also show a breakdown scheduled income for the current year, month and week. It will also have a log out/delete account option. As well as an edit profile feature. |
| Calendar Home/Month |                    Displays a calendar in month view with a running total for the monthly income at the top of the page. Any days with gigs scheduled will show the name of the gig and the amount scheduled to be paid.                    |
| Week                |                                                                                   Week view shows a weekly breakdown of the gigs scheduled for the week.                                                                                    |
| Day                 |                                                                              Day view shows a breakdown of the gigs scheduled for the day with more specifics.                                                                              |
| Gig Form            |                                                                                 Where users can enter/edit gig info. Must include a name, date/time, price                                                                                  |

## Time Priority Table

| Component      | Priority | Estimated Time | Time Invested | Actual Time |
| -------------- | :------: | :------------: | :-----------: | :---------: |
| Planning       |    H     |     12hrs      |               |             |
| App            |    H     |      4hrs      |               |             |
| Landing        |    H     |      2hrs      |               |             |
| Sign-Up        |    H     |      8hrs      |               |             |
| Login          |    H     |      3hrs      |               |             |
| Menu/Dashboard |    H     |     12hrs      |               |             |
| Calendar/Home  |    H     |     18hrs      |               |             |
| Week           |    H     |      5hrs      |               |             |
| Day            |    H     |      5hrs      |               |             |
| Authentication |    H     |      8hrs      |               |             |
| Styling        |    M     |      8hrs      |               |             |
| Total          |          |     85hrs      |               |             |

## Additional Libraries/Tools

SCSS, AuthO or Bcrypt(potnentially)
