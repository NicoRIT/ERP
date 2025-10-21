import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import './LoginPage.css';

const roleRoutes = {
  1: { name: 'Admin', path: '/admin-dashboard' },
  2: { name: 'Faculty', path: '/faculty-dashboard' },
  3: { name: 'Student', path: '/student-dashboard' },
  4: { name: 'Dept Admin', path: '/dept-admin-dashboard' },
  5: { name: 'Office Admin', path: '/office-admin-dashboard' },
};

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError('');
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!selectedRole) {
      setError('Please select a role');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credentials.email,
          password: credentials.password,
          role: selectedRole, // send selected role to backend
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const roleId = data.role || selectedRole; // use returned role or fallback
        const route = roleRoutes[roleId]?.path;

        if (route) {
          navigate(route);
        } else {
          setError('Invalid role. Please contact the administrator.');
        }
      } else {
        setError(data.message || 'Login failed. Please check your credentials and try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Unable to connect to server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtext">Sign in to continue</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <select
              value={selectedRole}
              onChange={handleRoleChange}
              required
              className={error && !selectedRole ? 'error' : ''}
            >
              <option value="">Select Role</option>
              {Object.entries(roleRoutes).map(([id, info]) => (
                <option key={id} value={id}>
                  {info.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
              className={error && !credentials.email ? 'error' : ''}
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
              className={error && !credentials.password ? 'error' : ''}
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <div className="login-links">
          <a href="/register">New Admission</a> |{' '}
          <a href="/forgot-password">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
