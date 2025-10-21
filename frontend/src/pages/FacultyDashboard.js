import React, { useState } from "react";
import "./FacultyDashboard.css";
import {
  FaChalkboardTeacher,
  FaBook,
  FaUserGraduate,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const FacultyDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Dummy data
  const courses = [
    { id: 1, name: "AI & ML", students: 40 },
    { id: 2, name: "Database Systems", students: 30 },
    { id: 3, name: "Software Engineering", students: 25 },
    { id: 4, name: "Computer Networks", students: 25 },
  ];

  const students = [
    { id: 1, name: "Alice", program: "Computer Engg", year: 2023 },
    { id: 2, name: "Bob", program: "Computer Engg", year: 2023 },
    { id: 3, name: "Charlie", program: "Computer Engg", year: 2024 },
  ];

  return (
    <div className="faculty-dashboard-wrapper">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-header">
          <h2 className="logo">Faculty Panel</h2>
          <button className="close-btn" onClick={toggleSidebar}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <ul className="sidebar-menu">
          <li
            className={activeSection === "dashboard" ? "active" : ""}
            onClick={() => setActiveSection("dashboard")}
          >
            <FaChalkboardTeacher /> <span>Dashboard</span>
          </li>
          <li
            className={activeSection === "courses" ? "active" : ""}
            onClick={() => setActiveSection("courses")}
          >
            <FaBook /> <span>My Courses</span>
          </li>
          <li
            className={activeSection === "students" ? "active" : ""}
            onClick={() => setActiveSection("students")}
          >
            <FaUserGraduate /> <span>Students</span>
          </li>
          <li>
            <FaSignOutAlt /> <span>Logout</span>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <button className="menu-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <h1>Welcome, Dr. John Doe</h1>
        </header>

        {activeSection === "dashboard" && (
          <section className="cards">
            <div className="card">
              <h3>Total Courses</h3>
              <p>{courses.length}</p>
            </div>
            <div className="card">
              <h3>Total Students</h3>
              <p>{students.length}</p>
            </div>
            <div className="card">
              <h3>Pending Approvals</h3>
              <p>3</p>
            </div>
          </section>
        )}

        {activeSection === "courses" && (
          <section className="details-section">
            <h2>My Courses</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>No. of Students</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.students}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={courses} margin={{ top: 20, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="students" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        )}

        {activeSection === "students" && (
          <section className="details-section">
            <h2>My Students</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Program</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.program}</td>
                    <td>{s.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
};

export default FacultyDashboard;
