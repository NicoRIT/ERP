import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import '../styles/Home.css';

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const Home = () => {
  // Sample Attendance Data
  const attendanceData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Attendance (%)',
        data: [85, 90, 80, 95, 92], // Sample attendance percentage
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  // Sample Grade Data
  const gradeData = {
    labels: ['Math III', 'Computer Networks', ' Technical English', 'Basics of Python ', 'Theory of computation'],
    datasets: [
      {
        label: 'Grades (%)',
        data: [88, 75, 92, 85, 95], // Sample grades
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
      },
    ],
  };

  // Sample Performance Over Time
  const performanceData = {
    labels: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'],
    datasets: [
      {
        label: 'CGPA',
        data: [7.5, 7.8, 8.0, 8.5], // Sample CGPA
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="home-container">
      <h2>📊 Student Performance Dashboard</h2>

      <div className="chart-container">
        <div className="chart">
          <h3>📅 Attendance Overview</h3>
          <Bar data={attendanceData} />
        </div>

        <div className="chart">
          <h3>📖 Subject Grades</h3>
          <Pie data={gradeData} />
        </div>

        <div className="chart">
          <h3>📈 Performance Over Time</h3>
          <Line data={performanceData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
