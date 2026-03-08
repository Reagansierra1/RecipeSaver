import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //This essentially removes all angle brackets so that malcious code, suh as <script></script> can not be saved as a username nor password and potentially execute
  const sanitizeInput = (input) => {
    return input.replace(/[<>]/g, "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const storedToken = sessionStorage.getItem("csrfToken");

    if (!storedToken) {
      setError("Security validation failed.");
      return;
    }

    const cleanUsername = sanitizeInput(username);
    const cleanPassword = sanitizeInput(password);
    const cleanConfirmPassword = sanitizeInput(confirmPassword);

    if (!cleanUsername.trim() || !cleanPassword.trim() || !cleanConfirmPassword.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    if (cleanUsername.length > 30) {
      setError("Username too long");
      return;
    }

    if(cleanPassword.length < 8){
      setError("Password too short");
      return;
    }

    if (cleanPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((u) => u.username === cleanUsername);

    if (userExists) {
      setError("Username already exists.");
      return;
    }

    const newUser = { username: cleanUsername, password: cleanPassword, role: "regular" };

    const updatedUsers = [...users, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Create an Account</h2>
        <p className="login-subtitle">
          Register to save and manage your favorite recipes
        </p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input type="hidden" name="csrfToken" value={sessionStorage.getItem("csrfToken") || ""}/>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>

          <button type="submit" className="btn btn-primary login-button">
            Register
          </button>
        </form>

        <p className="register-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;