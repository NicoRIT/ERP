import React from 'react';
import '../styles/Notifications.css';

const Notifications = () => {
  const notifications = [
    '📢 Mid-term exams scheduled from 20th Feb.',
    '📢 Project submission deadline extended to 10th March.',
    '📢 Placement drive for final-year students on 15th March.',
    '📢 Workshop on AI and ML this Friday at 3 PM.',
  ];

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      <ul className="notification-list">
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
