import { createContext, useState } from "react";
import useTitulada from "../hooks/useTitulada";
import clienteAxios from "../../config/clienteAxios";

const AprendizContext = createContext();

const AprendizProvider = ({children}) => {
  const [cargando, setCargando] = useState(false)
  const [aprendiz, setAprendiz] = useState({})
  const [alerta, setAlerta] = useState({});
  const [modalAprendiz, setModalAprendiz] = useState(false);
  const [modalDetallesAprendiz, setModalDetallesAprendiz] = useState(false);
  const [modalEliminarAprendiz, setModalEliminarAprendiz] = useState(false);
  const { titulada, setTitulada } = useTitulada()

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

      const { data } = await clienteAxios.post(`/aprendices/${titulada._id}`, aprendiz, config);
      setTitulada({...titulada, aprendices: [...titulada.aprendices, data]})

      setAlerta({
        msg: "Aprendiz Registrado Exitosamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        setModalAprendiz(false);
      }, 2000);
    } catch (error) {
      console.log(error)
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

      const aprendicesActualizado = titulada.aprendices.filter(aprendizState => aprendizState._id != id)
      setTitulada({...titulada, aprendices: aprendicesActualizado})

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        setModalEliminarAprendiz(false);
      }, 2000);
    } catch (error) {
      console.log(error)
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setCargando(false);
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

  const handleModalEliminarAprendiz = (id) => {
    setModalEliminarAprendiz(!modalEliminarAprendiz);
    setAprendiz(id)
  };

  return (
    <AprendizContext.Provider
      value={{
        alerta,
        cargando,
        aprendiz,
        modalAprendiz,
        modalDetallesAprendiz,
        modalEliminarAprendiz,
        setAlerta,
        setModalAprendiz,
        handleModalAprendiz,
        handleModalDetallesAprendiz,
        handleModalEliminarAprendiz,
        submitAprendiz,
        eliminarAprendiz
      }}
    >
        {children}
    </AprendizContext.Provider>
  );
};

export { AprendizProvider };

export default AprendizContext;
