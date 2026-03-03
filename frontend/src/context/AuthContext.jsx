import { createContext, useContext, useState, useEffect } from "react";
import { getMe, login as apiLogin, logout as apiLogout } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then((res) => setAdmin(res.data))
      .catch(() => setAdmin(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    const res = await apiLogin(credentials);
    setAdmin(res.data.admin);
    return res;
  };

  const logout = async () => {
    await apiLogout();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
