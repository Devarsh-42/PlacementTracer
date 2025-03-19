import React from "react";
import "./App.css";

const App = () => {
  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <span className="logo-icon">💼</span>
            <span>PlaceTrack</span>
          </div>
          <nav className="nav-menu">
            <ul>
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">Companies</a></li>
              <li><a href="#">Experiences</a></li>
              <li><a href="#">Resources</a></li>
              <li><a href="#">Profile</a></li>
            </ul>
          </nav>
          <div className="header-actions">
            <button className="notification-btn">🔔<span className="notification-badge"></span></button>
            <button className="login-btn">👤 <span>Login</span></button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Never Miss a Placement Opportunity Again</h1>
          <p>All your placement needs in one place. Track companies, deadlines, and preparation resources.</p>
          <div className="button-group">
            <button className="primary-btn">Get Started</button>
            <button className="secondary-btn">Learn More</button>
          </div>
          <img 
            src="/api/placeholder/600/400" 
            alt="Student tracking placement" 
            className="hero-image"
          />
        </div>
      </section>
    </div>
  );
};

export default App;
