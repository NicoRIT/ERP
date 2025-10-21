import React, { useState, useEffect } from 'react';
import '../styles/Courses.css';
import { FaBookOpen, FaUser } from 'react-icons/fa';

const Courses = () => {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    // Simulating API call with sample course data
    setTimeout(() => {
      setCourses([
        { id: 1, name: 'React Basics', instructor: 'John Doe' },
        { id: 2, name: 'Advanced JavaScript', instructor: 'Jane Smith' },
        { id: 3, name: 'Database Management', instructor: 'Alice Johnson' }
      ]);
    }, 1000);
  }, []);

  return (
    <div className="courses-container">
      <h2>My Courses</h2>
      {courses ? (
        <div className="course-list">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <FaBookOpen className="course-icon" />
              <h3>{course.name}</h3>
              <p><FaUser className="icon" /> {course.instructor}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="loading">Loading courses...</p>
      )}
    </div>
  );
};

export default Courses;
