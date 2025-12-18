# Dance Class Management System - Setup & Usage Guide

## 🎭 Features Implemented

### Frontend Features
1. **Dance Classes Listing** (`/classes`)
   - View all available dance classes
   - Each card shows class name, type, instructor, duration, description, and fees
   - Click "View Full Details" to see complete information

2. **Class Details Page** (`/classes/:id`)
   - Full class information with large image
   - Enrollment button
   - Built-in enrollment form with payment options
   - Real-time slot availability

3. **Enrollment & Payment Flow**
   - Multiple payment methods (UPI, Bank Transfer, Card, Cash)
   - Transaction ID submission
   - Payment verification system
   - Success/Error handling

### Backend Features
1. **Class Management API**
   - GET all classes
   - GET single class
   - Create/Update/Delete classes (Admin)

2. **Enrollment System**
   - Create enrollment with payment
   - Track enrollment status (pending/approved/rejected)
   - View user enrollments
   - Admin panel for enrollment management

3. **Payment Processing**
   - Record payment transactions
   - Payment verification by admin
   - Payment status tracking

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in backend folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/dance_class_db
JWT_SECRET=your_secret_key_here
```

4. Seed the database with sample classes:
```bash
node seed.js
```

5. Start the backend server:
```bash
npm start
# or for development with nodemon
npm run dev
```

Backend will run on: http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

Frontend will run on: http://localhost:5173

## 📱 How to Use

### For Students

1. **Browse Classes**
   - Click "Classes" in navigation
   - View all available dance classes with short descriptions
   - See instructor, duration, and fees for each class

2. **View Class Details**
   - Click "View Full Details" on any class card
   - See complete information including available slots
   - View the full description and requirements

3. **Enroll in a Class**
   - Click "Enroll Now" button on class details page
   - Login if not already logged in
   - Fill in the enrollment form:
     - Select payment method
     - Complete payment outside the app (UPI/Bank/Card/Cash)
     - Enter transaction ID
   - Submit enrollment
   - Wait for admin verification

4. **Check Enrollment Status**
   - Go to Dashboard to view your enrollments
   - Check payment verification status

### For Admins

1. **Manage Classes**
   - Add new dance classes
   - Update class information
   - Delete classes

2. **Verify Payments**
   - Review submitted payment transactions
   - Verify transaction IDs
   - Approve or reject payments

3. **Manage Enrollments**
   - View all enrollments
   - Approve/Reject enrollment requests
   - Track payment status

## 🔐 Authentication Flow

1. Users must register/login to enroll
2. JWT token is stored in localStorage
3. Protected routes require authentication
4. Admin routes require admin role

## 📊 Database Models

### DanceClass
- className, danceType, description
- instructor, duration, fees, slots
- image URL, status

### Enrollment
- user, danceClass (references)
- status: pending/approved/rejected
- paymentStatus: pending/verified/failed
- enrolledAt

### Payment
- user, enrollment (references)
- amount, transactionId
- status: pending/verified/failed
- paymentDate

### User
- name, email, password
- role: user/admin

## 🎨 Payment Methods Supported

1. **UPI** - Google Pay, PhonePe, PayTM
2. **Bank Transfer** - Direct bank account transfer
3. **Card** - Debit/Credit card payments
4. **Cash** - Pay at center

## 📝 API Endpoints

### Classes
- `GET /api/classes` - Get all classes
- `GET /api/classes/:id` - Get single class
- `POST /api/classes` - Create class (Admin)
- `PUT /api/classes/:id` - Update class (Admin)
- `DELETE /api/classes/:id` - Delete class (Admin)

### Enrollments
- `POST /api/enrollments` - Create enrollment (Auth)
- `GET /api/enrollments/my-enrollments` - Get user enrollments (Auth)
- `GET /api/enrollments` - Get all enrollments (Admin)
- `PUT /api/enrollments/:id` - Update enrollment status (Admin)
- `DELETE /api/enrollments/:id` - Delete enrollment (Admin)

### Payments
- `GET /api/payments/my-payments` - Get user payments (Auth)
- `GET /api/payments` - Get all payments (Admin)
- `GET /api/payments/:id` - Get payment by ID (Auth)
- `PUT /api/payments/:id/verify` - Verify payment (Admin)

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

## 🎯 Key Features

✅ Responsive design
✅ User authentication
✅ Class browsing with filters
✅ Detailed class information
✅ Enrollment with payment tracking
✅ Admin verification system
✅ Real-time slot management
✅ Transaction ID verification
✅ Multiple payment methods
✅ Status tracking for enrollments

## 🐛 Troubleshooting

### Backend not connecting to MongoDB
- Check if MongoDB is running
- Verify MONGO_URI in .env file
- Try: `mongodb://127.0.0.1:27017/dance_class_db`

### Frontend can't reach backend
- Ensure backend is running on port 5000
- Check CORS settings in server.js
- Verify API baseURL in frontend/src/services/api.js

### Authentication issues
- Clear localStorage and try again
- Check JWT_SECRET in .env
- Verify token is being sent in headers

## 📞 Support

For issues or questions:
1. Check console for errors
2. Verify all dependencies are installed
3. Ensure MongoDB is running
4. Check network requests in browser DevTools

## 🎉 Success!

Your Dance Class Management System is now ready to use!

1. ✅ Classes page shows all dance classes with short intro
2. ✅ Click on any class to see full details
3. ✅ Enroll button opens enrollment form with payment options
4. ✅ Multiple payment methods available
5. ✅ Admin can verify payments and approve enrollments
