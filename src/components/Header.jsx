import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import MenuOpcionesPerfil from "./MenuOpcionesPerfil"
import MenuNavegacionConsultar from "./MenuNavegacionConsultar"

export default function Header() {

  const { auth } = useAuth()
  const { nombre, rol } = auth

  return (
    <div className='shadow-small p-8 rounded-full flex justify-between items-center relative'>
      <div className=''>
        <p className='font-black text-3xl'>Pa<span className='text-primary-100'>i</span></p>
      </div>
      <nav className="mx-auto">
        <ul className="flex gap-10 items-center">
          <Link 
            className="text-sm font-bold p-2 rounded text-black-100 hover:bg-white-200 transition-colors" 
            to={'/inicio'}
          >Inicio</Link>
          <MenuNavegacionConsultar/>
          <Link 
            className="text-sm font-bold p-2 rounded text-black-100 hover:bg-white-200 transition-colors" 
            to={'/eventos'}
          >Eventos</Link>
        </ul>
      </nav>
      <div className="flex gap-3 items-center absolute right-8 z-10">
        <img src="/src/assets/bell.png" alt="icono notificaciones"/>
        <div className="flex flex-col text-sm gap-1">
          <p className="text-right text-black-100 font-semibold">{nombre}</p>
          <p className="text-right text-default-400">{rol}</p>
        </div>
        <img src="/src/assets/user.jpg" alt="icono notificaciones" height={64} width={64}/>
        <MenuOpcionesPerfil/>
      </div>
    </div>
  )
}
