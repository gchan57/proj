import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Login.css';

const Login = ({ setUser }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    role: searchParams.get('role') || 'client'
  });
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    const roleFromURL = searchParams.get('role') || 'client';
    setFormData(prevData => ({ ...prevData, role: roleFromURL }));
  }, [searchParams]);

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
          
          
          
         <div className="button-group">  <button type="submit" className="btn btn-primary">
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
           </div>
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