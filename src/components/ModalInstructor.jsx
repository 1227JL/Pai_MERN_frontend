import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import useIntructor from '../hooks/useIntructor'
import Alerta from './Alerta'
import {
    Select,
    SelectItem,
    Input
} from '@nextui-org/react'
import {MailIcon} from '../components/MailIcon';
import { AREAS, CONTRATOS } from './data'

export default function ModalInstructor() {

    const { alerta, setAlerta, instructor, modalInstructor, handleModalInstructor, submitInstructor } = useIntructor()

    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [identificacion, setIdentificacion] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [contrato, setContrato] = useState('')
    const [area, setArea] = useState('')

    useEffect(() => {
        if(instructor && Object.keys(instructor).length > 0){
            setId(instructor._id)
            setNombre(instructor.email)
            setIdentificacion(instructor.identificacion)
            setEmail(instructor.email)
            setTelefono(instructor.telefono)
            setContrato(instructor.contrato)
            setArea(instructor.area)
        }
    }, [instructor])
    

    const propsEmail = {
        startContent: 
            <MailIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
        ,
        endContent:
            <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">@sena.edu.co</span>
            </div>
    }

    const propsContrato = {
        label: "Tipo Contrato",
        placeholder: "Selecciona el tipo de Contrato",
    }

    const propsAreas = {
        label: "Area Desempeño",
        placeholder: "Selecciona el area de desempeño",
    }

    if (id) {
        propsContrato.defaultSelectedKeys = [contrato];
        propsAreas.defaultSelectedKeys = [area];
    }

    const inputsInstructor = [
        {state: nombre, stateSet: setNombre, type: 'text', label: 'Nombre', placeholder: 'Nombre Completo'},
        {state: identificacion, stateSet: setIdentificacion, type: 'number', label: 'Identificación', placeholder: 'Cédula de Ciudadania'},
        {state: email, stateSet: setEmail, type: 'text', label: 'Email', placeholder: 'Instructor'},
        {state: telefono, stateSet: setTelefono, type: 'number', label: 'Teléfono', placeholder: 'Teléfono de contacto'},
    ]

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

        await submitInstructor({id, nombre, identificacion, email, telefono, contrato, area})
        
        setNombre('')
        setIdentificacion('')
        setEmail('')
        setTelefono('')
        setContrato('')
        setArea('')
    }

    const { msg } = alerta

    return (
        <>
            <Transition.Root className={'z-20'} show={ modalInstructor } as={Fragment}>
            <Dialog as="div" className="fixed inset-0 overflow-y-auto" onClose={ handleModalInstructor }>
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
                                    onClick={ handleModalInstructor }
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
                                        {id ? 'Editar Instructor' : 'Agregar Instructor'}
                                    </Dialog.Title>

                                    {msg && <Alerta alerta={alerta}/>}
                                    <form 
                                        className='my-5'
                                        onSubmit={handleSubmit}
                                    >
                                        {inputsInstructor.map(input => {
                                            return (
                                                <div key={input.label} className='mb-5'>
                                                    <Input
                                                        {...(input.label === 'Email' ? propsEmail : {})}
                                                        type={input.type}
                                                        label={input.label}
                                                        labelPlacement={'inside'}
                                                        placeholder={input.placeholder}
                                                        value={input.state}
                                                        onChange={e=>input.stateSet(e.target.value)}
                                                    />
                                                </div>
                                            )
                                        })}
                                        <Select {...propsContrato}
                                            onChange={e=> setContrato(e.target.value)}
                                            className='mb-5'
                                            >
                                            {CONTRATOS.map((contrato) => (
                                                <SelectItem key={contrato} value={contrato}>
                                                    {contrato}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                
                                        <Select {...propsAreas}
                                            onChange={e=> setArea(e.target.value)}
                                        >
                                            {AREAS.map((contrato) => (
                                                <SelectItem key={contrato} value={contrato}>
                                                    {contrato}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                
                                        <input
                                            type="submit"
                                            className='button-primary-block rounded p-3'
                                            value={id ? 'Editar Instructor' : 'Agregar Instructor'}
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
