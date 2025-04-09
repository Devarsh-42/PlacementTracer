// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config';
import Login from './Components/Login';
import Register from './Components/Regester';
import Homepage from './Homepage';
import Todo from './Components/Todo';
import UserProfile from './Components/UserProfile';
import Navbar from './Components/Navbar'; // Fixed import (was incorrectly named Dashboard)
import './Components/style.css';

// Authentication wrapper component
const AuthWrapper = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setAuthChecked(true);
      
      // Store user ID in localStorage if needed by other components
      if (user) {
        localStorage.setItem('authToken', user.uid);
      } else {
        localStorage.removeItem('authToken');
      }
    });
    
    return () => unsubscribe();
  }, [navigate]);

  if (!authChecked) {
    return <div className="loading-container">Checking authentication...</div>;
  }

  return children(isAuthenticated);
};

// Create a layout wrapper for authenticated routes
const ProtectedRoute = ({ element }) => {
  return (
    <AuthWrapper>
      {(isAuthenticated) => 
        isAuthenticated ? (
          <>
            <Navbar />
            {element}
          </>
        ) : (
          <Navigate to="/login" />
        )
      }
    </AuthWrapper>
  );
};

// Public route that redirects to homepage if already authenticated
const PublicRoute = ({ element }) => {
  return (
    <AuthWrapper>
      {(isAuthenticated) => 
        isAuthenticated ? (
          <Navigate to="/" />
        ) : (
          element
        )
      }
    </AuthWrapper>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/register" element={<PublicRoute element={<Register />} />} />
        
        {/* Protected routes with navbar */}
        <Route path="/" element={<ProtectedRoute element={<Homepage />} />} />
        <Route path="/todo" element={<ProtectedRoute element={<Todo />} />} />
        <Route path="/userprofile" element={<ProtectedRoute element={<UserProfile />} />} />
        <Route path="/counter" element={<ProtectedRoute element={<Homepage />} />} /> {/* Using Homepage as Counter */}
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;