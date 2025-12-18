import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About Folk Dance Academy</h1>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded with a passion for preserving and celebrating traditional folk dances,
            Folk Dance Academy has been bringing the joy of dance to our community for years.
            We believe that folk dance is not just about movement, but about connecting with
            our cultural heritage and building lasting friendships.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide high-quality dance education that celebrates the rich
            diversity of folk dance traditions from around the world. We strive to create a
            welcoming environment where students of all ages and skill levels can learn,
            grow, and express themselves through dance.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Offer</h2>
          <ul className="offerings-list">
            <li>Expert instruction from experienced dancers</li>
            <li>Classes for all skill levels - beginner to advanced</li>
            <li>Diverse range of folk dance styles from various cultures</li>
            <li>Regular performances and showcases</li>
            <li>A supportive and inclusive community</li>
            <li>Flexible class schedules</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-icon">👨‍🏫</div>
              <h3>Experienced Instructors</h3>
              <p>Our instructors have decades of combined experience in folk dance and education.</p>
            </div>
            <div className="team-member">
              <div className="member-icon">🎓</div>
              <h3>Certified Professionals</h3>
              <p>All our teachers are certified and continuously update their skills.</p>
            </div>
            <div className="team-member">
              <div className="member-icon">❤️</div>
              <h3>Passionate Educators</h3>
              <p>We love what we do and are dedicated to sharing our passion with students.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
