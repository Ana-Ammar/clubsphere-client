# ClubSphere 🎯

ClubSphere is a full-stack club and event management platform where users can discover clubs, join memberships, register for events, and make secure payments. It supports role-based dashboards for **Admin**, **Club Manager**, and **Members**, ensuring smooth management and a great user experience.

---

## 🌐 Live Website
👉 https://clubsphere-web.web.app 


---

## 🗂️ Repositories  
- **Server (Backend):** https://github.com/Ana-Ammar/clubsphere-server.git 

---

## 🧩 Features

### 👤 User (Member)
- Browse approved clubs
- Search & filter clubs by name and category
- Join clubs via secure Stripe payment
- Register for club events (members only)
- View joined clubs & registered events
- Personalized member dashboard

### 🧑‍💼 Club Manager
- Create and manage clubs
- Add, update, and delete events
- View total event registrations
- View club payments & member details
- Manager-specific dashboard with analytics

### 🛡️ Admin
- Manage users (role-based control)
- Approve / reject clubs
- Platform overview (users, clubs, events, members)
- Admin dashboard with summaries

---

## 🔐 Authentication & Authorization
- Firebase Authentication
- Role-based access (Admin / Manager / Member)
- Secure API routes using middleware

---

## 💳 Payment System
- Stripe Checkout Integration
- Membership-based club joining
- Payment history tracking

---

## 🛠️ Technologies Used

### Frontend
- React
- React Router
- TanStack Query (React Query)
- Axios (Custom Secure Instance)
- Tailwind CSS
- DaisyUI
- Framer Motion
- React Icons
- SweetAlert2

### Backend
- Node.js
- Express.js
- MongoDB
- Firebase Admin SDK
- Stripe API

---

## 🔍 Search, Filter & Sorting
- Search clubs by name
- Filter clubs by category
- Server-side filtering with MongoDB
- Optimized API queries

---

## 📊 Dashboards
- **Admin Dashboard:** platform statistics & controls
- **Manager Dashboard:** club payments, event registrations
- **Member Dashboard:** joined clubs & events

---

## 📁 Project Structure (Client)

```
/src
├── components
├── hooks
├── layouts
├── pages
├── routes
└── main.jsx
```

---


