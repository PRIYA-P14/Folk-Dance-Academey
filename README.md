# Folk Dance Academy

A full-stack MERN (MongoDB, Express, React, Node.js) web application for a folk dance academy. This platform allows users to browse dance classes, learn about different folk dance styles, and enroll in classes.

## Features

- 🎭 Browse various folk dance classes from different cultures
- 📝 Online enrollment system
- 💼 Responsive design for all devices
- 🌐 RESTful API for managing classes and enrollments
- 📊 Class details including instructor, schedule, level, and pricing
- 👥 About and Contact pages

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- CSS3 for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- CORS enabled
- Environment variables with dotenv

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/PRIYA-P14/Folk-Dance-Academey.git
cd Folk-Dance-Academey
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (if not exists) and configure MongoDB URI
# The default connection string is: mongodb://localhost:27017/folkdanceacademy
# You can modify it in the .env file

# Seed the database with sample data
npm run seed

# Start the backend server
npm start
# or for development with auto-reload
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file (if not exists)
# The default API URL is: http://localhost:5000/api

# Start the React development server
npm start
```

The frontend application will run on `http://localhost:3000`

## Project Structure

```
Folk-Dance-Academey/
├── backend/
│   ├── config/
│   ├── controllers/
│   │   ├── classController.js
│   │   └── enrollmentController.js
│   ├── models/
│   │   ├── Class.js
│   │   └── Enrollment.js
│   ├── routes/
│   │   ├── classRoutes.js
│   │   └── enrollmentRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── seed.js
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ClassCard.js
│   │   │   ├── ClassCard.css
│   │   │   ├── EnrollmentModal.js
│   │   │   ├── EnrollmentModal.css
│   │   │   ├── Navbar.js
│   │   │   └── Navbar.css
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Home.css
│   │   │   ├── Classes.js
│   │   │   ├── Classes.css
│   │   │   ├── About.js
│   │   │   ├── About.css
│   │   │   ├── Contact.js
│   │   │   └── Contact.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── .env
│   └── package.json
└── README.md
```

## API Endpoints

### Classes
- `GET /api/classes` - Get all classes
- `GET /api/classes/:id` - Get a single class
- `POST /api/classes` - Create a new class
- `PUT /api/classes/:id` - Update a class
- `DELETE /api/classes/:id` - Delete a class

### Enrollments
- `GET /api/enrollments` - Get all enrollments
- `GET /api/enrollments/:id` - Get a single enrollment
- `POST /api/enrollments` - Create a new enrollment
- `PUT /api/enrollments/:id` - Update an enrollment
- `DELETE /api/enrollments/:id` - Delete an enrollment

## Available Scripts

### Backend
- `npm start` - Start the server
- `npm run dev` - Start the server with nodemon (auto-reload)
- `npm run seed` - Seed the database with sample data

### Frontend
- `npm start` - Start the React development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/folkdanceacademy
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Sample Data

The seed script adds 6 sample folk dance classes:
- Irish Folk Dance (Beginner)
- Indian Bharatanatyam (Intermediate)
- Greek Sirtaki (Beginner)
- Russian Kalinka (Advanced)
- Mexican Folklorico (Beginner)
- Scottish Highland Dance (Intermediate)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

## Author

PRIYA-P14

## Acknowledgments

- Folk dance traditions from around the world
- MERN stack community
- All contributors and supporters

