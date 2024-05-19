import { useEffect } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import TableAprendices from "../components/TableAprendices";
import useTitulada from "../hooks/useTitulada";
import Spinner from "../components/Spinner";
import ModalTitulada from "../components/ModalTitulada";
import { EditIcon } from "../components/EditIcon";
import { DeleteIcon } from "../components/DeleteIcon";
import { Tab, Tabs, Tooltip } from "@nextui-org/react";
import { EyeIcon } from "../components/EyeIcon";
import ModalEliminarTitulada from "../components/ModalEliminarTitulada";
import ModalAprendiz from "../components/ModalAprendiz";
import TableCompetencias from "../components/TableCompetencias";
import ModalDetallesCompetencia from "../components/ModalDetallesCompetencia";
import ModalEliminarAprendiz from "../components/ModalEliminarAprendiz";
import ModalDetallesTitulada from "../components/ModalDetallesTitulada";
import TableInstructoresAsociadasTitulada from "../components/TableInstructoresAsociados";

export default function Titulada() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Hook para capturar parámetros de consulta
  const competenciaId = searchParams.get("competencia"); // Obtén el valor del parámetro de consulta aprendizId

  const {
    titulada,
    aprendices,
    obtenerTitulada,
    handleModalTitulada,
    handleModalDetallesTitulada,
    handleModalDetallesCompetencia,
    handleModalEliminarTitulada,
    obtenerAprendicesTitulada,
    obtenerInstructoresTitulada,
    obtenerCompetenciasTitulada
  } = useTitulada();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const tab = query.get("tab");

  useEffect(() => {
    obtenerTitulada(params.ficha);
  }, [params]);

  useEffect(() => {
    // Verifica que ambos, titulada._id y competenciaId, tengan valores definidos
    if (titulada._id && competenciaId) {
      handleModalDetallesCompetencia(competenciaId);
    }
  }, [titulada]); // Agrega competenciaId a las dependencias
  
  const handleTabSelected = async (key) => {
    navigate(`?tab=${key}`);

    switch (key) {
      case 'aprendices':
        await obtenerAprendicesTitulada(titulada._id);
        break;
      case 'instructores':
        await obtenerInstructoresTitulada(titulada._id);
        break;
      case 'competencias':
        await obtenerCompetenciasTitulada(titulada._id);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (Object.keys(titulada).length > 0) {
      switch (tab) {
        case 'aprendices':
          obtenerAprendicesTitulada(titulada._id);
          break;
        case 'instructores':
          obtenerInstructoresTitulada(titulada._id);
          break;
        case 'competencias':
          obtenerCompetenciasTitulada(titulada._id);
          break;
        default:
          break;
      }
    }
  }, [titulada, tab, obtenerAprendicesTitulada, obtenerInstructoresTitulada, obtenerCompetenciasTitulada]);

  if (Object.keys(titulada).length == 0) return <Spinner>Obteniendo Titulada...</Spinner>;

  return (
    <div
      className={
        "flex flex-col max-sm:justify-center max-sm:items-center space-y-4"
      }
    >
      <div className="flex flex-col lg:flex-row gap-2 justify-between items-center">
        <h1 className=" text-xl md:text-3xl text-center uppercase">
          {Object.values(titulada).length > 0 ? `${titulada?.programa} (${titulada?.ficha})` : ""}
        </h1>
        <div className="flex gap-5 items-center ml-auto">
          <Tooltip content="Detalles de la Titulada">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EyeIcon onClick={handleModalDetallesTitulada} />
            </span>
          </Tooltip>
          <Tooltip color="secondary" content="Editar titulada">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon onClick={handleModalTitulada} />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Eliminar Titulada">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <DeleteIcon onClick={handleModalEliminarTitulada} />
            </span>
          </Tooltip>
        </div>
      </div>
      <Tabs
        className="max-sm:*:flex-wrap max-sm:mx-auto"
        aria-label="Options"
        defaultSelectedKey={tab}
        onSelectionChange={(key) => handleTabSelected(key)}
      >
        <Tab key="aprendices" title="Aprendices">
          <h1>Aprendices</h1>
          {aprendices.length == 0 ? (
            <Spinner>Obteniendo aprendices...</Spinner>
          ) : (
            <TableAprendices aprendices={aprendices} />
          )}
        </Tab>
        <Tab key="instructores" title="Instructores">
          <h1>Instructores</h1>
          <TableInstructoresAsociadasTitulada/>
        </Tab>
        <Tab key="competencias" title="Competencias">
          <h1>Competencias</h1>
          <TableCompetencias />
        </Tab>
        <Tab key="transversales" title="Transversales">
          <h1>Transversales</h1>
        </Tab>
      </Tabs>
      <ModalAprendiz />
      <ModalDetallesTitulada />
      <ModalDetallesCompetencia />
      <ModalEliminarTitulada/> 
    </div>
  );
}
