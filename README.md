# Kipas Pintar (IoT Smart Fan Dashboard)

A feature-rich IoT dashboard web application to monitor and control a smart fan system. Built with modern web technologies, this dashboard provides real-time interactions with hardware devices via Firebase.

## 🌟 Features

- **🔐 Secure Authentication**: User login and session management powered by Firebase Authentication.
- **📊 Real-time Monitoring**: Live visualization of sensor data including current room temperature and motion detection (PIR sensor).
- **⚙️ Dynamic Operation Modes**:
  - **Manual Mode**: Direct control to toggle the fan ON or OFF.
  - **Auto Mode**: Intelligent operation where the fan turns on only if motion is detected (PIR) **and** the room temperature exceeds a user-defined minimum threshold.
  - **Timer Mode**: Scheduled operation allowing users to set specific "Time On" (Waktu Nyala) and "Time Off" (Waktu Mati) in hours and minutes.
- **📝 Activity Log**: Comprehensive tracking system that records user actions such as mode changes, relay toggles, and setting updates.
- **🌗 Modern UI/UX**: Responsive design with light and dark mode support, utilizing smooth transitions and clear visual indicators.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database & Auth**: [Firebase](https://firebase.google.com/) (Realtime Database & Authentication)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed (v18 or higher recommended). You will also need a Firebase project set up with Realtime Database and Authentication enabled.

### 1. Clone & Install
Clone the repository and install the dependencies:
```bash
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root directory and add your Firebase configuration:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
```

### 3. Run the Development Server
Start the Next.js development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📂 Project Structure

- `/components`: Reusable UI components (e.g., ModeControl, SensorDisplay, ActivityLog).
- `/app`: Next.js App Router pages and layouts.
- `/public`: Static assets.

## 📄 License
This project is for educational and portfolio purposes.
