// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Regester';
import Homepage from './Homepage';
import Todo from './Components/Todo';
import Navbar from './Components/Navbar';

const App = () => {
  return (
    <Router>
      {/* Navbar component can be placed here if needed */}
      <Navbar />
      
      {/* Define routes for the application */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
    </Router>
  );
};

export default App;