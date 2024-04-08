import { createContext, useState, useEffect } from "react";

const AprendizContext = createContext();

const AprendizProvider = ({children}) => {
  const [aprendices, setAprendices] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [modalAprendiz, setModalAprendiz] = useState(false);
  const [modalDetallesAprendiz, setModalDetallesAprendiz] = useState(false);
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

      const { data } = await clienteAxios.post("/aprendiz", aprendiz, config);
      const aprendicesActualizado = [...aprendices, data];

      console.log();

      setAprendices(aprendicesActualizado);
      setAlerta({
        msg: "Aprendiz Registrado Exitosamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        setModalTitulada(false);
      }, 2000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setCargando(false);
    }
  };

  const handleModalAprendiz = () => {
    setModalAprendiz(!modalAprendiz);
    setAlerta({});
  };

//   const handleModalDetallesAprendiz = (aprendiz) => {
//     setAprendiz(aprendiz);
//     setModalDetallesAprendiz(!modalDetallesAprendiz);
//   };

  const handleModalEliminarAprendiz = () => {
    setModalEliminarAprendiz(!modalEliminarAprendiz);
  };

  return (
    <AprendizContext.Provider
      value={{
        alerta,
        setAlerta,
        aprendices,
        modalAprendiz,
        modalDetallesAprendiz,
        setModalAprendiz,
        handleModalAprendiz,
        // handleModalDetallesAprendiz,
        handleModalEliminarAprendiz,
        submitAprendiz,
      }}
    >
        {children}
    </AprendizContext.Provider>
  );
};

export { AprendizProvider };

export default AprendizContext;
