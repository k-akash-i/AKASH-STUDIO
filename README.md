# Akash Studio Academy - Local Setup Guide

This project is a high-precision digital art vault and academy built with React, Vite, Tailwind CSS, and Firebase.

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: Ensure you have Node.js 18+ installed.
- **Firebase Project**: You need a Firebase project to handle authentication and real-time community chat.

### 2. Local Installation
```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```
The app will be available at `http://localhost:3000`.

### 3. Firebase Configuration
The application relies on `firebase-applet-config.json` in the root directory. This contains your project's credentials.

**IMPORTANT: Enable Authentication Methods**
To make login work on your local machine:
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project.
3. Go to **Authentication** > **Settings** > **Authorized Domains**.
   - Click **Add Domain** and enter `localhost`.
4. Go to **Authentication** > **Sign-in method**.
   - **Email/Password**: Click **Add new provider**, select **Email/Password**, and enable it.
   - **Google**: Click **Add new provider**, select **Google**, and enable it (ensure the Web SDK configuration matches your project).

### 4. Code Structure
- `/src/components/Academy.tsx`: The private academy logic and curriculum.
- `/src/components/Vault.tsx`: The high-DPI masterpiece display system.
- `/src/lib/firebase.ts`: Core connectivity and auth logic.
- `/firestore.rules`: Security rules for your database.

### 5. Deployment
To build for production:
```bash
npm run build
```
The static files will be generated in the `dist/` directory.

---
*Created with Pure Logic and Presence.*
