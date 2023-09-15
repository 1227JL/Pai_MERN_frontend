import { useEffect } from "react"
import { useParams } from "react-router-dom"
import TableAprendices from "./TableAprendices"
import useTitulada from "../hooks/useTitulada"
import Spinner from "../components/Spinner"
import ModalTitulada from "../components/ModalTitulada"

export default function Titulada() {
      
  const params = useParams()
  const { cargando, titulada, obtenerTitulada, handleModalTitulada } = useTitulada()

  useEffect(() => {
    return ()=>obtenerTitulada(params.ficha)
  }, [])

  if(cargando) return <Spinner>Obteniendo Titulada...</Spinner>

  return (
    <>
      <div className="flex justify-between mb-7 items-center">
        <h1 className="text-center uppercase">{titulada.programa}</h1>
        <button
          type="button"
          className="bg-more-100 capitalize text-small text-white flex items-center gap-2 px-7 rounded-xl h-10 hover:bg-more-200 transition-colors"
          onClick={handleModalTitulada}
        >
          Editar
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
        </button>
      </div>
      <TableAprendices/>
      <ModalTitulada/>
    </>
  )
}
