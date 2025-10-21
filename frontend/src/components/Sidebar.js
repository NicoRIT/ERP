import React from 'react';
import '../pages/StudentDashboard.css';
import { FaHome, FaUser, FaBook, FaClipboardList, FaCalendarCheck, FaBell, FaCog } from 'react-icons/fa';


const Sidebar = ({ setActiveSection }) => {
  return (
    <aside className="sidebar">
      <h2>Student Dashboard</h2>
      <ul>
        <li onClick={() => setActiveSection('home')}>
          <FaHome className="icon" /> Home
        </li>
        <li onClick={() => setActiveSection('profile')}>
          <FaUser className="icon" /> Profile
        </li>
        <li onClick={() => setActiveSection('courses')}>
          <FaBook className="icon" /> My Courses
        </li>
        <li onClick={() => setActiveSection('results')}>
          <FaClipboardList className="icon" /> Results
        </li>
        <li onClick={() => setActiveSection('attendance')}>
          <FaCalendarCheck className="icon" /> Attendance
        </li>
        <li onClick={() => setActiveSection('notifications')}>
          <FaBell className="icon" /> Notifications
        </li>
        <li onClick={() => setActiveSection('settings')}>
          <FaCog className="icon" /> Settings
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
