import './Profile.css'
import '../../../styles/styles.css'
import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { editarPerfilUsuario } from '../../../services/usuarioService'
import { User, Mail, Phone, Circle, Clock3, LogOut, Pencil, X, Check } from 'lucide-react'

export default function ProfileUser() {
  const { usuario, login, logout } = useAuth()
  const navigate = useNavigate()
  const [editando, setEditando] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    nombre_usuario: '',
    email_usuario: '',
    telefono: '',
    username: ''
  })

  useEffect(() => {
    if (!usuario) navigate('/login')
    else setForm({
      nombre_usuario: usuario.nombre_usuario,
      email_usuario: usuario.email_usuario,
      telefono: usuario.telefono,
      username: usuario.username
    })
  }, [usuario, navigate])

  if (!usuario) return null

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleGuardar = async () => {
    setError('')
    setLoading(true)
    try {
      const actualizado = await editarPerfilUsuario({ id_usuario: usuario.id_usuario, ...form, foto_rostro: usuario.foto_rostro })
      login(actualizado)
      setEditando(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelar = () => {
    setForm({
      nombre_usuario: usuario.nombre_usuario,
      email_usuario: usuario.email_usuario,
      telefono: usuario.telefono,
      username: usuario.username
    })
    setError('')
    setEditando(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar-section">
          <div className="profile-avatar">
            {usuario.foto_rostro ? (
              <img src={usuario.foto_rostro} alt="Foto de perfil" className="profile-img" />
            ) : (
              <div className="profile-img-placeholder">
                {usuario.nombre_usuario?.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="profile-avatar-badge"><Clock3 size={20} /></div>
          </div>
          <div className="profile-header-info">
            <h1 className="profile-name">{usuario.nombre_usuario}</h1>
            <span className="profile-role">{usuario.nombre_rol}</span>
          </div>
        </div>

        <div className="profile-edit-actions">
          {!editando ? (
            <button className="profile-edit-btn" onClick={() => setEditando(true)}>
              <Pencil size={16} /> Editar perfil
            </button>
          ) : (
            <div className="profile-edit-controls">
              <button className="profile-save-btn" onClick={handleGuardar} disabled={loading}>
                <Check size={16} /> {loading ? 'Guardando...' : 'Guardar'}
              </button>
              <button className="profile-cancel-btn" onClick={handleCancelar} disabled={loading}>
                <X size={16} /> Cancelar
              </button>
            </div>
          )}
        </div>

        {error && <span className="profile-error">{error}</span>}

        <div className="profile-info-grid">
          <div className="profile-info-card">
            <div className="profile-info-icon profile-info-icon--user"><User size={24} /></div>
            <div className="profile-info-content">
              <span className="profile-info-label">Nombre completo</span>
              {editando
                ? <input className="profile-input" name="nombre_usuario" value={form.nombre_usuario} onChange={handleChange} />
                : <span className="profile-info-value">{usuario.nombre_usuario}</span>
              }
            </div>
          </div>

          <div className="profile-info-card">
            <div className="profile-info-icon profile-info-icon--user"><User size={24} /></div>
            <div className="profile-info-content">
              <span className="profile-info-label">Usuario</span>
              {editando
                ? <input className="profile-input" name="username" value={form.username} onChange={handleChange} />
                : <span className="profile-info-value">@{usuario.username}</span>
              }
            </div>
          </div>

          <div className="profile-info-card">
            <div className="profile-info-icon profile-info-icon--email"><Mail size={24} /></div>
            <div className="profile-info-content">
              <span className="profile-info-label">Correo electrónico</span>
              {editando
                ? <input className="profile-input" name="email_usuario" type="email" value={form.email_usuario} onChange={handleChange} />
                : <span className="profile-info-value">{usuario.email_usuario}</span>
              }
            </div>
          </div>

          <div className="profile-info-card">
            <div className="profile-info-icon profile-info-icon--phone"><Phone size={24} /></div>
            <div className="profile-info-content">
              <span className="profile-info-label">Teléfono</span>
              {editando
                ? <input className="profile-input" name="telefono" type="tel" value={form.telefono} onChange={handleChange} />
                : <span className="profile-info-value">{usuario.telefono}</span>
              }
            </div>
          </div>

          <div className="profile-info-card">
            <div className={`profile-info-icon profile-info-icon--status profile-info-icon--${usuario.estado_usuario === 'activo' ? 'active' : 'inactive'}`}>
              <Circle size={24} fill="currentColor" />
            </div>
            <div className="profile-info-content">
              <span className="profile-info-label">Estado</span>
              <span className={`profile-info-status profile-info-status--${usuario.estado_usuario === 'activo' ? 'activo' : 'inactivo'}`}>
                {usuario.estado_usuario}
              </span>
            </div>
          </div>
        </div>

        <button className="profile-logout-btn" onClick={handleLogout}>
          <LogOut size={20} /> Cerrar Sesión
        </button>
      </div>
    </div>
  )
}