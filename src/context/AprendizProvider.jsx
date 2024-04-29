import { createContext, useState } from "react";
import useTitulada from "../hooks/useTitulada";
import clienteAxios from "../../config/clienteAxios";
import { useNavigate, useParams } from "react-router-dom";

const AprendizContext = createContext();

const AprendizProvider = ({ children }) => {
  const navigate = useNavigate()
  const [cargando, setCargando] = useState(false);
  const [aprendiz, setAprendiz] = useState({});
  const [alerta, setAlerta] = useState({});
  const [ingreso, setIngreso] = useState({})
  const [modalAprendiz, setModalAprendiz] = useState(false);
  const [modalDetallesAprendiz, setModalDetallesAprendiz] = useState(false);
  const [modalEditarAprendiz, setModalEditarAprendiz] = useState(false);
  const { titulada, setTitulada } = useTitulada();
  const [modalEliminarAprendiz, setModalEliminarAprendiz] = useState(false);

  const submitAprendiz = async (aprendiz) => {
    if (aprendiz?.id) {
      await actualizaraprendiz(aprendiz);
      return;
    }
    await registrarAprendiz(aprendiz);
  };

  const registrarAprendiz = async (aprendiz) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/aprendices/${titulada._id}`,
        aprendiz,
        config
      );
      setTitulada({ ...titulada, aprendices: [...titulada.aprendices, data] });

      setAlerta({
        msg: "Aprendiz Registrado Exitosamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        setModalAprendiz(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setCargando(false);
    }
  };

  const eliminarAprendiz = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(`/aprendices/${id}`, config);

      const aprendicesActualizado = titulada.aprendices.filter(
        (aprendizState) => aprendizState._id != id
      );
      setTitulada({ ...titulada, aprendices: aprendicesActualizado });

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        setModalEliminarAprendiz(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setCargando(false);
    }
  };

  const obtenerAprendiz = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/aprendices/${id}`, config);
      setAprendiz(data);
    } catch (error) {
      navigate(`/consultar/tituladas/${titulada.ficha}`);
    } finally {
      setCargando(false);
    }
  };

  const obtenerIngresosAprendiz = async (date) => {
    setCargando(true);  // Asegúrate de tener esta función de estado definida en tu componente
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);  // Desactivar estado de carga si no hay token
        return;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }; 
      // Asumiendo que quieres enviar 'date' como parámetro de consulta
      const {data} = await clienteAxios.get(`/ingresos/${aprendiz?._id}/${date}`, config);
      setIngreso(data);  // La respuesta de axios está en `data`
    } catch (error) {
      console.error('Error al obtener ingresos:', error);
    } finally {
      setCargando(false);  // Desactivar estado de carga una vez finalizada la solicitud
    }
  };

  const obtenerTituladasAprendiz = async () => {
    setCargando(true);  // Asegúrate de tener esta función de estado definida en tu componente
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);  // Desactivar estado de carga si no hay token
        return;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }; 
      // Asumiendo que quieres enviar 'date' como parámetro de consulta
      const {data} = await clienteAxios.get(`/aprendices/${aprendiz?._id}/tituladas`, config);
      console.log(data)
    } catch (error) {
      console.error('Error al obtener ingresos:', error);
    } finally {
      setCargando(false);  // Desactivar estado de carga una vez finalizada la solicitud
    }
  }
  
  const handleModalAprendiz = () => {
    setModalAprendiz(!modalAprendiz);
    setAlerta({});
  };

  const handleModalDetallesAprendiz = (aprendiz) => {
    setAprendiz(aprendiz);
    setModalDetallesAprendiz(!modalDetallesAprendiz);
  };

  const handleModalEditarAprendiz = () => {
    console.log('Editando')
    navigate(`?Edit`)
    setModalAprendiz(!modalAprendiz)
  }

  const handleModalEliminarAprendiz = (id) => {
    setModalEliminarAprendiz(!modalEliminarAprendiz);
    setAprendiz(id);
  };

  return (
    <AprendizContext.Provider
      value={{
        alerta,
        cargando,
        aprendiz,
        ingreso,
        setIngreso,
        modalAprendiz,
        modalDetallesAprendiz,
        modalEliminarAprendiz,
        setAlerta,
        setModalAprendiz,
        handleModalAprendiz,
        handleModalDetallesAprendiz,
        handleModalEditarAprendiz,
        handleModalEliminarAprendiz,
        submitAprendiz,
        eliminarAprendiz,
        obtenerAprendiz,
        obtenerIngresosAprendiz,
        obtenerTituladasAprendiz
      }}
    >
      {children}
    </AprendizContext.Provider>
  );
};

export { AprendizProvider };

export default AprendizContext;
