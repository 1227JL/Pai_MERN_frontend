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
  const [modalEliminarInstructor, setModalEliminarInstructor] = useState(false)

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
    setInstructor(instructor)
    setAlerta({})
    setModalInstructor(!modalInstructor)
  }

  const handleModalEliminarInstructor = (instructor) => {
    setInstructor(instructor)
    setModalEliminarInstructor(!modalEliminarInstructor)
  }

  const submitInstructor = async (instructor) => {
    if(instructor.id){
      await actualizarInstructor(instructor)
      return
    }
    await agregarInstructor(instructor)
  }

  const agregarInstructor = async (instructor) => {
    console.log(instructor)
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

  const actualizarInstructor = async (instructor) => {
    console.log(instructor)
  }

  const eliminarInstructor = async () => {
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

      const { data } = await clienteAxios.delete(`/instructores/${instructor._id}`, config)

      const instructoresActualizados = instructores.filter(instructorState => instructorState._id !== instructor._id)
      setInstructores(instructoresActualizados)

      setModalEliminarInstructor(!modalEliminarInstructor)

      setAlerta({
        msg: data.msg,
        error: true
      })

      setTimeout(() => {
        setAlerta({})
      }, 2000);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <InstructorContext.Provider
      value={{
        cargando,
        alerta,
        setAlerta,
        modalInstructor,
        instructores,
        instructor,
        handleModalInstructor,
        submitInstructor,
        modalEliminarInstructor,
        handleModalEliminarInstructor,
        eliminarInstructor
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