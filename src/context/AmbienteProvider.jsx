import { createContext, useEffect, useState } from "react";
import clienteAxios from "../../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const AmbienteContext = createContext()

const AmbienteProvider = ({children}) => {

    const { auth } = useAuth()
    const [alerta, setAlerta] = useState({})
    const [cargando, setCargando] = useState(false)
    const [ambientes, setAmbientes] = useState([])
    const [ambiente, setAmbiente] = useState({})
    const [modalAmbiente, setModalAmbiente] = useState(false) 
    const [modalDetallesAmbiente, setModalDetallesAmbiente] = useState(false) 
    const [modalEliminarAmbiente, setModalEliminarAmbiente] = useState(false) 

    useEffect(() => {
        const obtenerAmbientes = async () => {
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
    
                const { data } = await clienteAxios('/ambientes', config)
                setAmbientes(data)
            } catch (error) {
                console.log(error.response)
            }
        }
        return ()=>obtenerAmbientes()
    }, [auth])
    
    const handleModalAmbiente = (ambiente) => {
        setAmbiente(ambiente)
        setAlerta({})
        setModalAmbiente(!modalAmbiente)
        console.log('hola')
    }
    
    const handleModalDetallesAmbiente = (ambiente) => {
        setAmbiente(ambiente)
        setAlerta({})
        setModalDetallesAmbiente(!modalDetallesAmbiente)
        console.log('hola')
    }
    
    const handleModalEliminarAmbiente = (ambiente) => {
        setAmbiente(ambiente)
        setModalEliminarAmbiente(!modalEliminarAmbiente)
    }
    
    return (
        <AmbienteContext.Provider
            value={{
                alerta,
                cargando,
                ambientes,
                ambiente,
                modalAmbiente,
                modalDetallesAmbiente,
                modalEliminarAmbiente,
                handleModalAmbiente,
                handleModalDetallesAmbiente,
                handleModalEliminarAmbiente
            }}
        >
            {children}
        </AmbienteContext.Provider>
    )
}

export {
    AmbienteProvider
}

export default AmbienteContext