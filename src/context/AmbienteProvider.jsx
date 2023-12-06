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
            }finally{
                setCargando(false)
            }
        }
        return ()=>obtenerAmbientes()
    }, [auth])
    
    const handleModalAmbiente = (ambiente) => {
        if(ambiente){
            setAmbiente(ambiente)
        }else{
            setAmbiente({})
        }
        setAlerta({})
        setModalAmbiente(!modalAmbiente)
    }
    
    const handleModalDetallesAmbiente = (ambiente) => {
        setAmbiente(ambiente)
        setAlerta({})
        setModalDetallesAmbiente(!modalDetallesAmbiente)
    }
    
    const handleModalEliminarAmbiente = (ambiente) => {
        setAmbiente(ambiente)
        setModalEliminarAmbiente(!modalEliminarAmbiente)
    }

    const submitAmbiente = async (ambiente) => {
        if(ambiente?.id){
            await actualizarAmbiente(ambiente)
            return
        }
        await agregarAmbiente(ambiente)
    }

    const agregarAmbiente = async (ambiente) => {
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

            const { data } = await clienteAxios.post('/ambientes', ambiente, config)
            const ambientesActualizados = [...ambientes, data]
            setAmbientes(ambientesActualizados)
            
            setAlerta({
                msg: 'Ambiente Creado Exitosamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                setAmbiente({})
                setModalAmbiente(false)
            }, 2000);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const actualizarAmbiente = async (ambiente) => {
        try {
            const token = localStorage.getItem('token')

            if(!token){
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/ambientes/${ambiente.id}`, ambiente, config)
            const ambientesActualizados = ambientes.map(ambienteState => ambienteState._id === data._id ? data : ambienteState)
            setAmbientes(ambientesActualizados)

            setAlerta({
                msg: 'Ambiente actualizado correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                setModalAmbiente(false)
                setAmbiente({})
            }, 2000);

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const eliminarAmbiente = async (id) =>{
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
    
            await clienteAxios.delete(`/ambientes/${id}`, config)
    
            const ambientesActualizados = ambientes.filter(ambienteState => ambienteState._id !== id)
            setAmbientes(ambientesActualizados)

            setModalEliminarAmbiente(false)
        } catch (error) {
            console.log(error.response)
        }
    }
    
    return (
        <AmbienteContext.Provider
            value={{
                alerta,
                setAlerta,
                cargando,
                ambientes,
                ambiente,
                modalAmbiente,
                setModalAmbiente,
                modalDetallesAmbiente,
                modalEliminarAmbiente,
                handleModalAmbiente,
                handleModalDetallesAmbiente,
                handleModalEliminarAmbiente,
                submitAmbiente,
                eliminarAmbiente
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