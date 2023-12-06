import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import MenuOpcionesPerfil from "./MenuOpcionesPerfil"
import MenuNavegacionConsultar from "./MenuNavegacionConsultar"

export default function Header() {

  const { auth } = useAuth()
  const { nombre, rol } = auth

  return (
    <div className='lg:shadow-small p-2 md:p-8 rounded-full flex justify-between items-center relative'>
      <div>
        <Link
          to={'/inicio'}
        >
          <p className='font-black text-3xl'>Pa<span className='text-primary-100'>i</span></p>
        </Link>
      </div>
      <nav className="mx-auto hidden lg:block">
        <ul className="flex gap-10 items-center">
          <Link 
            className="text-sm font-bold p-2 rounded hover:bg-white-200 transition-colors" 
            to={'/inicio'}
          >Inicio</Link>
          <MenuNavegacionConsultar/>
          <Link 
            className="text-sm font-bold p-2 rounded hover:bg-white-200 transition-colors" 
            to={'/eventos'}
          >Eventos</Link>
        </ul>
      </nav>
      <div className="flex gap-3 items-center absolute right-0 lg:right-8 z-10">
        <div className="hidden sm:flex flex-col text-sm gap-1">
          <p className="hidden sm:block text-right font-semibold">{nombre}</p>
          <p className="hidden sm:block text-right text-default-400">{rol}</p>
        </div>
        <img src="/src/assets/user.jpg" alt="icono usuario" height={64} width={64}/>
        <MenuOpcionesPerfil/>
      </div>
    </div>
  )
}
