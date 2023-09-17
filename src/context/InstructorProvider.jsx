import { useState, useEffect, createContext  } from "react";
import clienteAxios from "../../config/clienteAxios";
import useAuth from "../hooks/useAuth";


const InstructorContext = createContext()

const InstructorProvider = ({children}) => {

  const { auth } = useAuth()

  const [alerta, setAlerta] = useState({})
  const [cargando, setCargando] = useState(false)
  const [instructores, setInstructores] = useState([])
  const [instructor, setInstructor] = useState({})
  const [modalInstructor, setModalInstructor] = useState(false)

  useEffect(() => {
    const obtenerInstructores = async () => {
      setCargando(true)
      try {
        const token = localStorage.getItem('token')
  
        if(!token){
          return
        }
  
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }

        const { data } = await clienteAxios('/instructores', config)
        setInstructores(data);

      } catch (error) {
        console.log(error.response);
      }finally{
        setCargando(false)
      }
    }

    return ()=>obtenerInstructores()
  }, [auth])
  
  
  const handleModalInstructor = (instructor) => {
    setModalInstructor(!modalInstructor)
    setAlerta({})
    setInstructor(instructor)
  }

  const submitInstructor = async (instructor) => {
    if(instructor.id){
      console.log('instructor ya registrado');
      return
    }
    await agregarInstructor(instructor)
  }

  const agregarInstructor = async (instructor) => {
    try {
      const token = localStorage.getItem('token')

      if(!token){
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.post('/instructores', instructor, config)
      
      const instructoresActualizados = [...instructores, data]
      setInstructores(instructoresActualizados)

      setAlerta({
        msg: data.msg,
        error: false
      })

      setTimeout(() => {
        setAlerta({})
        setModalInstructor(false)
      }, 2000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  return (
    <InstructorContext.Provider
      value={{
        alerta,
        setAlerta,
        modalInstructor,
        instructores,
        instructor,
        handleModalInstructor,
        submitInstructor,
      }}
    >
      {children}
    </InstructorContext.Provider>
  )
}

export {
  InstructorProvider
}

export default InstructorContext