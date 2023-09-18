import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import useTitulada from '../hooks/useTitulada'
import Alerta from './Alerta'
import { useParams } from 'react-router-dom'
import {
    Select,
    SelectItem,
    Input,
    Avatar,
} from '@nextui-org/react'
import {PROGRAMAS, JORNADAS, MODALIDADES, ESTADOSTITULADAS} from "../components/data";
import useIntructor from '../hooks/useIntructor'
import Boton from './Boton'

export default function ModalTitulada() {

    const params = useParams()
    const { alerta, setAlerta, submitTitulada, titulada, modalTitulada, handleModalTitulada } = useTitulada()
    const { instructores } = useIntructor()

    const [id, setId] = useState(null)
    const [programa, setPrograma] = useState('')
    const [ficha, setFicha] = useState('')
    const [tipo, setTipo] = useState('')
    const [jornada, setJornada] = useState('')
    const [estado, setEstado] = useState('Convocatoria')
    const [modalidad, setModalidad] = useState('')
    const [instructor, setInstructor] = useState({})
    const [ambiente, setAmbiente] = useState({})
    const [duracion, setDuracion] = useState('')
    const [archivoAdjunto, setArchivoAdjunto] = useState('')

    const inputsTitulada = [
        {state: programa, stateSet: setPrograma, type: 'text', label: 'Programa Formación', placeholder: 'Programa de Formación'},
        {state: ficha, stateSet: setFicha, type: 'number', label: 'Número Ficha', placeholder: 'Número de Ficha'},
        {state: duracion, stateSet: setDuracion, type: 'number', label: 'Duración Formación', placeholder: 'Duración en Horas'},
    ]

    const selectsTitulada = [
        {label: 'Tipo rograma', stateSet: setTipo, defaultOption: tipo, options: PROGRAMAS, placeholder: 'Seleccione un tipo de programa'},
        {label: 'Jornada', stateSet: setJornada, defaultOption: jornada, options: JORNADAS, placeholder: 'Seleccione una jornada'},
        {label: 'Modalidad', stateSet: setModalidad, defaultOption: modalidad, options: MODALIDADES, placeholder: 'Seleccione una modalidad'},
    ]
    
    useEffect(() => {
        if (params.ficha && titulada && Object.keys(titulada).length > 0) {
            setId(titulada._id);
            setPrograma(titulada.programa);
            setFicha(titulada.ficha);
            setDuracion(titulada.duracion);
            setTipo(titulada.tipo);
            setJornada(titulada.jornada);
            setModalidad(titulada.modalidad);
            setEstado(titulada.estado)
            setInstructor(titulada.instructores[0]);
        }
    }, [params, titulada]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if([programa, ficha, tipo, jornada, modalidad, instructor, duracion].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        setAlerta({})

        await submitTitulada({id, programa, ficha, tipo, jornada, modalidad, instructor, duracion, estado})
    }

    const { msg } = alerta

    return (
        <>
            <Transition.Root show={ modalTitulada } as={Fragment}>
                <Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto" onClose={ handleModalTitulada }>
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
                            <div className="inline-block align-middle bg-white rounded-lg px-4 pt-5 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-5xl w-full sm:p-6">
                                <div className="block absolute top-0 right-0 pt-4 pr-4">
                                    <button
                                        type="button"
                                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={ handleModalTitulada }
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
                                            className='my-5 gap-x-3'
                                        >
                                            {inputsTitulada.map(input => (
                                                <div key={input.label} className='mb-5'>
                                                    <Input
                                                        type={input.type}
                                                        label={input.label}
                                                        labelPlacement={'inside'}
                                                        placeholder={input.placeholder}
                                                        value={input.state}
                                                        onChange={e=>input.stateSet(e.target.value)}
                                                    />
                                                </div>
                                            ))}

                                            {selectsTitulada.map(select => {
                                                const selectProps = {
                                                    key: select.label,
                                                    className: 'mb-5',
                                                    label: select.label,
                                                    onChange: e => select.stateSet(e.target.value),
                                                    placeholder: select.placeholder,
                                                };

                                                if (id) {
                                                    selectProps.defaultSelectedKeys = [select?.defaultOption];
                                                }

                                                return (
                                                    <Select {...selectProps}>
                                                        {select.options.map(option => (
                                                            <SelectItem key={option.name} value={option.name}>
                                                                {option.name}
                                                            </SelectItem>
                                                        ))}
                                                    </Select>
                                                );
                                            })}
                                            

                                            <Select
                                                items={instructores}
                                                label="Asignar a"
                                                labelPlacement='inside'
                                                placeholder='Selecciona un Instructor'
                                                onChange={e=>setInstructor(e.target.value)}
                                                classNames={{
                                                    trigger: "bg-default-100 h-auto gap-1 mb-5",
                                                    listboxWrapper: "max-h-[400px]",
                                                }}
                                                listboxProps={{
                                                    itemClasses: {
                                                        base: [
                                                            "rounded-md",
                                                            "text-default-500",
                                                            "transition-opacity",
                                                            "data-[hover=true]:text-foreground",
                                                            "data-[hover=true]:bg-default-100",
                                                            "dark:data-[hover=true]:bg-default-50",
                                                            "data-[selectable=true]:focus:bg-default-50",
                                                            "data-[pressed=true]:opacity-70",
                                                            "data-[focus-visible=true]:ring-default-500",
                                                        ],
                                                    },
                                                }}
                                                popoverProps={{
                                                    classNames: {
                                                        base: "p-0 border-small border-divider bg-background",
                                                        arrow: "bg-default-200",
                                                    },
                                                }}
                                                renderValue={(items) => {
                                                    return items.map((item) => (
                                                        <div key={item?.data?._id} className="flex items-center gap-2">
                                                            <Avatar
                                                                alt={item?.data?.nombre}
                                                                className="flex-shrink-0"
                                                                size="sm"
                                                                src={item?.data?.imagen}
                                                            />
                                                            <div className="flex flex-col">
                                                                <span>{item?.data?.nombre}</span>
                                                                <span className="text-default-500 text-tiny">({item?.data?.email})</span>
                                                            </div>
                                                        </div>
                                                    ));
                                                }}
                                                >
                                                {(user) => (
                                                    <SelectItem key={user?._id || instructor._id} textValue={user?.nombre}>
                                                        <div className="flex gap-2 items-center">
                                                            <Avatar alt={user?.nombre} className="flex-shrink-0" size="sm" src={user?.imagen} />
                                                            <div className="flex flex-col">
                                                                <span className="text-small">{user?.nombre}</span>
                                                                <span className="text-tiny text-default-400">{user?.email}</span>
                                                            </div>
                                                        </div>
                                                    </SelectItem>
                                                )}
                                            </Select>
                                        
                                            {id && (
                                                <div className="w-full flex flex-col justify-center gap-4">
                                                    <div className="flex w-full flex-wrap md:flex-nowrap mb-5 gap-4">
                                                        <Select 
                                                            label="Selecciona un estado" 
                                                            color={
                                                                estado === 'Etapa Lectiva' ? 'success' :
                                                                estado === 'Etapa Productiva' ? 'warning' :
                                                                estado === 'Formación Finalizada' ? 'danger' :
                                                                'default'
                                                            }
                                                            onChange={e=> setEstado(e.target.value)}
                                                            defaultSelectedKeys={[estado]}
                                                        >
                                                            {ESTADOSTITULADAS.map((estado) => (
                                                                <SelectItem key={estado} value={estado}>
                                                                    {estado}
                                                                </SelectItem>
                                                            ))}
                                                        </Select>
                                                    </div>
                                                </div>  
                                            )}

                                            <Boton type="submit" classes={'bg-primary-100 w-full'}>{ id ? 'Guardar Cambios': 'Crear Titulada'}</Boton>
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
