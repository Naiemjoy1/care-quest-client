# CareQuest

A robust full-stack web application designed to effectively manage appointments, patient records, test results, and administrative tasks for a diagnostic center.

## Table of Contents

- [Live Site URL](#live-site-url)
- [Admin Credentials](#admin-credentials)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Packages](#packages)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [Commits](#commits)

## Live Site URL

[Visit the live site](https://care-quest-2ae20.web.app/)

## Admin Credentials

- **Email:** admin@carequest.com
- **Password:** Dh@ka6653

## User Credentials

- **Email:** user@carequest.com
- **Password:** Dh@ka6653

## Features

### User

- Create user
- Book test
- Payment
- Cancel booking
- Dashboard
- Update profile
- Track all appointments
- Track test results

### Admin

- Create user
- Book test
- Payment
- Cancel booking
- Dashboard
- Track all users' appointments
- Track all users
- Delete users
- Update user status
- Delete booking
- Submit report
- Add feedback
- Add banner
- Change banner

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase Authentication
- **Payment:** Stripe
- **State Management:** Tanstack Query
- **PDF Generation:** jsPDF

## Packages

### Client Side

- **proptype:** Runtime type checking for React props and similar objects.
- **react-icon:** Popular icon library for React.
- **hook-form:** Performant, flexible, and extensible forms with easy-to-use validation.
- **toast:** Toast notifications for React.
- **swiper slider:** Modern touch slider.
- **dotenv:** Loads environment variables from a .env file into process.env.
- **leaflet:** Open-source JavaScript library for mobile-friendly interactive maps.
- **datepicker:** React date picker component.
- **modal:** React modal component.
- **material-ui:** React components for faster and easier web development.
- **axios:** Promise based HTTP client for the browser and node.js.
- **moment.js:** Parse, validate, manipulate, and display dates and times in JavaScript.
- **jsonwebtoken:** Implementation of JSON Web Tokens.
- **react-router-dom:** Routing library for React applications.
- **tailwindcss:** Utility-first CSS framework.
- **daisyui:** Tailwind CSS components.
- **cookie-parser:** Parse HTTP request cookies.
- **react-helmet:** Reusable React component to manage changes to the document head.
- **helmet:** Helps secure Express apps by setting various HTTP headers.

### Server Side

- **express:** Fast, unopinionated, minimalist web framework for Node.js.
- **mongoose:** MongoDB object modeling tool designed to work in an asynchronous environment.
- **jsonwebtoken:** Implementation of JSON Web Tokens.
- **cors:** Middleware for enabling CORS (Cross-Origin Resource Sharing).
- **bcryptjs:** Library to hash and compare passwords.
- **stripe:** Node.js library for the Stripe API.
- **dotenv:** Loads environment variables from a .env file into process.env.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/programming-hero-web-course1/b9a12-client-side-Naiemjoy1
   git clone https://github.com/programming-hero-web-course1/b9a12-server-side-Naiemjoy1
   ```

2. Navigate to the client directory and install dependencies:

   ```sh
   cd b9a12-client-side-Naiemjoy1
   npm install
   ```

3. Navigate to the server directory and install dependencies:

   ```sh
   cd ../b9a12-server-side-Naiemjoy1
   npm install
   ```

### Running the Application

1. Start the client:

   ```sh
   cd ../b9a12-client-side-Naiemjoy1
   npm start
   ```

2. Start the server:

   ```sh
   cd ../b9a12-server-side-Naiemjoy1
   npm start
   ```

## Environment Variables

Create a `.env` file in both the client and server directories with the following variables:

### Client

REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
REACT_APP_IMAGEBB_API_KEY=your_imagebb_api_key
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key

### Server

MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

## Folder Structure

diagnostic-center-management-system/
├── client/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── pages/
│ │ ├── App.js
│ │ ├── index.js
│ │ ├── ...
├── server/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── app.js
│ ├── server.js
│ ├── ...

## Commits

### Client Side

1. Initial commit
2. Setup React project
3. Add authentication with Firebase
4. Create user registration form
5. Implement user login
6. Add user dashboard structure
7. Create profile management page
8. Setup appointments management
9. Setup test results view
10. Design homepage layout
11. Add dynamic banner feature
12. Display featured tests
13. Add personalized recommendations
14. Create all tests page
15. Implement test booking functionality
16. Integrate Stripe payment
17. Build admin dashboard layout
18. Manage users in admin dashboard
19. Add test management in admin dashboard
20. Setup statistics page

### Server Side

1. Initial commit
2. Setup Node.js server
3. Connect to MongoDB
4. Create user model
5. Create test model
6. Setup user authentication routes
7. Implement user registration
8. Implement user login
9. Create appointments routes
10. Create test results routes
11. Setup admin routes for user management
12. Setup admin routes for test management

### Topics

- `healthcare`
- `diagnostics`
- `web-development`
- `react`
- `nodejs`
- `express`
- `mongodb`
- `firebase`
- `authentication`
- `stripe`
- `tailwindcss`
- `jsPDF`
- `admin-dashboard`
- `user-management`

---

By following the instructions above, you can set up and run the CareQuest Diagnostic Center Management System on your local machine.
