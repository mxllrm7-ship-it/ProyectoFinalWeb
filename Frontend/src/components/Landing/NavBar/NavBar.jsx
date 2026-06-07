import React, { useState } from 'react';
import { Link } from 'react-router';
import SearchBar from './SearchBar';
import "./NavBar.css";
import "../../../styles/styles.css";

export default function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <img src="/LogoNodus.webp" alt="Logo" className="navbar-logo" />

        <button className="hamburger" onClick={toggleSidebar}>
          <span className={`hamburger-line ${sidebarOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${sidebarOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${sidebarOpen ? 'open' : ''}`}></span>
        </button>

        <ul className={`navbar-links ${sidebarOpen ? 'active' : ''}`}>
          <li><a href="" onClick={closeSidebar}>Conciertos y Festivales</a></li>
          <li><a href="" onClick={closeSidebar}>Teatro y Cultura</a></li>
          <li><a href="" onClick={closeSidebar}>Deportes</a></li>
          <li><a href="" onClick={closeSidebar}>Familiares</a></li>
          <li><a href="" onClick={closeSidebar}>Especiales</a></li>
          <li><a href="" onClick={closeSidebar}>Ciudades</a></li>
        </ul>

        <div className="navbar-buttons">
          <Link to="/login" className="navbar-btn-login">
            Ingresar
          </Link>

          <Link to="/signup" className="navbar-btn-register">
            Registrarse
          </Link>
        </div>
      </div>

      <div className="navbar-search-row">
        <SearchBar />
      </div>
    </nav>
  );
}