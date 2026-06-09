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
          <li><Link to="/" onClick={closeSidebar}>Inicio</Link></li>
          <li><Link to="/eventos" onClick={closeSidebar}>Conciertos y Festivales</Link></li>
          <li><Link to="/eventos" onClick={closeSidebar}>Teatro y Cultura</Link></li>
          <li><Link to="/eventos" onClick={closeSidebar}>Deportes</Link></li>
          
          <li><Link to="/eventos" onClick={closeSidebar}>Especiales</Link></li>
          <li><Link to="/eventos" onClick={closeSidebar}>Ciudades</Link></li>
          <li><Link to="/mis-eventos" onClick={closeSidebar}>Mis Tickets</Link></li>
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