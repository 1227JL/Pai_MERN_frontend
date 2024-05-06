import TableInstructores from "../components/TableInstructores";
import useInstructor from "../hooks/useInstructor";
import Spinner from "../components/Spinner";

export default function Instructores() {
  const { cargando } = useInstructor();


  if (cargando) return <Spinner>Obteniendo Instructores...</Spinner>;

  return (
    <>
      <h1 className="m-0 text-center">
        Gestiona los <span className="text-slate-600">Instructores</span>
      </h1>
      <TableInstructores />
    </>
  );
}
