const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Class = require('./models/Class');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/folkdanceacademy';

const sampleClasses = [
  {
    name: 'Irish Folk Dance',
    description: 'Learn traditional Irish step dancing with upbeat music and energetic movements. Perfect for beginners wanting to experience Celtic culture.',
    instructor: 'Sarah O\'Connor',
    schedule: 'Monday & Wednesday, 6:00 PM - 7:30 PM',
    duration: '1.5 hours',
    level: 'Beginner',
    price: 45,
    maxStudents: 20,
    imageUrl: ''
  },
  {
    name: 'Indian Bharatanatyam',
    description: 'Classical Indian dance form featuring intricate footwork and expressive hand gestures. This ancient art form tells stories through movement.',
    instructor: 'Priya Sharma',
    schedule: 'Tuesday & Thursday, 5:00 PM - 6:30 PM',
    duration: '1.5 hours',
    level: 'Intermediate',
    price: 50,
    maxStudents: 15,
    imageUrl: ''
  },
  {
    name: 'Greek Sirtaki',
    description: 'Experience the joy of Greek folk dancing with the famous Sirtaki dance, popularized by Zorba the Greek.',
    instructor: 'Dimitri Papadopoulos',
    schedule: 'Friday, 7:00 PM - 8:30 PM',
    duration: '1.5 hours',
    level: 'Beginner',
    price: 40,
    maxStudents: 25,
    imageUrl: ''
  },
  {
    name: 'Russian Kalinka',
    description: 'High-energy Russian folk dance featuring kicks, leaps, and traditional movements. Build strength and flexibility.',
    instructor: 'Ivan Volkov',
    schedule: 'Saturday, 2:00 PM - 4:00 PM',
    duration: '2 hours',
    level: 'Advanced',
    price: 60,
    maxStudents: 12,
    imageUrl: ''
  },
  {
    name: 'Mexican Folklorico',
    description: 'Colorful and vibrant Mexican folk dance with beautiful costumes and traditional music. Fun for all ages!',
    instructor: 'Maria Garcia',
    schedule: 'Monday & Friday, 4:00 PM - 5:30 PM',
    duration: '1.5 hours',
    level: 'Beginner',
    price: 45,
    maxStudents: 20,
    imageUrl: ''
  },
  {
    name: 'Scottish Highland Dance',
    description: 'Athletic and competitive style of dance from the Scottish Highlands. Learn the famous sword dance and more.',
    instructor: 'Robert MacLeod',
    schedule: 'Wednesday, 6:30 PM - 8:00 PM',
    duration: '1.5 hours',
    level: 'Intermediate',
    price: 50,
    maxStudents: 15,
    imageUrl: ''
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log('Connected to MongoDB');

    // Clear existing classes
    await Class.deleteMany({});
    console.log('Cleared existing classes');

    // Insert sample classes
    await Class.insertMany(sampleClasses);
    console.log('Sample classes inserted successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
