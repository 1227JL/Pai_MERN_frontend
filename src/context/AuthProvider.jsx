import { useState, useEffect, createContext } from "react";
import clienteAxios from "../../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios.get("/usuarios/perfil", config);
        setAuth(data);
      } catch (error) {
        setAuth({});
      } finally {
        setCargando(false);
      }
    };
    return () => {
      autenticarUsuario();
    };
  }, []);

  const cerrarSesionAuth = () => {
    setAuth({});
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesionAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
