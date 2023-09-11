import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export default function Header() {

  const { auth, cerrarSesionAuth } = useAuth()
  const { nombre, rol } = auth

  
  const handleCerrarSesion = () => {
    cerrarSesionAuth()
    localStorage.removeItem('token')
  }

  return (
    <div className='shadow-200 p-8 rounded-full flex justify-between items-center relative'>
      <div className=''>
        <p className='font-black text-3xl'>Pa<span className='text-primary-100'>i</span></p>
      </div>
      <nav className="mx-auto">
        <ul className="flex gap-10">
          <Link className="text-sm font-bold" to={'/home'}>Inicio</Link>
          <Link className="text-sm font-bold" to={'/consultar'}>Consultar</Link>
          <Link className="text-sm font-bold" to={'/eventos'}>Eventos</Link>
        </ul>
      </nav>
      <div className="flex gap-3 absolute right-0 items-center px-16">
        <img src="/src/assets/bell.png" alt="icono notificaciones"/>
        <div className="flex flex-col text-xs gap-1">
          <p className="text-right font-bold">{nombre}</p>
          <p className="text-right text-gray-400">{rol}</p>
        </div>
        <img src="/src/assets/user.jpg" alt="icono notificaciones" height={64} width={64}/>
      </div>
      <div className="relative group">
        <img
          className="cursor-pointer"
          src="/src/assets/down-arrow.png"
          alt="icono notificaciones"
          height={20}
          width={20}
        />
        <div className="absolute right-0 hidden group-hover:block">
          <ul className="flex flex-col shadow-2xl p-3 bg-white w-40 rounded-lg">
            <Link className="text-sm block p-2 hover:bg-gray-100 rounded-md">Ver perfil</Link>
            <li onClick={handleCerrarSesion} className="text-sm block p-2 hover:bg-gray-100 hover:cursor-pointer rounded-md">Cerrar sesión</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
