import React, { useState } from 'react';
import './SignUp.css';
import '../../../styles/styles.css'

export default function SignUpUser() {
  const [nombre_usuario, setNombre_usuario] = useState('');
  const [email_usuario, setEmail_usuario] = useState('');
  const [telefono, setTelefono] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (confirmPassword && newPassword !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    if (password && password !== newConfirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }
    console.log('SignUp:', {
      nombre_usuario,
      email_usuario,
      telefono,
      username,
      password
    });
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Crear Cuenta</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-form-group">
            <label htmlFor="nombre_usuario" className="signup-label">Nombre Completo</label>
            <input
              type="text"
              id="nombre_usuario"
              className="signup-input"
              value={nombre_usuario}
              onChange={(e) => setNombre_usuario(e.target.value)}
              placeholder="Tu nombre completo"
              required
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="email_usuario" className="signup-label">Correo Electrónico</label>
            <input
              type="email"
              id="email_usuario"
              className="signup-input"
              value={email_usuario}
              onChange={(e) => setEmail_usuario(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="telefono" className="signup-label">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              className="signup-input"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="+1 (555) 123-4567"
              required
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="username" className="signup-label">Usuario</label>
            <input
              type="text"
              id="username"
              className="signup-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Elige tu usuario"
              required
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="password" className="signup-label">Contraseña</label>
            <input
              type="password"
              id="password"
              className="signup-input"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Crea una contraseña segura"
              required
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="confirmPassword" className="signup-label">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              className={`signup-input ${passwordError ? 'signup-input-error' : ''}`}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirma tu contraseña"
              required
            />
            {passwordError && <span className="signup-error-message">{passwordError}</span>}
          </div>

          <button type="submit" className="signup-button">Registrarse</button>
        </form>

        <div className="signup-footer">
          <p className="signup-text">¿Ya tienes cuenta? <a href="#login" className="signup-link">Iniciar Sesión</a></p>
        </div>
      </div>
    </div>
  );
}