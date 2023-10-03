import TableAmbientes from "../components/TableAmbientes"
import Spinner from "../components/Spinner"
import useAmbiente from "../hooks/useAmbiente"

export default function Ambientes() {
  
  const { cargando } = useAmbiente()
  if(cargando) return <Spinner>Obteniendo Ambientes...</Spinner>

  return (
    <>
      <h1 className="heading text-center mb-10">Gestiona los <span className='text-slate-600'>Ambientes</span></h1>
      <TableAmbientes/>
    </>
  )
}
