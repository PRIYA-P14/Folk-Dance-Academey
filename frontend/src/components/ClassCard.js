import React from 'react';
import './ClassCard.css';

const ClassCard = ({ classItem, onEnroll }) => {
  return (
    <div className="class-card">
      <div className="class-card-header">
        <h3>{classItem.name}</h3>
        <span className={`level-badge ${classItem.level.toLowerCase()}`}>
          {classItem.level}
        </span>
      </div>
      <div className="class-card-body">
        <p className="description">{classItem.description}</p>
        <div className="class-details">
          <div className="detail-item">
            <strong>Instructor:</strong> {classItem.instructor}
          </div>
          <div className="detail-item">
            <strong>Schedule:</strong> {classItem.schedule}
          </div>
          <div className="detail-item">
            <strong>Duration:</strong> {classItem.duration}
          </div>
          <div className="detail-item">
            <strong>Max Students:</strong> {classItem.maxStudents}
          </div>
          <div className="detail-item price">
            <strong>Price:</strong> ${classItem.price}
          </div>
        </div>
      </div>
      <div className="class-card-footer">
        <button className="enroll-button" onClick={() => onEnroll(classItem)}>
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default ClassCard;
