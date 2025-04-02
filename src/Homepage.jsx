// Homepage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './config';
import './Components/style.css';

const Homepage = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check auth state on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Redirect to login if not authenticated
        navigate('/login');
      }
    });
    
    return () => unsubscribe();
  }, [navigate]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  const NavToTodo = async () => {
    try {
      navigate('/todo');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  }

  // Handle empty or NaN inputs
  const handleStepChange = (e) => {
    const value = e.target.value === '' ? '' : parseInt(e.target.value);
    setStep(isNaN(value) ? 0 : value);
  };

  // Add to history when count changes
  useEffect(() => {
    if (history.length === 0 || history[history.length - 1] !== count) {
      setHistory(prev => [...prev.slice(-9), count]);
    }
  }, [count, history]);

  // Handle increment and decrement
  const handleIncrement = () => {
    setCount(prevCount => prevCount + step);
  };

  const handleDecrement = () => {
    setCount(prevCount => prevCount - step);
  };

  const handleReset = () => {
    setCount(0);
    setHistory([0]);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // If not authenticated yet, show loading
  if (!user) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className={`counter-container ${theme}`}>
      <div className="counter-card">
        <div className="counter-header">
          <h1 className="counter-title">Counter App</h1>
          <div className="button-row">
            <button onClick={toggleTheme} className="theme-button">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>

        <div className="count-container">
          <div className={`count ${count > 0 ? 'positive' : count < 0 ? 'negative' : ''}`}>
            {count}
          </div>
          <div className="count-label">Current Count</div>
        </div>

        <div className="step-container">
          <label>Step Size:</label>
          <div className="step-control">
            <button 
              onClick={() => setStep(prev => Math.max(1, prev - 1))}
              className="step-button"
            >
              -
            </button>
            <input
              type="number"
              value={step}
              onChange={handleStepChange}
              min="1"
            />
            <button 
              onClick={() => setStep(prev => prev + 1)}
              className="step-button"
            >
              +
            </button>
          </div>
        </div>

        <div className="button-grid">
          <button onClick={handleDecrement} className="action-button">
            Decrement
          </button>
          <button onClick={handleIncrement} className="action-button">
            Increment
          </button>
        </div>

        <button onClick={handleReset} className="reset-button">
          Reset
        </button>

        <button onClick={NavToTodo} className="reset-button">
          Go To Todo List 
        </button>



        {history.length > 1 && (
          <div className="history-section">
            <h3>History:</h3>
            <div className="history-items">
              {history.map((val, i) => (
                <div 
                  key={i} 
                  className={`history-item ${val > 0 ? 'positive' : val < 0 ? 'negative' : ''}`}
                >
                  {val}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;