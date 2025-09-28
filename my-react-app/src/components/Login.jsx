import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { login, signUp } from '../api';
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
  const [error, setError] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      let userData;
      if (isSignUp) {
        userData = await signUp(formData);
      } else {
        userData = await login({
          email: formData.email,
          password: formData.password
        });
      }
      setUser(userData);
      navigate(`/${userData.role}/dashboard`);
    } catch (err) {
      setError(err.message);
    }
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
          
          {error && <p className="error-message">{error}</p>}
          
         <div className="button-group">
           <button type="submit" className="btn btn-primary">
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
           </div>
        </form>
        
        <p className="auth-toggle">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <span onClick={() => {
            setIsSignUp(!isSignUp);
            setError('');
          }}>
            {isSignUp ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;