import { useEffect } from "react"
import { useParams } from "react-router-dom"
import TableAprendices from "../components/TableAprendices"
import useTitulada from "../hooks/useTitulada"
import Spinner from "../components/Spinner"
import ModalTitulada from "../components/ModalTitulada"
import ModalDetallesTitulada from "../components/ModalDetallesTitulada"
import { EditIcon } from "../components/EditIcon"
import { DeleteIcon } from "../components/DeleteIcon"
import { Tooltip } from "@nextui-org/react"
import { EyeIcon } from "../components/EyeIcon"
import ModalEliminarTitulada from "../components/ModalEliminarTitulada"
import ModalAprendiz from "../components/ModalAprendiz"
import ModalDetallesAprendiz from "../components/ModalDetallesAprendiz"
import TableCompetencias from "../components/TableCompetencias"
import ModalDetallesCompetencia from "../components/ModalDetallesCompetencia"
import ModalEliminarAprendiz from "../components/ModalEliminarAprendiz"
import useAprendiz from "../hooks/useAprendiz"

export default function Titulada() {
      
  const params = useParams()
  const { cargando, titulada, obtenerTitulada, eliminarTitulada, handleModalTitulada, handleModalDetallesTitulada, handleModalEliminarTitulada } = useTitulada()
  useEffect(() => {
    return ()=>obtenerTitulada(params.ficha)
  }, [])

  const { aprendiz, eliminarAprendiz } = useAprendiz()

  
  if(cargando || !titulada.aprendices) return <Spinner>Obteniendo Titulada...</Spinner>

  return (
    <div className={'space-y-4'}>
      <div className="flex flex-col lg:flex-row gap-2 justify-between mb-7 items-center">
        <h1 className=" text-xl md:text-3xl text-center uppercase">{titulada.programa} ({titulada.ficha})</h1>
        <div className="flex gap-5 items-center ml-auto">
          <Tooltip content="Detalles de la Titulada">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EyeIcon onClick={handleModalDetallesTitulada}/>
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
      <div>
        <h1>Aprendices</h1>
        <TableAprendices/>
      </div>
      <div>
        <h1>Competencias</h1>
        <TableCompetencias/>
      </div>
      <ModalTitulada/>
      <ModalAprendiz/>
      <ModalDetallesAprendiz/>
      <ModalEliminarAprendiz title={aprendiz?.nombre} onClick={()=>eliminarAprendiz(aprendiz?._id)}/>
      <ModalDetallesTitulada/>
      <ModalDetallesCompetencia/>
      <ModalEliminarTitulada title={'Titulada'} onClick={()=>eliminarTitulada(titulada?._id)}/>
    </div>
  )
}
