import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { House, Music, Drama, Trophy, Star, MapPinned, Ticket, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import SearchBar from './SearchBar';
import "./NavBar.css";
import "../../../styles/styles.css";
import { useAuth } from '../../../context/AuthContext';

export default function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    logout();
    closeSidebar();
    navigate('/');
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
          <li>
            <Link to="/" onClick={closeSidebar}>
              <House size={15} />
              <span>Inicio</span>
            </Link>
          </li>
          <li>
            <Link to="/eventos" onClick={closeSidebar}>
              <Music size={15} />
              <span>Conciertos y Festivales</span>
            </Link>
          </li>
          <li>
            <Link to="/eventos" onClick={closeSidebar}>
              <Drama size={15} />
              <span>Teatro y Cultura</span>
            </Link>
          </li>
          <li>
            <Link to="/mis-eventos" onClick={closeSidebar}>
              <Ticket size={15} />
              <span>Mis Tickets</span>
            </Link>
          </li>
        </ul>
        <div className="navbar-buttons">
          {usuario ? (
            <div className="navbar-user">
              <Link to="/profile" className="navbar-username">
                <User size={15} />
                <span>Hola, {usuario.nombre_usuario}</span>
              </Link>
              <button className="navbar-btn-login" onClick={handleLogout}>
                <LogOut size={15} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="navbar-btn-login">
                <LogIn size={15}/>
                <span>Ingresar</span>
              </Link>
              <Link to="/signup" className="navbar-btn-register">
                <UserPlus size={15} />
                <span>Registrarse</span>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="navbar-search-container">
        <SearchBar />
      </div>
    </nav>
  );
}