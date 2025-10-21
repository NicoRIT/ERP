import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/LoginPage';
import Register from './pages/Admission';
import AdminDashboard from './pages/AdminDashboard';
import OfficeAdminDashboard from './pages/OfficeAdminDashboard';
import DeptAdminDashboard from './pages/DeptAdminDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import StudentDashboard from './pages/StudentDashboard';
import AdmissionForm from './components/AdmissionForm';
import AdmissionStatus from './components/AdmissionStatus';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/office-admin-dashboard" element={<OfficeAdminDashboard />} />
            <Route path="/dept-admin-dashboard" element={<DeptAdminDashboard />} />
            <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/admission" element={<AdmissionForm />} />
            <Route path="/admission-status" element={<AdmissionStatus />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
