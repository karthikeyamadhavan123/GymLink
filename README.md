# 🏋️‍♂️ GymLink — Your Gateway to Fitness Connectivity

![React](https://img.shields.io/badge/Frontend-React-blue)
![TailwindCSS](https://img.shields.io/badge/Styles-TailwindCSS-38B2AC)
![Node](https://img.shields.io/badge/Backend-Node.js-43853D)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248)
![License](https://img.shields.io/badge/License-MIT-yellow)

GymLink is a powerful fitness discovery and booking platform that connects **users**, **trainers**, and **gym owners**.  
From finding nearby gyms to booking sessions with certified trainers, GymLink makes fitness accessible with a modern and intuitive interface.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 📖 Overview

GymLink centralizes everything fitness-related in a single platform:

- Discover local gyms based on your preferences
- Connect with trainers and book fitness sessions
- Explore facilities, pricing, and ratings
- Manage your bookings and classes
- Track personalized fitness suggestions
- NEW: **Real-time notifications for users**

Gym owners get a complete dashboard to showcase their services, manage trainers, and track bookings.

---

## ✨ Features

### 🔍 User Features

- Search gyms by location, rating, cost & services
- See trainer profiles with certifications and specialties
- Book workout classes and personal sessions
- Manage dashboard: bookings, favorites, recommendations
- Rate & review gyms
- **🔔 NEW: Real-Time Notifications**
  - Live updates for bookings, messages & trainer responses
  - Unread notifications badge
  - Notification modal with timestamp formatting

---

### 🛠 Admin / Gym Owner Features

- Add and manage gyms
- Add trainers & track their schedules
- Upload images and facility details
- Manage reviews
- Booking insights dashboard

---

### 📱 UI/UX

- Fully responsive
- Smooth transitions
- Mobile-first
- Clean dark theme

---

## 🌐 Demo

👉 **Live Link:** https://gym-link.vercel.app/
Try booking a gym, viewing trainers, or testing notifications!

---

## 🛠 Tech Stack

| Layer    | Technology                     |
| -------- | ------------------------------ |
| Frontend | React.js, Tailwind CSS, Axios  |
| Backend  | Node.js, Express.js            |
| Database | MongoDB Atlas                  |
| Auth     | Firebase Auth / JWT            |
| Storage  | Cloudinary                     |
| Hosting  | Vercel / Render                |
| Others   | React Router, Formik, Toastify |

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/karthikeyamadhavan123/GymLink.git
cd gymlink

# Install dependencies
npm install

# Start development server
npm run dev

Backend Env

MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret_key


🔥 Upcoming in V2.0.0
These features are currently under development and will be released in V2.0.0:
✔ Chat system
✔ Partner matching system
✔ Kanban board for users to track fitness tasks
✔ Codebase cleaning & optimization


🚀 Future Enhancements
Features planned after the V2.0.0 release:
🤖 AI-powered fitness recommendation system
🌎 Multi-language support

🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to fork the repo and submit a PR.

📄 License
This project is licensed under the MIT License.
```
