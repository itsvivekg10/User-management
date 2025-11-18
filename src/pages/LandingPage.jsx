import React from "react";
import { Link } from "react-router-dom";
import "../pages/Landinpage.css"

const LandingPage = () => {
  return (
    <div>
      {/* HEADER */}
      <header className="header">
        <div className="container">
          <div className="nav">
            <h1 className="logo">UM</h1>
            <nav>
              <ul className="nav-list">
                <li>
                  <Link className="ghost-btn" to="/home">Get Started</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main>
        <section className="hero">
          <div className="hero-inner container">
            <div className="hero-text">
              <h2>Simple User management, beautifully minimal.</h2>
              <div className="hero-buttons">
                <Link to="/home" className="btn">Start for free</Link>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE GRID */}
        <section id="features" className="features">
          <div className="feature-grid container">
            <div className="feature-card">
              <h3>Minimal UI</h3>
              <p>Clean interface for managing users effortlessly</p>
            </div>
            <div className="feature-card">
              <h3>Fast workflow</h3>
              <p>Add, edit, and organize users quickly.</p>
            </div>
            <div className="feature-card">
              <h3>Responsive</h3>
              <p>Manage users easily on mobile and desktop.</p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        © {new Date().getFullYear()} UserManagement — Built for Management.
      </footer>
    </div>
  );
};

export default LandingPage;
