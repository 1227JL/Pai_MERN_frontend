import { useState, useEffect, createContext  } from "react";

const InstructorContext = createContext()

const InstructorProvider = ({children}) => {

  const [alerta, setAlerta] = useState({})
  const [modalAgregarInstructor, setModalAgregarInstructor] = useState(false)
  
  const handleModalAgregarInstructor = () => {
    setModalAgregarInstructor(!modalAgregarInstructor)
    setAlerta({})
  }

  return (
    <InstructorContext.Provider
      value={{
        alerta,
        setAlerta,
        modalAgregarInstructor,
        handleModalAgregarInstructor
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