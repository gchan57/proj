import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = ({ user, setUser }) => {
  const { theme, toggleTheme } = useTheme();
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          GigHub
        </Link>
        
        <div className="nav-menu">
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {user ? (
            <>
              <span className="nav-user">Welcome, {user.name}</span>
              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login?role=freelancer" className="nav-link">
                Become a Freelancer
              </Link>
              <Link to="/login?role=client" className="btn btn-primary">
                Join as Client
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;