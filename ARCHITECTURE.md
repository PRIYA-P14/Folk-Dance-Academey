# System Architecture & Flow Diagram

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                      │
│                     http://localhost:5173                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Navbar     │  │ DanceClasses │  │ ClassDetails │     │
│  │  (Classes)   │→ │    Page      │→ │    Page      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                           ↓                    ↓             │
│                    ┌──────────────┐  ┌──────────────┐     │
│                    │  ClassCard   │  │ Enrollment   │     │
│                    │  Component   │  │    Form      │     │
│                    └──────────────┘  └──────────────┘     │
│                                                               │
└────────────────────────┬─────────────────────────────────────┘
                         │ HTTP Requests (Axios)
                         │ JWT Token in Headers
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Express.js)                      │
│                     http://localhost:5000                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  API Routes:                                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ /api/classes        - Class Management               │  │
│  │ /api/enrollments    - Enrollment Operations          │  │
│  │ /api/payments       - Payment Verification           │  │
│  │ /api/auth           - User Authentication            │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
│  Middleware:                                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ - CORS                                                │  │
│  │ - JSON Parser                                         │  │
│  │ - JWT Authentication (auth.js)                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
│  Controllers:                                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ - classController.js                                  │  │
│  │ - enrollmentController.js                            │  │
│  │ - paymentController.js                               │  │
│  │ - authController.js                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
└────────────────────────┬─────────────────────────────────────┘
                         │ Mongoose ODM
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                   DATABASE (MongoDB)                         │
│                 mongodb://localhost:27017                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Collections:                                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ danceclasses - Dance class information               │  │
│  │ users        - User accounts & authentication        │  │
│  │ enrollments  - User enrollments in classes           │  │
│  │ payments     - Payment transaction records           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 User Enrollment Flow

```
START
  │
  ↓
┌────────────────────┐
│ User clicks        │
│ "Classes" in Nav   │
└──────┬─────────────┘
       │
       ↓
┌────────────────────┐
│ DanceClasses Page  │
│ - GET /api/classes │
│ - Shows all classes│
│   with short intro │
└──────┬─────────────┘
       │
       ↓
┌────────────────────┐
│ User clicks        │
│ "View Full Details"│
└──────┬─────────────┘
       │
       ↓
┌────────────────────┐
│ ClassDetails Page  │
│ - GET /api/classes │
│   /:id             │
│ - Shows complete   │
│   information      │
│ - Shows slots      │
└──────┬─────────────┘
       │
       ↓
┌────────────────────┐
│ User clicks        │
│ "Enroll Now"       │
└──────┬─────────────┘
       │
       ↓
┌────────────────────┐
│ Check if logged in │
└──────┬─────────────┘
       │
       ├─ NO ──→ Redirect to /login
       │
       ↓ YES
┌────────────────────┐
│ Show Enrollment    │
│ Form Component     │
│ - Select payment   │
│ - Show payment info│
│ - Enter txn ID     │
└──────┬─────────────┘
       │
       ↓
┌────────────────────┐
│ User submits form  │
│ POST /api/         │
│ enrollments        │
└──────┬─────────────┘
       │
       ↓
┌────────────────────┐
│ Backend creates:   │
│ 1. Enrollment      │
│ 2. Payment record  │
│ 3. Reduces slots   │
└──────┬─────────────┘
       │
       ↓
┌────────────────────┐
│ Success Message    │
│ Redirect to        │
│ Dashboard          │
└──────┬─────────────┘
       │
       ↓
┌────────────────────┐
│ Admin verifies     │
│ payment later      │
│ PUT /api/payments/ │
│ :id/verify         │
└──────┬─────────────┘
       │
       ↓
┌────────────────────┐
│ Enrollment         │
│ Approved           │
└────────────────────┘
       │
       ↓
      END
```

## 🗂️ Database Relationships

```
┌──────────────┐
│    User      │
│──────────────│
│ _id          │──┐
│ name         │  │
│ email        │  │
│ password     │  │
│ role         │  │
└──────────────┘  │
                  │
        ┌─────────┴────────┐
        │                  │
        ↓                  ↓
┌──────────────┐    ┌──────────────┐
│ Enrollment   │    │   Payment    │
│──────────────│    │──────────────│
│ _id          │←───│ _id          │
│ user         │    │ user         │
│ danceClass   │    │ enrollment   │
│ status       │    │ amount       │
│ paymentStatus│    │ transactionId│
│ enrolledAt   │    │ status       │
└──────┬───────┘    │ paymentDate  │
       │            └──────────────┘
       │
       ↓
┌──────────────┐
│ DanceClass   │
│──────────────│
│ _id          │
│ className    │
│ danceType    │
│ description  │
│ instructor   │
│ duration     │
│ fees         │
│ slots        │
│ image        │
│ status       │
└──────────────┘
```

## 📱 Page Layout Structure

### DanceClasses Page (/classes)
```
┌────────────────────────────────────────────────┐
│              NAVBAR                            │
└────────────────────────────────────────────────┘
┌────────────────────────────────────────────────┐
│                                                │
│         Our Folk Dance Classes                 │
│    Discover the rich heritage of Tamil...     │
│                                                │
└────────────────────────────────────────────────┘
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   [Image]   │  │   [Image]   │  │   [Image]   │
│ Theru Koothu│  │ Mayil Attam │  │ Poi Kal...  │
│ 📍 Type     │  │ 📍 Type     │  │ 📍 Type     │
│ 👨‍🏫 Instructor│  │ 👨‍🏫 Instructor│  │ 👨‍🏫 Instructor│
│ ⏱️ Duration │  │ ⏱️ Duration │  │ ⏱️ Duration │
│ Description │  │ Description │  │ Description │
│ 💰 ₹5000    │  │ 💰 ₹4500    │  │ 💰 ₹4000    │
│[View Details]│  │[View Details]│  │[View Details]│
└─────────────┘  └─────────────┘  └─────────────┘
```

### ClassDetails Page (/classes/:id)
```
┌────────────────────────────────────────────────┐
│              NAVBAR                            │
└────────────────────────────────────────────────┘
┌──────────────────────┬─────────────────────────┐
│                      │  Theru Koothu Basics    │
│                      │  Type: Theru Koothu     │
│    [Large Image]     │  Instructor: Master Ravi│
│                      │  Duration: 3 months     │
│                      │  Slots: 20              │
│                      │  Description: Learn...  │
│                      │                         │
│                      │  Fee: ₹5000             │
│                      │  [Enroll Now Button]    │
└──────────────────────┴─────────────────────────┘

(When Enroll clicked, form appears below)

┌────────────────────────────────────────────────┐
│      Enroll in Theru Koothu Basics             │
│                                                │
│  Class Fee: ₹5000 [disabled]                  │
│  Payment Method: [UPI ▼]                      │
│  📱 UPI ID: danceclass@upi                    │
│  Transaction ID: [_______________]            │
│                                                │
│         [Complete Enrollment]                  │
└────────────────────────────────────────────────┘
```

## 🎨 Color Scheme

```
Primary:   #f59e0b (Amber/Orange)
Secondary: #10b981 (Green)
Dark BG:   #1a202c
Card BG:   #2d3748
Text:      #ffffff
Muted:     #a0aec0
```

## 🔐 Authentication Flow

```
User Registration/Login
         ↓
JWT Token Generated
         ↓
Stored in localStorage
         ↓
Sent in all API requests
    (x-auth-token header)
         ↓
Backend validates token
         ↓
Extracts user info
         ↓
Allows access to protected routes
```

---

**This completes the full system architecture! 🎉**
