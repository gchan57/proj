import React, { useState } from 'react';
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

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Navbar user={user} setUser={setUser} />
          
          <Routes>
            <Route 
              path="/" 
              element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <Welcome />} 
            />
            <Route 
              path="/login" 
              element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <Login setUser={setUser} />} 
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
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;