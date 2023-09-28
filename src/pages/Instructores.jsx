import TableInstructores from '../components/TableInstructores'
import useIntructor from '../hooks/useInstructor'
import Spinner from '../components/Spinner'

export default function Instructores() {

  const { cargando } = useIntructor()

  if(cargando) return <Spinner>Obteniendo Instructores...</Spinner>

  return (
    <>
      <h1 className="heading text-center mb-10">Gestiona los <span className='text-slate-600'>Instructores</span></h1>
      <TableInstructores/>
    </>
  )
}
