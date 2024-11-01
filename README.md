# Curvtte Frontend

This repository contains the frontend code for the **Curvtte** job posting board application. It is built with **React**, **TypeScript**, and **Redux Toolkit**, with styling managed through **Tailwind CSS**.

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Features](#features)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Tech Stack](#tech-stack)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yslati/cuvette
   ```
2. Navigate to the project directory:
   ```bash
   cd cuvette
   ```
3. Install dependencies:
   ```bash
   npm i
   ```

## Scripts

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the project for production.
- **`npm run preview`**: Runs the production build locally.
- **`npm run lint`**: Lints the project files with ESLint.

## Features

- **Authentication**: Registration and login with email and phone OTP verification.
- **Job Management**: Create, view, and manage job postings.
- **Secure Routes**: Implemented private routes to restrict access to specific pages.
- **Redux Toolkit**: Manages global state, including auth and job data.

## Project Structure

```plaintext
src/
├── app/
│   ├── hooks.ts                 # Custom hooks
│   ├── store.ts                 # Redux store configuration
│
├── components/                  # Shared components (e.g., Loading, PrivateRoute)
│
├── features/                    # Redux slices
│   ├── authSlice.ts             # Authentication-related state
│   └── jobsSlice.ts             # Job posting-related state
│
├── fonts/                       # Fonts
│
├── pages/                       # Pages
│   ├── auth/                    # Authentication pages (Login, Register, VerifyOtp)
│   ├── Job/                     # Job-related pages (AddJob, JobsList)
│   ├── Dashboard.tsx            # Dashboard page
│   ├── Home.tsx                 # Home page
│   ├── Navbar.tsx               # Navbar
│   └── NotFound.tsx             # 404 page
│
├── types/                       # TypeScript types (e.g., Job, Company)
│
└── utils/                       # Utility functions
    └── axiosConfig.ts           # Axios instance configuration
```

## Project Structure

- **App.tsx**: Main component that includes routing and global configurations.
- **PrivateRoute**: Higher-order component that ensures only authenticated users access certain routes.
- **VerifyOtp**: Component for OTP verification.
- **Dashboard.tsx**: Dashboard page.
- **Auth Slice**: Manages authentication state, including actions like login, registration, and OTP verification.
- **Job Slice**: Manages job posting state, including actions to post and fetch jobs.

## Tech Stack

- **React**: React 18 with TypeScript for robust frontend development.
- **Redux Toolkit**: for efficient state management.
- **React Router**: v6 for client-side routing.
- **Tailwind CSS**: for styling and utility classes.
- **Axios**: for handling HTTP requests.
- **Vite**: for fast bundling and building.

## Author

- Yassin Slati
