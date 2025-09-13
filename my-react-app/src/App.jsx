import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import Login from './components/Login';
import FreelancerDashboard from './components/FreelancerDashboard';
import ClientDashboard from './components/ClientDashboard';
import GigDetail from './components/GigDetail';
import Navbar from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in from a previous session
    try {
        const loggedInUser = localStorage.getItem('gighub_user');
        if (loggedInUser) {
          setUser(JSON.parse(loggedInUser));
        }
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('gighub_user');
    }
  }, []);

  const handleSetUser = (userData) => {
    if (userData) {
      localStorage.setItem('gighub_user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('gighub_user');
    }
    setUser(userData);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Navbar user={user} setUser={handleSetUser} />
          
          <main style={{ paddingTop: '80px' }}> {/* Prevent content from hiding behind fixed navbar */}
            <Routes>
              <Route 
                path="/" 
                element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <Welcome />} 
              />
              <Route 
                path="/login" 
                element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <Login setUser={handleSetUser} />} 
              />
              <Route 
                path="/freelancer/dashboard" 
                element={user && user.role === 'freelancer' ? 
                  <FreelancerDashboard user={user} /> : <Navigate to="/login?role=freelancer" />} 
              />
              <Route 
                path="/client/dashboard" 
                element={user && user.role === 'client' ? 
                  <ClientDashboard user={user} /> : <Navigate to="/login?role=client" />} 
              />
              <Route path="/gig/:id" element={<GigDetail />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;