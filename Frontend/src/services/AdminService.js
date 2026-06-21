import AdminModel from "../models/AdminModel";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin/auth`;

export const loginAdmin = async (username, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.message || "Error al iniciar sesión");
  }

  localStorage.setItem("admin_token", data.token);
  localStorage.setItem("admin_user", JSON.stringify(data.usuario));

  return {
    token: data.token,
    usuario: new AdminModel(data.usuario)
  };
};

export const logoutAdmin = () => {
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_user");
};

export const getAdminToken = () => {
  return localStorage.getItem("admin_token");
};

export const getAdminUser = () => {
  const user = localStorage.getItem("admin_user");

  if (!user) {
    return null;
  }

  return new AdminModel(JSON.parse(user));
};

export const isAdminAuthenticated = () => {
  return !!localStorage.getItem("admin_token");
};