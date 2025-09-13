import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Login.css';

const Login = ({ setUser }) => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'client';
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    role: role
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would validate and send to backend
    setUser({
      id: 1,
      name: formData.username || 'Test User',
      email: formData.email,
      role: formData.role
    });
    navigate(`/${formData.role}/dashboard`);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isSignUp ? 'Create Account' : 'Login'} as {formData.role}</h2>
        
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required={isSignUp}
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>I am a</label>
            <select 
              name="role" 
              value={formData.role} 
              onChange={handleChange}
            >
              <option value="client">Client</option>
              <option value="freelancer">Freelancer</option>
            </select>
          </div>
          
          <button type="submit" className="btn btn-primary">
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        
        <p className="auth-toggle">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <span onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;