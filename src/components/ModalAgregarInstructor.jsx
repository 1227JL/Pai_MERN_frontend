import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import useIntructor from '../hooks/useIntructor'
import Alerta from './Alerta'

const CONTRATOS = ['Término Indefinido', 'Termino Fijo']

export default function ModalAgregarInstructor() {

    const { alerta, setAlerta, modalAgregarInstructor, handleModalAgregarInstructor } = useIntructor()

    const [nombre, setNombre] = useState('')
    const [identificacion, setIdentificacion] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [contrato, setContrato] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if([nombre, identificacion, email, telefono, contrato].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        setAlerta({})

        await submitInstructor({nombre, identificacion, email, telefono, contrato})
        
        setNombre('')
        setIdentificacion('')
        setEmail('')
        setTelefono('')
        setContrato('')
    }

    const { msg } = alerta

    return (
        <>
            <Transition.Root className={'z-20'} show={ modalAgregarInstructor } as={Fragment}>
            <Dialog as="div" className="fixed inset-0 overflow-y-auto" onClose={ handleModalAgregarInstructor }>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block">
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
                        <div className="inline-block align-middle bg-white rounded-lg px-4 pt-5 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-2xl w-full sm:p-6">
                            <div className="block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={ handleModalAgregarInstructor }
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
                                        Agregar Instructor
                                    </Dialog.Title>

                                    <form 
                                        className='my-5'
                                        onSubmit={handleSubmit}
                                    >
                                        {msg && <Alerta alerta={alerta}/>}
                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm' 
                                                htmlFor='nombre'
                                            >
                                                Nombre
                                            </label>
                                            <input
                                                type="text"
                                                id="nombre"
                                                placeholder='Nombre Completo'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={nombre}
                                                onChange={e => setNombre(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm' 
                                                htmlFor='identificacion'
                                            >
                                                Documento Identidad
                                            </label>
                                            <input
                                                type="number"
                                                id="identificacion"
                                                placeholder='Cédula de Ciudadania'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={identificacion}
                                                onChange={e => setIdentificacion(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm' 
                                                htmlFor='email'
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                placeholder='Dirección de correo electrónico'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm' 
                                                htmlFor='telefono'
                                            >
                                                Teléfono
                                            </label>
                                            <input
                                                type="number"
                                                id="telefono"
                                                placeholder='Teléfono de contacto'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={telefono}
                                                onChange={e => setTelefono(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm' 
                                                htmlFor='contrato'
                                            >
                                                Tipo de Contrato
                                            </label>
                                            <select
                                                id="contrato"
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={contrato}
                                                onChange={e => setContrato(e.target.value)}
                                            >
                                                <option value="">- Seleccione el tipo de contrato -</option>
                                                {CONTRATOS?.map(contrato => (
                                                    <option key={contrato} value={contrato}>{contrato}</option>
                                                ))}
                                            </select>
                                        </div>
                                
                                        <input
                                            type="submit"
                                            className='button-primary-block rounded md:col-span-2 lg:col-span-3'
                                            value={'Agregar Instructor'}
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
