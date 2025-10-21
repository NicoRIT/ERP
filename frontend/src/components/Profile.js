import React from 'react';
import { FaUserGraduate, FaEnvelope, FaIdBadge, FaPhone, FaUniversity, FaCalendar } from 'react-icons/fa';
import '../styles/Profile.css';

const Profile = () => {
  const student = {
    name: 'John Doe',
    studentId: 'STU123456',
    email: 'johndoe@example.com',
    department: 'Computer Science',
    year: 'Final Year',
    phone: '9876543210',
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <FaUserGraduate className="profile-icon" />
          <h2>{student.name}</h2>
          <p className="profile-subtitle">{student.department} - {student.year}</p>
        </div>
        <div className="profile-details">
          <p><FaIdBadge className="icon" /><strong> Student ID:</strong> {student.studentId}</p>
          <p><FaEnvelope className="icon" /><strong> Email:</strong> {student.email}</p>
          <p><FaUniversity className="icon" /><strong> Department:</strong> {student.department}</p>
          <p><FaCalendar className="icon" /><strong> Year:</strong> {student.year}</p>
          <p><FaPhone className="icon" /><strong> Phone:</strong> {student.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
