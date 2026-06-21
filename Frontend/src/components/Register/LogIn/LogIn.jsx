import React, { useState } from 'react';
import './LogIn.css';
import '../../../styles/styles.css';
import { Link, useNavigate } from 'react-router';
import { loginUsuario } from '../../../services/usuarioService';
import { loginAdmin } from '../../../services/adminService';
import { useAuth } from '../../../context/AuthContext';

export default function LogInUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [modo, setModo] = useState('usuario');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (modo === 'admin') {
        const { usuario, token } = await loginAdmin(username, password);
        login(usuario, token);
        navigate('/admin');
      } else {
        const { usuario, token } = await loginUsuario({ username, password });
        login(usuario, token);
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Iniciar Sesión</h1>

        <div className="login-modo-toggle">
          <button
            type="button"
            className={`login-modo-btn ${modo === 'usuario' ? 'active' : ''}`}
            onClick={() => { setModo('usuario'); setError(''); }}
          >
            Usuario
          </button>
          <button
            type="button"
            className={`login-modo-btn ${modo === 'admin' ? 'active' : ''}`}
            onClick={() => { setModo('admin'); setError(''); }}
          >
            Administrador
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="username" className="login-label">Usuario</label>
            <input
              type="text"
              id="username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              required
            />
          </div>
          <div className="login-form-group">
            <label htmlFor="password" className="login-label">Contraseña</label>
            <input
              type="password"
              id="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          {error && <span className="login-error-message">{error}</span>}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        {modo === 'usuario' && (
          <div className="login-footer">
            <p className="login-text">¿No tienes cuenta? <Link to="/signup" className="login-link">Registrarse</Link></p>
          </div>
        )}
      </div>
    </div>
  );
}