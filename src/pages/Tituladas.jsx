import { useState } from "react"
import { Link } from "react-router-dom"
import ModalAgregarTitulada from "../components/ModalAgregarTitulada"
import useTitulada from "../hooks/useTitulada"
import Busqueda from "../components/Busqueda"

export default function Tituladas() {

    const { tituladas, handleBuscador, handleModalAgregarTitulada } = useTitulada()
    return (
        <>
            <div className='flex gap-7'>
                <div className='flex flex-col lg:w-1/3 shadow-200 p-5 rounded-xl h-[45rem] max-h-[45rem]'>
                    <h1>Filtros de busqueda</h1>
                    <hr/>
                    <div className='mt-4 relative'>
                        <h3 className='font-semibold mb-2'>Programa de Formación</h3>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="checkbox" 
                                id="tecnologos"
                                className='checkbox' 
                            />
                            <label 
                                htmlFor="tecnologos" 
                            >Tecnologos</label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="checkbox" 
                                id="tecnicos"
                                className='checkbox' 
                            />
                            <label 
                                htmlFor="tecnicos" 
                            >Técnicos</label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="checkbox" 
                                id="cursos"
                                className='checkbox' 
                            />
                            <label 
                                htmlFor="cursos" 
                            >Cursos Cortos</label>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <h3 className='font-semibold mb-2'>Estado de Formación</h3>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="checkbox" 
                                id="convocatorias"
                                className='checkbox' 
                            />
                            <label 
                                htmlFor="convocatorias" 
                            >Convocatorias</label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="checkbox" 
                                id="formacion"
                                className='checkbox' 
                            />
                            <label 
                                htmlFor="formacion" 
                            >En Formación</label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="checkbox" 
                                id="productiva"
                                className='checkbox' 
                            />
                            <label 
                                htmlFor="productiva" 
                            >En Etapa Productiva</label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="checkbox" 
                                id="finalizada"
                                className='checkbox' 
                            />
                            <label 
                                htmlFor="finalizada" 
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
                            />
                            <label 
                                htmlFor="noche" 
                            >Noche</label>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <h3 className='font-semibold mb-2'>Modalidad de Formación</h3>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="checkbox" 
                                id="presencial"
                                className='checkbox' 
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
                            />
                            <label 
                                htmlFor="virtual" 
                            >Virtual</label>
                        </div>
                    </div>
                    <button
                        type='button' 
                        className='button-primary-block mt-auto'
                        onClick={handleModalAgregarTitulada}
                    >Agregar Nueva Titulada</button>
                </div>
                <div className='lg:w-2/3 flex-2'>
                    <div className="flex justify-between items-center">
                        <h1>Tituladas</h1>
                        <button
                            type="button"
                            className="button-more"
                            onClick={handleBuscador}
                        >Buscar titulada</button>
                    </div>
                    <hr />

                        {tituladas?.length > 0 ? (
                            <div className='flex flex-col gap-4 overflow-y-scroll p-2 pr-4 mt-2 max-h-[42rem]'>
                                {tituladas?.map(titulada => (
                                    <div key={titulada._id} className='flex flex-col shadow-200 p-5 rounded-xl'>
                                        <div className='flex justify-between'>
                                            <p className='font-semibold'>{titulada?.programa}</p>
                                            <p className='text-black-300 font-semibold'>{titulada?.ficha}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className='text-black-300 font-semibold'>{titulada?.tipo}</p>
                                            <p className='text-black-100 font-semibold'>Jornada: <span className='font-normal'>{titulada?.jornada}</span></p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className='text-black-100 font-semibold'>Ambiente: <span className='font-normal'>{titulada?.ambiente}</span></p>
                                            <p className='text-primary-100 font-semibold'>{titulada?.estado}</p>
                                        </div>
                                        <Link className='text-more-100 text-center text-sm font-semibold hover:text-more-200 transition-colors' to={`${titulada?.ficha}`}>Más información</Link>
                                    </div>
                                ))}
                            </div> 
                        ) : (
                            <h3 className="mt-5 text-center font-bold text-3xl">No hay Tituladas aun</h3>
                        )}
                </div>
            </div>
            <ModalAgregarTitulada/>
            <Busqueda/>
        </>
    )
}
                            