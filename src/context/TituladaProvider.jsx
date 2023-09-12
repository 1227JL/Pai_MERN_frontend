import { useState, createContext } from "react";

const TituladaContext = createContext()

const TituladaProvider = ({children}) => {

    const [modalAgregarTitulada, setModalAgregarTitulada] = useState(false)

    const handleModalAgregarTitulada = () => {
        setModalAgregarTitulada(!modalAgregarTitulada)
    }

    return (
        <TituladaContext.Provider
            value={{
                modalAgregarTitulada,
                handleModalAgregarTitulada
            }}
        >
            {children}
        </TituladaContext.Provider>
    )
}

export {
    TituladaProvider
}

export default TituladaContext