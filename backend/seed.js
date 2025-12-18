require('dotenv').config();
const mongoose = require('mongoose');
const DanceClass = require('./models/DanceClass');

const sampleClasses = [
    {
        className: 'Theru Koothu Basics',
        danceType: 'Theru Koothu',
        description: 'Learn the ancient art of Theru Koothu, a traditional Tamil folk dance performed in streets. This course covers basic movements, expressions, and storytelling techniques.',
        instructor: 'Master Ravi Kumar',
        duration: '3 months',
        fees: 5000,
        slots: 20,
        image: 'http://localhost:5000/public/images/theru koothu.jpg',
        status: 'active'
    },
    {
        className: 'Mayil Attam Pro',
        danceType: 'Mayil Attam (Peacock Dance)',
        description: 'Master the elegant Peacock Dance with intricate hand movements and graceful footwork. Perfect for intermediate to advanced dancers looking to showcase Tamil culture.',
        instructor: 'Ms. Geetha Lakshmi',
        duration: '2 months',
        fees: 4500,
        slots: 15,
        image: 'http://localhost:5000/public/images/mayilaatam.jpg',
        status: 'active'
    },
    {
        className: 'Poi Kal Kudhirai Dance',
        danceType: 'Poi Kal Kudhirai',
        description: 'Experience the vibrant Dummy Horse Dance! Learn the rhythmic movements while managing the decorative horse costume. A unique and energetic folk art form.',
        instructor: 'Mr. Selvam Murugan',
        duration: '2.5 months',
        fees: 4000,
        slots: 12,
        image: 'http://localhost:5000/public/images/poikaalkuthirai.jpg',
        status: 'active'
    },
    {
        className: 'Kummi Dance Workshop',
        danceType: 'Kummi',
        description: 'Join our popular Kummi dance workshop! Learn traditional clapping patterns and circular formations. Great for beginners and groups.',
        instructor: 'Mrs. Lakshmi Devi',
        duration: '1.5 months',
        fees: 3000,
        slots: 25,
        image: 'http://localhost:5000/public/images/kummi.jpg',
        status: 'active'
    },
    {
        className: 'Oyilattam Advanced',
        danceType: 'Oyilattam',
        description: 'Advanced course in Oyilattam - the graceful dance form with beautiful silk scarves. Learn complex choreography and traditional music coordination.',
        instructor: 'Master Karuppiah',
        duration: '4 months',
        fees: 6000,
        slots: 10,
        image: 'http://localhost:5000/public/images/oyilattam.jpg',
        status: 'active'
    },
    {
        className: 'Karagattam Beginner',
        danceType: 'Karagattam',
        description: 'Learn the mesmerizing art of balancing pots while dancing! This intensive course teaches balance, coordination, and traditional Karagattam techniques.',
        instructor: 'Mr. Palanisamy',
        duration: '3.5 months',
        fees: 5500,
        slots: 8,
        image: 'http://localhost:5000/public/images/karagam.jpg',
        status: 'active'
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dance_class_db', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB Connected');

        // Clear existing classes
        await DanceClass.deleteMany({});
        console.log('Existing classes removed');

        // Insert sample classes
        await DanceClass.insertMany(sampleClasses);
        console.log('Sample dance classes added successfully!');

        mongoose.connection.close();
        console.log('Database connection closed');
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDatabase();
