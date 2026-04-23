# 📝 Task Manager (Full-Stack MERN App)

🔗 **Live Demo:** https://task-manager-w5yw.onrender.com

---

## 🚀 Overview

Task Manager is a full-stack web application that allows users to manage their daily tasks efficiently. It includes authentication, task creation, editing, deletion, filtering, and real-time updates.

This project demonstrates **full-stack development using Node.js, Express, MongoDB, and React (Vite)** with secure authentication using JWT.

---

## ✨ Features

* 🔐 User Authentication (Signup/Login)
* 🧾 Create, Read, Update, Delete (CRUD) Tasks
* ✅ Mark tasks as completed / pending
* ✏️ Edit tasks inline
* 🔍 Search tasks
* 📊 Dashboard stats (Total, Completed, Pending)
* ⚡ Mark all tasks as completed
* 🔒 Protected routes with JWT
* 🎨 Clean UI with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt (Password hashing)

---

## 🧱 Project Structure

```
task-manager/
│
├── backend/
│   ├── controllers/
│   │   └── ...
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── public/              # (optional, can be removed if not used)
│   │   └── index.html
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── dist/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── .gitignore
└── README.md

---

## ⚙️ Installation (Local Setup)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/mir-sajad-01/Task-Manager.git
cd Task-Manager
```

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
npm run build
```

---

### 4️⃣ Move build to backend

```bash
Move frontend/dist → backend/public
```

---

### 5️⃣ Run Project

```bash
cd ../backend
npm start
```

Open:

```
http://localhost:5000
```

---

## 🌐 Deployment

This project is deployed on **Render** as a full-stack application.

* Frontend is built and served via Express
* Backend APIs and frontend run on the same server
* Environment variables configured on Render

---

## 🔐 Authentication Flow

1. User signs up → data stored in MongoDB
2. User logs in → JWT token generated
3. Token stored in localStorage
4. Protected routes validate token via middleware

---


## 🧠 What I Learned

* Full-stack architecture (frontend + backend integration)
* JWT authentication & route protection
* REST API design
* Deployment on Render
* Handling real-world bugs (routing, CORS, build issues)

---

## 📌 Future Improvements

* Pagination for tasks
* Task categories & priorities
* Notifications for due tasks
* Dark mode toggle
* Drag & drop tasks

---

## 👨‍💻 Author

**SAJAD BASHIR MIR**

* GitHub: https://github.com/mir-sajad-01

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
