# 🚀 Quick Start Guide

## Start the Application in 3 Steps

### Step 1: Start MongoDB
Make sure MongoDB is running on your system.

### Step 2: Start Backend
```bash
cd backend
npm install
npm run seed    # Populate database with sample classes
npm run dev     # Start backend server
```
Backend runs on: **http://localhost:5000**

### Step 3: Start Frontend
```bash
cd frontend
npm install
npm run dev     # Start frontend server
```
Frontend runs on: **http://localhost:5173**

## 🎯 Test the Flow

1. **Open browser**: http://localhost:5173
2. **Click "Classes"** in navigation menu
3. **Browse dance classes** - You'll see 6 sample classes with short descriptions
4. **Click "View Full Details"** on any class
5. **See complete information** about the dance class
6. **Click "Enroll Now"** 
   - You'll be redirected to login (create an account first)
7. **After login**, click Enroll Now again
8. **Fill enrollment form**:
   - Select payment method (UPI/Bank/Card/Cash)
   - Enter a mock transaction ID (e.g., TXN123456)
   - Click "Complete Enrollment"
9. **Success!** Your enrollment is submitted for admin verification

## 📋 Sample Classes Included

1. **Theru Koothu Basics** - Ancient street dance (₹5000)
2. **Mayil Attam Pro** - Peacock Dance (₹4500)
3. **Poi Kal Kudhirai Dance** - Dummy Horse Dance (₹4000)
4. **Kummi Dance Workshop** - Traditional clapping patterns (₹3000)
5. **Oyilattam Advanced** - Graceful dance with silk scarves (₹6000)
6. **Karagattam Essentials** - Pot balancing dance (₹5500)

## 🔑 Key Features

✅ **Classes Page** (`/classes`)
   - Shows all dance classes with short intro
   - Displays: name, type, instructor, duration, description, fees
   - Click card to view full details

✅ **Class Details Page** (`/classes/:id`)
   - Full class information
   - Available slots count
   - Enrollment button
   - Integrated payment form

✅ **Enrollment Form**
   - Multiple payment options
   - Transaction ID submission
   - Real-time validation
   - Success/Error feedback

✅ **Payment Methods**
   - UPI (Google Pay, PhonePe)
   - Bank Transfer
   - Debit/Credit Card
   - Cash at Center

## 🎨 What You'll See

### Classes Page
- Beautiful card grid layout
- Each card shows:
  - Dance class image
  - Class name & type
  - Instructor name
  - Duration
  - Short description (2 lines)
  - Fee amount
  - "View Full Details" button

### Class Details Page
- Large class image
- Complete description
- All class information
- Real-time slot availability
- "Enroll Now" button
- Enrollment form (appears after clicking Enroll)

## 🐛 Troubleshooting

**Can't see classes?**
- Run `npm run seed` in backend folder
- Check MongoDB is running

**Backend not starting?**
- Check port 5000 is available
- Verify .env file exists with MONGO_URI

**Frontend not connecting?**
- Backend must be running on port 5000
- Check console for errors

## 📞 Need Help?

Check the detailed [SETUP_GUIDE.md](./SETUP_GUIDE.md) for:
- Complete API documentation
- Database schema details
- Authentication setup
- Admin features
- Detailed troubleshooting

---

**Enjoy your Folk Dance Class Management System! 🎭💃**
