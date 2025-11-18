import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="navbar-nav-style">
          <h1 className="navbar-title">UM</h1>

          <nav>
            <ul className="navbar-list">
              <li>
                <Link className="ghost-btn" to="/addUser">
                  ADD USER
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
