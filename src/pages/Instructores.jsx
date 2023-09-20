import TableInstructores from '../components/TableInstructores'
import useIntructor from '../hooks/useInstructor'
import Spinner from '../components/Spinner'
import Alerta from '../components/Alerta'

export default function Instructores() {

  const { cargando, alerta } = useIntructor()

  if(cargando) return <Spinner>Obteniendo Instructores...</Spinner>

  const { msg } = alerta

  return (
    <>
      <h1 className="text-center mb-5 uppercase">Instructores</h1>

      {msg && <Alerta alerta={alerta}/>}
      <TableInstructores/>
    </>
  )
}
