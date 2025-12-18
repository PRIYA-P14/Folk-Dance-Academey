import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Folk Dance Academy</h1>
          <p className="hero-subtitle">
            Discover the joy of traditional folk dances from around the world
          </p>
          <Link to="/classes" className="cta-button">
            Explore Our Classes
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎭</div>
              <h3>Expert Instructors</h3>
              <p>Learn from experienced dancers with years of teaching experience</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Diverse Styles</h3>
              <p>Experience folk dances from various cultures and traditions</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Community</h3>
              <p>Join a vibrant community of dance enthusiasts</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>All Levels</h3>
              <p>Classes for beginners, intermediate, and advanced dancers</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Dancing?</h2>
          <p>Join our community and begin your folk dance journey today!</p>
          <Link to="/classes" className="cta-button secondary">
            View All Classes
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
