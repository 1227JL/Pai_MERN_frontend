import { useState, createContext, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../../config/clienteAxios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formatStrings } from "../helpers/utils";

const TituladaContext = createContext();

const TituladaProvider = ({ children }) => {
  const { auth } = useAuth();
  const [searchParams] = useSearchParams(); // Hook para capturar parámetros de consulta
  const competenciaId = searchParams.get("competencia"); // Obtén el valor del parámetro de consulta aprendizId

  const navigate = useNavigate();

  const [tituladas, setTituladas] = useState([]);
  const [titulada, setTitulada] = useState({});
  const [busqueda, setBusqueda] = useState("");
  const [aprendices, setAprendices] = useState([]);
  const [instructores, setInstructores] = useState([]);
  const [competencias, setCompetencias] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [cargando, setCargando] = useState(false);
  const [buscador, setBuscador] = useState(false);
  const [competencia, setCompetencia] = useState("");
  const [modalTitulada, setModalTitulada] = useState(false);
  const [modalDetallesTitulada, setModalDetallesTitulada] = useState(false);
  const [modalEliminarTitulada, setModalEliminarTitulada] = useState(false);
  const [modalDetallesCompetencia, setModalDetallesCompetencia] =
    useState(false);

  useEffect(() => {
    const obtenerTituladas = async () => {
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

        const { data } = await clienteAxios("/tituladas", config);
        setTituladas(data);
      } catch (error) {
        console.log(error);
      } finally {
        setCargando(false);
      }
    };
    return () => obtenerTituladas();
  }, [auth]);

  useEffect(() => {
    // Verifica que ambos, titulada._id y competenciaId, tengan valores definidos
    if (titulada._id && competenciaId) {
      handleModalDetallesCompetencia(competenciaId);
    }
  }, [titulada]); // Agrega competenciaId a las dependencias

  const handleBuscador = () => {
    setBuscador(!buscador);
  };

  const submitTitulada = async (titulada) => {
    if (titulada?.id) {
      await actualizarTitulada(titulada);
      return;
    }
    await crearTitulada(titulada);
  };

  const crearTitulada = async (titulada) => {
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

      const { data } = await clienteAxios.post("/tituladas", titulada, config);
      const tituladaActualizada = [...tituladas, data];

      setTituladas(tituladaActualizada);
      setAlerta({
        msg: "Titulada Creada Exitosamente",
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

  const obtenerTitulada = async (ficha) => {
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

      const { data } = await clienteAxios(`/tituladas/${ficha}`, config);
      setTitulada(data);
    } catch (error) {
      navigate("/consultar/tituladas");
    } finally {
      setCargando(false);
    }
  };

  const actualizarTitulada = async (titulada) => {
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

      const { data } = await clienteAxios.put(
        `/tituladas/${titulada?.id}`,
        titulada,
        config
      );
      setTitulada(data);

      const tituladasActualizadas = tituladas.map((tituladaState) =>
        tituladaState._id === data._id ? data : tituladaState
      );
      setTituladas(tituladasActualizadas);

      setAlerta({
        msg: "Titulada Actualizada Exitosamente",
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
    }
  };

  const eliminarTitulada = async (id) => {
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

      const { data } = await clienteAxios.delete(`/tituladas/${id}`, config);

      const tituladasActualizadas = tituladas.filter(
        (tituladaState) => tituladaState._id !== id
      );
      setTituladas(tituladasActualizadas);

      navigate("/consultar/tituladas");

      setAlerta({
        msg: data.msg,
        error: true,
      });

      setTimeout(() => {
        setAlerta({});
      }, 2000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setModalEliminarTitulada(false);
    }
  };

  const obtenerDataCompetencia = async (competencia) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.get(
        `/tituladas/${titulada._id}/${competencia}`,
        config
      );
      console.log(data)
      setCompetencia(data);
    } catch (error) {
      console.error("Error fetching competencia data:", error);
      setAlerta({
        msg: error.response?.data.msg || "Error fetching data",
        error: true,
      });
    }
  };

  const obtenerDiseño = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/tituladas/file-access/${formatStrings(
          titulada.programa,
          titulada.ficha
        )}/${titulada.archivoAdjunto}`,
        config
      );
      window.open(data, "_blank");
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const obtenerAprendicesTitulada = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/tituladas/${titulada?._id}/aprendices`,
        config
      );
      setAprendices(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerInstructoresTitulada = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/tituladas/${titulada?._id}/instructores`,
        config
      );
      setInstructores(data)
      setInstructores(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerCompetenciasTitulada = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/tituladas/${titulada?._id}/competencias`,
        config
      );

      setCompetencias(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleModalTitulada = () => {
    setModalTitulada(!modalTitulada);
    setAlerta({});
  };

  const handleModalDetallesTitulada = () => {
    setModalDetallesTitulada(!modalDetallesTitulada);
  };

  const handleModalEliminarTitulada = () => {
    setModalEliminarTitulada(!modalEliminarTitulada);
  };

  const handleModalDetallesCompetencia = (competencia) => {
    // Alternar el estado del modal
    setModalDetallesCompetencia(!modalDetallesCompetencia);

    // Si competencia está definida, obtener los datos de la competencia
    if (competencia) {
      console.log('first')
      obtenerDataCompetencia(competencia);
    }
  };

  return (
    <TituladaContext.Provider
      value={{
        cargando,
        busqueda,
        tituladas,
        titulada,
        aprendices,
        instructores,
        competencias,
        alerta,
        buscador,
        competencia,
        modalTitulada,
        modalDetallesTitulada,
        modalEliminarTitulada,
        modalDetallesCompetencia,
        setTitulada,
        setBusqueda,
        setTituladas,
        setAlerta,
        handleBuscador,
        handleModalTitulada,
        handleModalDetallesTitulada,
        handleModalEliminarTitulada,
        handleModalDetallesCompetencia,
        submitTitulada,
        obtenerTitulada,
        eliminarTitulada,
        obtenerDiseño,
        obtenerAprendicesTitulada,
        obtenerInstructoresTitulada,
        obtenerCompetenciasTitulada
      }}
    >
      {children}
    </TituladaContext.Provider>
  );
};

export { TituladaProvider };

export default TituladaContext;
