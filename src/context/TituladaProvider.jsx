import { useState, createContext, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../../config/clienteAxios";

const TituladaContext = createContext()

const TituladaProvider = ({children}) => {

    const { auth } = useAuth()

    const [tituladas, setTituladas] = useState([])
    const [titulada, setTitulada] = useState({})
    const [alerta, setAlerta] = useState({})
    const [cargando, setCargando] = useState(false)
    const [buscador, setBuscador] = useState(false)
    const [modalTitulada, setModalTitulada] = useState(false)
    const [modalDetallesTitulada, setModalDetallesTitulada] = useState(false)
    const [modalAprendiz, setModalAprendiz] = useState(false)


    useEffect(() => {
        const obtenerTituladas = async () => {
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

                const { data } = await clienteAxios('/tituladas', config)
                setTituladas(data);
            } catch (error) {
                console.log(error);
            }finally {
                setCargando(false)
            }
        }
        return ()=>obtenerTituladas()
    }, [auth])

    const handleBuscador = () => {
        setBuscador(!buscador)
    }
    
    const submitTitulada = async (titulada) => {
        if(titulada?.id){
            await actualizarTitulada(titulada)
            return
        }
        await crearTitulada(titulada)
    }

    const crearTitulada = async (titulada) => {
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

            const { data } = await clienteAxios.post('/tituladas', titulada, config)
            const tituladaActualizada = [...tituladas, data]

            setTituladas(tituladaActualizada)
            setAlerta({
                msg: 'Titulada Creada Exitosamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
                setModalTitulada(false)
            }, 2000);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }finally {
            setCargando(false)
        }
    }

    const obtenerTitulada = async (ficha) => {
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

            const { data } = await clienteAxios(`/tituladas/${ficha}`, config)
            setTitulada(data)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }finally {
            setCargando(false)
        }
    }

    const actualizarTitulada = async (titulada) => {
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

            const { data } = await clienteAxios.put(`/tituladas/${titulada?.id}`, titulada, config)
            setTitulada(data)
            
            const tituladasActualizadas = tituladas.map(tituladaState => tituladaState._id === data._id ? data : tituladaState)
            setTituladas(tituladasActualizadas)

            setAlerta({
                msg: 'Titulada Actualizada Exitosamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
                setModalTitulada(false)
            }, 2000);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const handleModalTitulada = () => {
        setModalTitulada(!modalTitulada)
        setAlerta({})
    }

    const handleModaDetalleslTitulada = () => {
        setModalDetallesTitulada(!modalDetallesTitulada)
        setAlerta({})
    }
  
    const handleModalAprendiz = () => {
        setModalAprendiz(!modalAprendiz)
        setAlerta({})
    }

    return (
        <TituladaContext.Provider
            value={{
                cargando,
                tituladas,
                setTituladas,
                titulada,
                alerta,
                setAlerta,
                buscador,
                handleBuscador,
                submitTitulada,
                obtenerTitulada,
                modalTitulada,
                handleModalTitulada,
                modalDetallesTitulada,
                handleModaDetalleslTitulada,
                modalAprendiz,
                handleModalAprendiz
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