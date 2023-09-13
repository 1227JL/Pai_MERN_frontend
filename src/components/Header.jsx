import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import MenuOpcionesPerfil from "./MenuOpcionesPerfil"

export default function Header() {

  const { auth, cerrarSesionAuth } = useAuth()
  const { nombre, rol } = auth

  return (
    <div className='shadow-100 p-8 rounded-full flex justify-between items-center relative'>
      <div className=''>
        <p className='font-black text-3xl'>Pa<span className='text-primary-100'>i</span></p>
      </div>
      <nav className="mx-auto">
        <ul className="flex gap-10 items-center">
          <Link className="text-sm font-bold text-black-100" to={'/inicio'}>Inicio</Link>
          <div className="group">
            <Link className="text-sm font-bold text-black-100" to={'/consultar'}>Consultar</Link>
            <div className=" hidden bg-white absolute p-5 shadow-100 rounded-xl group-hover:block">
              <ul className="flex flex-col gap-5">
                <Link to={'/consultar/tituladas'} className="flex items-center gap-5 p-3 rounded-lg hover:bg-white-200 hover:cursor-pointer transition-colors">
                  <img src="/src/assets/cap.png" alt="icono tituladas" height={40} width={40}/>
                  <div>
                    <p className="font-bold text-black-100 text-sm">Consultar Tituladas</p>
                    <p className="text-black-300 text-sm">Consulta información de las distintas tituladas</p>
                  </div>
                </Link>
                <Link to={'/consultar/instructores'} className="flex items-center gap-5 p-3 rounded-lg hover:bg-white-200 hover:cursor-pointer transition-colors">
                  <img src="/src/assets/instructor.png" alt="icono instructores" height={40} width={40}/>
                  <div>
                    <p className="font-bold text-black-100 text-sm">Consultar Intructores</p>
                    <p className="text-black-300 text-sm">Consulta información de los distintos instructores</p>
                  </div>
                </Link>
                <Link className="flex items-center gap-5 p-3 rounded-lg hover:bg-white-200 hover:cursor-pointer transition-colors">
                  <img src="/src/assets/ambiente.png" alt="icono ambientes" height={40} width={40}/>
                  <div>
                    <p className="font-bold text-black-100 text-sm">Consultar Ambientes</p>
                    <p className="text-black-300 text-sm">Consulta información de los distintos ambientes</p>
                  </div>
                </Link>
              </ul>
            </div>
          </div>
          <Link className="text-sm font-bold" to={'/eventos'}>Eventos</Link>
        </ul>
      </nav>
      <div className="flex gap-3 items-center absolute right-8">
        <img src="/src/assets/bell.png" alt="icono notificaciones"/>
        <div className="flex flex-col text-sm gap-1">
          <p className="text-right text-black-100 font-semibold">{nombre}</p>
          <p className="text-right text-black-300">{rol}</p>
        </div>
        <img src="/src/assets/user.jpg" alt="icono notificaciones" height={64} width={64}/>
        <MenuOpcionesPerfil/>
      </div>
    </div>
  )
}
