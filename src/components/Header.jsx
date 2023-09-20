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
        <p className='font-black text-3xl'>Pa<span className='text-primary-100'>i</span></p>
      </div>
      <nav className="mx-auto hidden lg:block">
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
      <div className="flex gap-3 items-center absolute right-0 lg:right-8 z-10">
        <img className="hidden lg:block" src="/src/assets/bell.png" alt="icono notificaciones"/>
        <div className="flex flex-col text-sm gap-1">
          <p className="text-right text-black-100 font-semibold">{nombre}</p>
          <p className="text-right text-default-400">{rol}</p>
        </div>
        <img src="/src/assets/user.jpg" alt="icono usuario" height={64} width={64}/>
        <MenuOpcionesPerfil/>
      </div>
    </div>
  )
}
