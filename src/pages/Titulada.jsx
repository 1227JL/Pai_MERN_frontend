import { useEffect } from "react"
import { useParams } from "react-router-dom"
import TableAprendices from "./TableAprendices"
import useTitulada from "../hooks/useTitulada"
import Spinner from "../components/Spinner"
import ModalTitulada from "../components/ModalTitulada"
import ModalDetallesTitulada from "../components/ModalDetallesTitulada"
import Alerta from "../components/Alerta"
import { EditIcon } from "../components/EditIcon"
import { DeleteIcon } from "../components/DeleteIcon"
import { Tooltip } from "@nextui-org/react"
import { EyeIcon } from "../components/EyeIcon"

export default function Titulada() {
      
  const params = useParams()
  const { cargando, alerta, titulada, obtenerTitulada, handleModalTitulada, handleModaDetalleslTitulada } = useTitulada()

  useEffect(() => {
    return ()=>obtenerTitulada(params.ficha)
  }, [])

  if(cargando) return <Spinner>Obteniendo Titulada...</Spinner>

  const { error } = alerta

  if(error) return <Alerta alerta={alerta}/>

  return (
    <>
      <div className="flex justify-between mb-7 items-center">
        <h1 className="text-center uppercase">{titulada.programa}</h1>
        <div className="flex gap-5 items-center">
          <Tooltip content="Detalles de la Titulada">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EyeIcon onClick={handleModaDetalleslTitulada}/>
            </span>
          </Tooltip>
          <Tooltip content="Editar titulada">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon onClick={handleModalTitulada} />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Eliminar Titulada">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      </div>
      <TableAprendices/>
      <ModalTitulada/>
      <ModalDetallesTitulada/>
    </>
  )
}
