import { useState, createContext, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const TituladaContext = createContext()

const TituladaProvider = ({children}) => {

    const { auth } = useAuth()

    const navigate = useNavigate()

    const [tituladas, setTituladas] = useState([])
    const [titulada, setTitulada] = useState({})
    const [aprendiz, setAprendiz] = useState({})
    const [busqueda, setBusqueda] = useState('')
    const [alerta, setAlerta] = useState({})
    const [cargando, setCargando] = useState(false)
    const [buscador, setBuscador] = useState(false)
    const [competencia, setCompetencia] = useState('')
    const [modalTitulada, setModalTitulada] = useState(false)
    const [modalDetallesTitulada, setModalDetallesTitulada] = useState(false)
    const [modalEliminarTitulada, setModalEliminarTitulada] = useState(false)
    const [modalDetallesCompetencia, setModalDetallesCompetencia] = useState(false)

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
                    'Content-Type': 'multipart/form-data',
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
            navigate('/consultar/tituladas')
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
                    "Content-Type": "multipart/form-data",
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

    const eliminarTitulada = async (id) => {
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

            const { data } = await clienteAxios.delete(`/tituladas/${id}`, config)

            const tituladasActualizadas = tituladas.filter(tituladaState => tituladaState._id !== id)
            setTituladas(tituladasActualizadas)
            
            navigate('/consultar/tituladas')

            setAlerta({
                msg: data.msg,
                error : true
            })

            setTimeout(() => {
                setAlerta({})
            }, 2000);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }finally{
            setModalEliminarTitulada(false)
        }
    }

    const obtenerDataCompetencia = async (competencia) => {
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

            const { data } = await clienteAxios(`/tituladas/${titulada._id}/${competencia._id}`, config)
            setCompetencia({...competencia, resultados_aprendizaje: data})
            
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

    const handleModalDetallesTitulada = () => {
        setModalDetallesTitulada(!modalDetallesTitulada)
    }

    const handleModalEliminarTitulada = () => {
        setModalEliminarTitulada(!modalEliminarTitulada)
    }

    const handleModalDetallesCompetencia= (competencia) => {
        setModalDetallesCompetencia(!modalDetallesCompetencia)

        if(competencia !== undefined){
            obtenerDataCompetencia(competencia)
        }
    }

    return (
        <TituladaContext.Provider
            value={{
                cargando,
                busqueda,
                tituladas,
                titulada,
                aprendiz,
                alerta,
                buscador,
                competencia,
                modalTitulada,
                modalDetallesTitulada,
                modalEliminarTitulada,
                modalDetallesCompetencia,
                setTitulada,
                setBusqueda,
                setTituladas,
                setAlerta,
                handleBuscador,
                submitTitulada,
                obtenerTitulada,
                eliminarTitulada,
                handleModalTitulada,
                handleModalDetallesTitulada,
                handleModalEliminarTitulada,
                handleModalDetallesCompetencia
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