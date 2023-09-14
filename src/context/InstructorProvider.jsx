import { useState, useEffect, createContext  } from "react";

const InstructorContext = createContext()

const InstructorProvider = ({children}) => {

  const [modalAgregarInstructor, setModalAgregarInstructor] = useState(false)
  
  const handleModalAgregarInstructor = () => {
    setModalAgregarInstructor(!modalAgregarInstructor)
  }

  return (
      <InstructorContext.Provider
          value={{
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