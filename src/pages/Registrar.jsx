import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../../config/clienteAxios"

export default function Registrar() {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPasword] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()


    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }
    
    if(password !== repetirPassword){
      setAlerta({
        msg: 'Los password no son iguales',
        error: true
      })
      return
    }

    
    if(password.length < 6){
      setAlerta({
        msg: 'El password es muy corto, agrega minimo 6 caracteres',
        error: true
      })
      return
    }

    setAlerta({})

    try {
      const { data } = await clienteAxios.post('/usuarios', {nombre, email, password, rol: 'Administrador'})

      setAlerta({
        msg: data.msg,
        error: false
      })

      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPasword('')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta

  return (
    <>
      <h1 className='text-primary-100 font-black text-6xl capitalize'>Crea tu cuenta y administra <span className='text-slate-600'>Tituladas</span></h1>

      <form onSubmit={handleSubmit} className='my-10 bg-white shadow-200 p-10 py-5 rounded-md'>
        {msg && <Alerta alerta={alerta}/>}
        <div className='my-5'>
          <label 
            htmlFor="email"
            className='uppercase text-gray-600 block text-sm font-bold'
          >Nombre</label>
          <input
            type="text" 
            id="nombre" 
            placeholder='Tu nombre'
            className='w-full border mt-3 p-3 rounded-xl bg-gray-50 focus:border-primary-100 outline-none'
            value={nombre}
            onChange={e=>setNombre(e.target.value)}
          />
        </div>
        <div className='my-5'>
          <label 
            htmlFor="email"
            className='uppercase text-gray-600 block text-sm font-bold'
          >Email</label>
          <input
            type="text" 
            id="email" 
            placeholder='Email de Registro'
            className='w-full border mt-3 p-3 rounded-xl bg-gray-50 focus:border-primary-100 outline-none'
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />
        </div>
        <div className='my-5'>
          <label 
            htmlFor="password"
            className='uppercase text-gray-600 block text-sm font-bold'
          >Password</label>
          <input
            type="password" 
            id="password" 
            placeholder='Password de Registro'
            className='w-full border mt-3 p-3 rounded-xl bg-gray-50 focus:border-primary-100 outline-none'
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
        </div>
        <div className='my-5'>
          <label 
            htmlFor="repetir-password"
            className='uppercase text-gray-600 block text-sm font-bold'
          >Repetir password</label>
          <input
            type="password" 
            id="repetir-password" 
            placeholder='Repetir tu Password'
            className='w-full border mt-3 p-3 rounded-xl bg-gray-50 focus:border-primary-100 outline-none'
            value={repetirPassword}
            onChange={e=>setRepetirPasword(e.target.value)}
          />
        </div>

        <input 
          type="submit"
          value={'Crear Cuenta'}
          className='bg-primary-100 w-full mb-5 text-center font-bold text-white p-3 rounded hover:cursor-pointer hover:bg-primary-200 transition-colors'
        />
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={'/'}>¿Ya tienes una cuenta? Inicia Sesión</Link>
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={'/olvide-password'}>Olvide mi password</Link>
      </nav>
    </>
  )
}
