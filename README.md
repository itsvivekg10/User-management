src/
├── assets/                # Static assets (images, icons, etc.)
├── components/            # Reusable components
│   ├── Loader.jsx
│   ├── Loader.css
│   ├── NavBar.jsx
│   └── NavBar.css
│   ├── UserForm.jsx
│   └── UserForm.css
├── pages/                 # Application pages
│   ├── App.jsx
│   ├── App.css
├── firebaseConfig.js      # Firebase configuration
├── index.css              # Global styles
└── main.jsx               # Application entry point
Features

Add User – Fill out a form to add new users to the Firebase Realtime Database.

View User – View individual user details.

Delete User – Remove users from both the UI and database.

Live Data Updates – Real-time updates using Firebase onValue subscriptions.

Error Handling – Displays errors and allows retrying data fetch.

Loader – Shows loading spinner during data fetch operations.

Responsive UI – Works well on desktop and mobile screens.

🛠 Technologies Used

React.js – Frontend library for building UI components.

Firebase Realtime Database – Backend for storing user data.

React Router DOM – Routing between pages.

CSS – Styling components and pages.

Vite – Development and build tool for fast project setup.

🚀 Installation

Clone the repository

git clone <repository-url>
cd user-management-app


Install dependencies

npm install


Configure Firebase

Create a Firebase project at Firebase Console
.

Enable Realtime Database.

Copy your Firebase config and replace in firebaseConfig.js:

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "<YOUR_API_KEY>",
  authDomain: "<YOUR_AUTH_DOMAIN>",
  databaseURL: "<YOUR_DATABASE_URL>",
  projectId: "<YOUR_PROJECT_ID>",
  storageBucket: "<YOUR_STORAGE_BUCKET>",
  messagingSenderId: "<YOUR_SENDER_ID>",
  appId: "<YOUR_APP_ID>"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
