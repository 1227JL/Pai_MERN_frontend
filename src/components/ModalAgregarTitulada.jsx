import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import useTitulada from '../hooks/useTitulada'
import Alerta from './Alerta'

const PROGRAMAS = ['Tecnologo', 'Técnico', 'Curso Corto']
const JORNADAS = ['Mañana', 'Tarde', 'Noche']
const MODALIDADES = ['Presencial', 'Virtual']

export default function ModalAgregarTitulada() {

    const { alerta, setAlerta, submitTitulada } = useTitulada()
    const { modalAgregarTitulada, handleModalAgregarTitulada } = useTitulada()

    const [id, setId] = useState('')
    const [programa, setPrograma] = useState('')
    const [ficha, setFicha] = useState('')
    const [tipo, setTipo] = useState('')
    const [jornada, setJornada] = useState('')
    const [estado, setEstado] = useState('')
    const [modalidad, setModalidad] = useState('')
    const [instructor, setIntructor] = useState([])
    const [ambiente, setAmbiente] = useState([])
    const [duracion, setDuracion] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if([programa, ficha, tipo, jornada, modalidad, duracion].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        setAlerta({})

        await submitTitulada({programa, ficha, tipo, jornada, modalidad, duracion})
    }

    const { msg } = alerta

    return (
        <>
            <Transition.Root show={ modalAgregarTitulada } as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={ handleModalAgregarTitulada }>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={ handleModalAgregarTitulada }
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900 mb-5">
                                        {id ? 'Editar Titulada': 'Crear Titulada'}
                                    </Dialog.Title>

                                    {msg && <Alerta alerta={alerta} />}

                                    <form 
                                        onSubmit={handleSubmit}
                                        className='my-5'
                                    >
                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm' 
                                                htmlFor='programa'
                                            >
                                                Programa Formación
                                            </label>
                                            <input
                                                type="text"
                                                id="programa"
                                                placeholder='Programa de Formación'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={programa}
                                                onChange={e => setPrograma(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm' 
                                                htmlFor='ficha'
                                            >
                                                Número Ficha
                                            </label>
                                            <input
                                                type='number'
                                                id="ficha"
                                                placeholder='Número de Ficha'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={ficha}
                                                onChange={e => setFicha(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm' 
                                                htmlFor='tipo'
                                            >
                                               Tipo Programa
                                            </label>
                                            <select
                                                id="tipo"
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={tipo}
                                                onChange={e => setTipo(e.target.value)}
                                            >
                                                <option value="">- Selecciona el tipo de Programa -</option>
                                                {PROGRAMAS?.map(programa => (
                                                    <option key={programa} value={programa}>{programa}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm' 
                                                htmlFor='jornada'
                                            >
                                               Jornada
                                            </label>
                                            <select
                                                id="jornada"
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={jornada}
                                                onChange={e => setJornada(e.target.value)}
                                            >
                                                <option value="">- Selecciona la Jornada -</option>
                                                {JORNADAS?.map(jornada => (
                                                    <option key={jornada} value={jornada}>{jornada}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm' 
                                                htmlFor='modalidad'
                                            >
                                               Modalidad
                                            </label>
                                            <select
                                                id="modalidad"
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={modalidad}
                                                onChange={e => setModalidad(e.target.value)}
                                            >
                                                <option value="">- Selecciona la Modalidad -</option>
                                                {MODALIDADES?.map(modalidad => (
                                                    <option key={modalidad} value={modalidad}>{modalidad}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm' 
                                                htmlFor='ficha'
                                            >
                                                Duración Formación
                                            </label>
                                            <input
                                                type='number'
                                                id="ficha"
                                                placeholder='Duración en Horas'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={duracion}
                                                onChange={e => setDuracion(e.target.value)}
                                            />
                                        </div>
                                        <input
                                            type="submit"
                                            className='button-primary-block'
                                            value={ id ? 'Guardar Cambios': 'Crear Titulada'}
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
        </>
    )
}
