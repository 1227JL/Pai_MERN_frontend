import { useState, useEffect } from "react"
import useTitulada from "../hooks/useTitulada"
import Busqueda from "../components/BusquedaTituladas"
import Titulada from "../components/Titulada"
import Spinner from "../components/Spinner"
import ModalTitulada from "../components/ModalTitulada"
import Boton from "../components/Boton"
import {quitarTildes} from '../helpers/utils'

export default function Tituladas() {

    const { cargando, tituladas, handleBuscador, handleModalTitulada } = useTitulada()
    const [filtros, setFiltros] = useState([]);
    const [tituladasFiltradas, setTituladasFiltradas] = useState([]);

    const filtrarTituladas = (data, filtros) => {
        if (!Array.isArray(data) || filtros.length === 0) {
          return data;
        }
      
        const lowerCaseFilters = filtros.map((filtro) => filtro.toLowerCase());
      
        return data.filter((titulada) => {
          if (!titulada) {
            return false; // Evitar errores si titulada es null o undefined.
          }

          return lowerCaseFilters.every((filtro) => {
            return (
                quitarTildes(titulada.titulo.toLowerCase()).includes(filtro) ||
                quitarTildes(titulada.estado.toLowerCase()).includes(filtro) ||
              titulada.jornada.toLowerCase().includes(filtro) ||
              quitarTildes(titulada.modalidad.toLowerCase()).includes(filtro)
              // Agrega aquí más atributos según sea necesario
            );
          });
        });
    };      
      
    useEffect(() => {
        const tituladasFiltradas = filtrarTituladas(tituladas, filtros);
        setTituladasFiltradas(tituladasFiltradas);
    }, [filtros]);
    
    const handleCheckboxChange = (event) => { 
        const checkboxId = event.target.id;
        if (event.target.checked) {
          // Agregar el valor del id al estado filtros si el checkbox está marcado
          setFiltros((prevFiltros) => [...prevFiltros, checkboxId]);
        } else {
          // Eliminar el valor del id del estado filtros si el checkbox está desmarcado
          setFiltros((prevFiltros) => prevFiltros.filter((filtro) => filtro !== checkboxId));
        }
    };

    return (
        <>
            <h1 className="m-0 text-center">Gestiona las <span className='text-slate-600'>Tituladas</span></h1>
            <div className='flex flex-col lg:flex-row gap-5 lg:gap-7 mt-7'>
                <div className='flex flex-col lg:w-1/3 shadow-small p-5 rounded-xl h-[40rem]'>
                    <h1>Filtros de busqueda</h1>
                    <hr/>
                    <div className='mt-4 relative'>
                        <h3 className='font-semibold mb-2'>Programa de Formación</h3>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="checkbox" 
                                id="tecnologo"
                                className='checkbox'
                                onChange={handleCheckboxChange}
                            />
                            <label 
                                htmlFor="tecnologo" 
                            >Tecnologos</label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="checkbox" 
                                id="tecnico"
                                className='checkbox'
                                onChange={handleCheckboxChange} 
                            />
                            <label 
                                htmlFor="tecnico" 
                            >Técnicos</label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="checkbox" 
                                id="curso corto"
                                className='checkbox'
                                onChange={handleCheckboxChange} 
                            />
                            <label 
                                htmlFor="curso corto" 
                            >Cursos Cortos</label>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <h3 className='font-semibold mb-2'>Estado de Formación</h3>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="checkbox" 
                                id="convocatoria"
                                className='checkbox'
                                onChange={handleCheckboxChange} 
                            />
                            <label 
                                htmlFor="convocatoria" 
                            >Convocatorias</label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="checkbox" 
                                id="etapa lectiva"
                                className='checkbox'
                                onChange={handleCheckboxChange} 
                            />
                            <label 
                                htmlFor="etapa lectiva" 
                            >En Formación</label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="checkbox" 
                                id="etapa productiva"
                                className='checkbox'
                                onChange={handleCheckboxChange} 
                            />
                            <label 
                                htmlFor="etapa productiva" 
                            >En Etapa Productiva</label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="checkbox" 
                                id="formacion finalizada"
                                className='checkbox'
                                onChange={handleCheckboxChange} 
                            />
                            <label 
                                htmlFor="formacion finalizada" 
                            >Formación Finalizada</label>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <h3 className='font-semibold mb-2'>Jornada de Formación</h3>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="checkbox" 
                                id="mañana"
                                className='checkbox'
                                onChange={handleCheckboxChange} 
                            />
                            <label 
                                htmlFor="mañana" 
                            >Mañana</label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="checkbox" 
                                id="tarde"
                                className='checkbox'
                                onChange={handleCheckboxChange} 
                            />
                            <label 
                                htmlFor="tarde" 
                            >Tarde</label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="checkbox" 
                                id="noche"
                                className='checkbox'
                                onChange={handleCheckboxChange} 
                            />
                            <label 
                                htmlFor="noche" 
                            >Noche</label>
                        </div>
                    </div>
                    <div className='mt-4 mb-2'>
                        <h3 className='font-semibold mb-2'>Modalidad de Formación</h3>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="checkbox" 
                                id="presencial"
                                className='checkbox'
                                onChange={handleCheckboxChange} 
                            />
                            <label 
                                htmlFor="presencial" 
                            >Presencial</label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="checkbox" 
                                id="virtual"
                                className='checkbox'
                                onChange={handleCheckboxChange} 
                            />
                            <label 
                                htmlFor="virtual" 
                            >Virtual</label>
                        </div>
                    </div>
                    <Boton classes={'bg-primary-100 mt-auto p-4'} onClick={handleModalTitulada}>Agregar Nueva Titulada</Boton>
                </div>
                <div className='lg:w-2/3 flex-2'>
                    <div className="mb-2 flex justify-between items-center">
                        <h1 className="m-0">Tituladas</h1>
                        <Boton classes={'bg-more-100'} onClick={handleBuscador}>Buscar Titulada</Boton>
                    </div>
                    <hr />
                    {cargando ? (
                        <div className="mt-10">
                            <Spinner>Obteniendo Tituladas...</Spinner>
                        </div>
                    ) : (
                        (filtros?.length > 0) ? (
                            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-scroll p-2 pr-4 mt-2 max-h-[42rem]'>
                                {tituladasFiltradas.length > 0 ? (
                                    tituladasFiltradas?.map(titulada => (
                                        <Titulada key={titulada?._id} titulada={titulada} />
                                    ))
                                ): (
                                    <h3 className="mt-5 text-center font-bold text-3xl">No hay coincidencias</h3>
                                )}
                            </div>
                        ) : (
                            (tituladas?.length > 0 && filtros.length === 0) ? (
                                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-scroll p-2 pr-4 mt-2 max-h-[42rem]'>
                                    {tituladas?.map(titulada => (
                                        <Titulada key={titulada?._id} titulada={titulada} />
                                    ))}
                                </div>
                            ) : (
                                <h3 className="mt-5 text-center font-bold text-3xl">No hay Tituladas aún</h3>
                            )
                        )
                    )}
                </div>
            </div>
            <ModalTitulada/>
            <Busqueda/>
        </>
    )
}
                            