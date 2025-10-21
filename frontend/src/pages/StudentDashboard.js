import React, { useState, useEffect } from 'react';
import { studentService } from '../services/api';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [profile, setProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileData, coursesData, attendanceData, gradesData] = await Promise.all([
          studentService.getProfile(user.id),
          studentService.getCourses(user.id),
          studentService.getAttendance(user.id),
          studentService.getGrades(user.id)
        ]);

        setProfile(profileData);
        setCourses(coursesData);
        setAttendance(attendanceData);
        setGrades(gradesData);
      } catch (err) {
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

  const renderHome = () => (
    <div className="dashboard-home">
      <h2>Welcome, {profile?.student_name}</h2>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Courses Enrolled</h3>
          <p>{courses.length}</p>
        </div>
        <div className="stat-card">
          <h3>Average Attendance</h3>
          <p>
            {attendance.length > 0
              ? `${Math.round(
                  (attendance.filter(a => a.status === 'Present').length / attendance.length) * 100
                )}%`
              : 'N/A'}
          </p>
        </div>
        <div className="stat-card">
          <h3>Current GPA</h3>
          <p>
            {grades.length > 0
              ? (
                  grades.reduce((acc, grade) => {
                    const gradePoints = {
                      'A+': 4.0,
                      'A': 3.7,
                      'B': 3.0,
                      'C': 2.0,
                      'D': 1.0
                    };
                    return acc + gradePoints[grade.grade_letter];
                  }, 0) / grades.length
                ).toFixed(2)
              : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="profile-section">
      <h2>Student Profile</h2>
      {profile && (
        <div className="profile-details">
          <p><strong>Name:</strong> {profile.student_name}</p>
          <p><strong>Email:</strong> {profile.student_email}</p>
          <p><strong>Phone:</strong> {profile.student_phone}</p>
          <p><strong>Department:</strong> {profile.department_name}</p>
          <p><strong>Program:</strong> {profile.program_name}</p>
          <p><strong>Enrollment Year:</strong> {profile.enrollment_year}</p>
        </div>
      )}
    </div>
  );

  const renderCourses = () => (
    <div className="courses-section">
      <h2>Enrolled Courses</h2>
      <div className="courses-grid">
        {courses.map(course => (
          <div key={course.course_id} className="course-card">
            <h3>{course.course_name}</h3>
            <p><strong>Code:</strong> {course.course_code}</p>
            <p><strong>Credits:</strong> {course.credits}</p>
            <p><strong>Semester:</strong> {course.semester}</p>
            <p><strong>Status:</strong> {course.status}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="attendance-section">
      <h2>Attendance Record</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Course</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map(record => (
            <tr key={record.attendance_id}>
              <td>{new Date(record.date).toLocaleDateString()}</td>
              <td>{record.course_name}</td>
              <td className={record.status.toLowerCase()}>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderGrades = () => (
    <div className="grades-section">
      <h2>Academic Performance</h2>
      <table className="grades-table">
        <thead>
          <tr>
            <th>Course</th>
            <th>Assessment</th>
            <th>Marks</th>
            <th>Grade</th>
            <th>Semester</th>
          </tr>
        </thead>
        <tbody>
          {grades.map(grade => (
            <tr key={grade.grade_id}>
              <td>{grade.course_name}</td>
              <td>{grade.assessment_type}</td>
              <td>{grade.marks_obtained}/{grade.max_marks}</td>
              <td>{grade.grade_letter}</td>
              <td>Sem {grade.semester}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Student Portal</h2>
        </div>
        <nav className="sidebar-nav">
          <button
            className={activeSection === 'home' ? 'active' : ''}
            onClick={() => setActiveSection('home')}
          >
            Home
          </button>
          <button
            className={activeSection === 'profile' ? 'active' : ''}
            onClick={() => setActiveSection('profile')}
          >
            Profile
          </button>
          <button
            className={activeSection === 'courses' ? 'active' : ''}
            onClick={() => setActiveSection('courses')}
          >
            Courses
          </button>
          <button
            className={activeSection === 'attendance' ? 'active' : ''}
            onClick={() => setActiveSection('attendance')}
          >
            Attendance
          </button>
          <button
            className={activeSection === 'grades' ? 'active' : ''}
            onClick={() => setActiveSection('grades')}
          >
            Grades
          </button>
        </nav>
      </div>

      <div className="dashboard-content">
        {activeSection === 'home' && renderHome()}
        {activeSection === 'profile' && renderProfile()}
        {activeSection === 'courses' && renderCourses()}
        {activeSection === 'attendance' && renderAttendance()}
        {activeSection === 'grades' && renderGrades()}
      </div>
    </div>
  );
};

export default StudentDashboard;
