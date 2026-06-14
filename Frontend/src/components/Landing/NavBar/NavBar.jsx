import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { House, Music, Drama, Trophy, Star, MapPinned, Ticket, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import SearchBar from './SearchBar';
import "./NavBar.css";
import "../../../styles/styles.css";
import { useAuth } from '../../../context/AuthContext';

export default function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(true);
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    logout();
    closeSidebar();
    navigate('/');
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <img src="/LogoNodus.webp" alt="Logo" className="navbar-logo" />
        <ul className="navbar-links">
          <li>
            <Link to="/">
              <House size={16} />
              <span>Inicio</span>
            </Link>
          </li>
          <li>
            <Link to="/eventos">
              <Music size={16} />
              <span>Conciertos y Festivales</span>
            </Link>
          </li>
          <li>
            <Link to="/eventos">
              <Drama size={16} />
              <span>Teatro y Cultura</span>
            </Link>
          </li>
          <li>
            <Link to="/mis-eventos">
              <Ticket size={16} />
              <span>Mis Tickets</span>
            </Link>
          </li>
        </ul>
        <div className="navbar-buttons">
          {usuario ? (
            <div className="navbar-user">
              <Link to="/profile" className="navbar-username">
                <User size={16} />
                <span>Hola, {usuario.nombre_usuario}</span>
              </Link>
              <button className="navbar-btn-login" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="navbar-btn-login">
                <LogIn size={16}/>
                <span>Ingresar</span>
              </Link>
              <Link to="/signup" className="navbar-btn-register">
                <UserPlus size={16} />
                <span>Registrarse</span>
              </Link>
            </>
          )}
        </div>
        <button className="hamburger" onClick={toggleSidebar} aria-label="Abrir menú">
          <span className={`hamburger-line ${sidebarOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${sidebarOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${sidebarOpen ? 'open' : ''}`}></span>
        </button>
      </div>
      {sidebarOpen && <div className="navbar-overlay" onClick={closeSidebar}></div>}
      <div className={`navbar-sidebar ${sidebarOpen ? 'active' : ''}`}>
        <ul className="navbar-sidebar-links">
          <li>
            <Link to="/" onClick={closeSidebar}>
              <House size={16} />
              <span>Inicio</span>
            </Link>
          </li>
          <li>
            <Link to="/eventos" onClick={closeSidebar}>
              <Music size={16} />
              <span>Conciertos y Festivales</span>
            </Link>
          </li>
          <li>
            <Link to="/eventos" onClick={closeSidebar}>
              <Drama size={16} />
              <span>Teatro y Cultura</span>
            </Link>
          </li>
          <li>
            <Link to="/mis-eventos" onClick={closeSidebar}>
              <Ticket size={16} />
              <span>Mis Tickets</span>
            </Link>
          </li>
        </ul>
        <div className="navbar-sidebar-buttons">
          {usuario ? (
            <div className="navbar-sidebar-user">
              <Link to="/profile" className="navbar-sidebar-username" onClick={closeSidebar}>
                <User size={16} />
                <span>Hola, {usuario.nombre_usuario}</span>
              </Link>
              <button className="navbar-sidebar-btn-login" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="navbar-sidebar-btn-login" onClick={closeSidebar}>
                <LogIn size={16}/>
                <span>Ingresar</span>
              </Link>
              <Link to="/signup" className="navbar-sidebar-btn-register" onClick={closeSidebar}>
                <UserPlus size={16} />
                <span>Registrarse</span>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className={`navbar-search-container ${searchVisible ? 'visible' : 'hidden'}`}>
        <SearchBar onToggleSearch={toggleSearch} isVisible={searchVisible} />
      </div>
    </nav>
  );
}