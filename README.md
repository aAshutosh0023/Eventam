# Event Management Application

## Overview

The Event Management Application is a web-based platform designed to manage events efficiently. It allows users to register, log in, and perform CRUD (Create, Read, Update, Delete) operations on events. Additionally, it integrates weather data using an external API to provide real-time weather conditions for event locations.

This application is deployed on Render. You can access the live application at the following link:
https://eventam.onrender.com/

## Features

- **User Registration**: Users can sign up with their name, email, and password. The application uses Supabase for authentication and manages user sessions.
- **User Login**: Registered users can log in using their email and password. Successful login redirects users to their home page.
- **Create Event**: Users can create new events by providing details such as event name, date, and location.
- **Update Event**: Users can update the details of existing events.
- **Delete Event**: Users can delete events they have created.
- **Session Storing**: User sessions are managed to ensure secure and personalized experiences.
- **Weather Conditions**: The application integrates with the OpenWeatherMap API to fetch and display real-time weather conditions for event locations.

## Tech Stack

- **Frontend**:
  - EJS (Embedded JavaScript) for templating
  - Bootstrap for styling

- **Backend**:
  - Node.js
  - Express.js

- **Database**:
  - MongoDB (Hosted on MongoDB Atlas)

- **Authentication**:
  - Supabase (For user registration and login)

- **APIs**:
  - OpenWeatherMap API (For weather information)

- **Middleware**:
  - Express-session for session management
  - Connect-flash for flash messaging


## API Endpoints
- **User Routes**:
  - POST /register: Registers a new user with name, email, and password.
  - POST /login: Logs in a user with email and password.
  - GET /logout: Logs out the current user and destroys the session.

- **Event Routes**
   - GET /events: Lists all events.
   - POST /events: Creates a new event.
   - GET /events/:id: Retrieves details of a specific event.
   - PUT /events/:id: Updates an existing event.
   - DELETE /events/:id: Deletes a specific event.

-**Session Routes**
   - GET /sessions: Retrieves the current session details.

-**Weather Routes**
   - GET /weather: Fetches the current weather for a specified location.

### Prerequisites

- Node.js
- npm
- MongoDB Atlas account (for database hosting)
- Supabase account (for authentication)



