import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('regular');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    try {
      // Get stored users
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Find matching user
      const validUser = users.find(
        (u) => u.username === username && u.password === password
      );

      // If user not found
      if (!validUser) {
        setError("Invalid username or password");
        return;
      }

      // Call AuthContext login
      login(username, password, selectedRole);

      // Redirect after login
      navigate('/saved');

    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to RecipeSaver</h2>
        <p className="login-subtitle">Access your personalized news experience</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Account Type</label>
            <select
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="regular">Regular User</option>
              <option value="premium">Premium User</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary login-button">
            Login
          </button>
        </form>
        <p className="register-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
      </div>
    </div>
  );
};

export default LoginPage;