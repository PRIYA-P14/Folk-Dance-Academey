import React, { useState, useEffect } from 'react';
import { classAPI } from '../services/api';
import ClassCard from '../components/ClassCard';
import EnrollmentModal from '../components/EnrollmentModal';
import './Classes.css';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await classAPI.getAllClasses();
      setClasses(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load classes. Please try again later.');
      setLoading(false);
    }
  };

  const handleEnroll = (classItem) => {
    setSelectedClass(classItem);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedClass(null);
  };

  if (loading) {
    return (
      <div className="classes-page">
        <div className="loading">Loading classes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="classes-page">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="classes-page">
      <div className="classes-header">
        <h1>Our Dance Classes</h1>
        <p>Choose from our wide variety of folk dance classes</p>
      </div>

      <div className="classes-container">
        {classes.length === 0 ? (
          <div className="no-classes">
            <p>No classes available at the moment. Please check back later!</p>
          </div>
        ) : (
          <div className="classes-grid">
            {classes.map((classItem) => (
              <ClassCard
                key={classItem._id}
                classItem={classItem}
                onEnroll={handleEnroll}
              />
            ))}
          </div>
        )}
      </div>

      {showModal && selectedClass && (
        <EnrollmentModal
          classItem={selectedClass}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Classes;
