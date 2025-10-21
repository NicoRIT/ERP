import React, { useState } from 'react';
import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [step, setStep] = useState('role'); // 'role' or 'credentials'
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const roles = [
    { id: 'Admin', label: 'Admin' },
    { id: 'Office Admin', label: 'Office Admin' },
    { id: 'Dept Admin', label: 'Department Admin' },
    { id: 'Faculty', label: 'Faculty' },
    { id: 'Student', label: 'Student' }
  ];

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep('credentials');
    setError('');
  };

  const handleBack = () => {
    setStep('role');
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate email and password fields
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    try {
      const response = await authService.login(email, password); // Updated to exclude 'role'
      localStorage.setItem('token', response.token); // Store the JWT token
      
      // Redirect based on user role
      switch (response.user.role) {
        case 'Admin':
          navigate('/admin-dashboard');
          break;
        case 'Office Admin':
          navigate('/office-admin-dashboard');
          break;
        case 'Dept Admin':
          navigate('/dept-admin-dashboard');
          break;
        case 'Faculty':
          navigate('/faculty-dashboard');
          break;
        case 'Student':
          navigate('/student-dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Student Information System</h2>
        {error && <div className="error-message">{error}</div>}
        
        {step === 'role' ? (
          <div className="role-selection">
            <h3>Select Your Role</h3>
            <div className="role-buttons">
              {roles.map((r) => (
                <button
                  key={r.id}
                  className={`role-button ${role === r.id ? 'active' : ''}`}
                  onClick={() => handleRoleSelect(r.id)}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="login-form">
            <h3>Login as {role}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>
              <div className="button-group">
                <button type="button" onClick={handleBack} className="back-button">
                  Back
                </button>
                <button type="submit" className="login-button">
                  Login
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
