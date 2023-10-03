import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../../config/clienteAxios"

export default function OlvidePassword() {

  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(email === ''){
      setAlerta({
        msg: 'El Email es obligatorio',
        error: true
      })
      return
    }

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, {email})
      setAlerta({
        msg: data.msg,
        error: false
      })
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
      <h1 className='text-primary-100 font-black text-6xl capitalize text-center'>Recupera tu <span className='text-slate-600'>acceso</span></h1>

      <form onSubmit={handleSubmit} className='my-10 bg-white shadow-200 p-10 py-5 rounded-md'>
        {msg && <Alerta alerta={alerta}/>}
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

        <input 
          type="submit"
          value={'Enviar Instrucciones'}
          className='bg-primary-100 w-full mb-5 text-center font-bold text-white p-3 rounded hover:cursor-pointer hover:bg-primary-200 transition-colors'
        />
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={'/'}>¿Ya tienes una cuenta? Inicia Sesión</Link>
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={'/registrar'}>¿No tienes una cuenta? Regístrate</Link>
      </nav>
    </>
  )
}
