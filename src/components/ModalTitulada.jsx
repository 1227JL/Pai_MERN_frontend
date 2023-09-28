import {Modal, ModalContent, ModalHeader, ModalBody} from "@nextui-org/react";
import { useEffect, useState } from 'react'
import Alerta from './Alerta'
import { useParams } from 'react-router-dom'
import {
    Select,
    SelectItem,
    Input,
    Avatar,
} from '@nextui-org/react'
import {PROGRAMAS, JORNADAS, MODALIDADES, ESTADOSTITULADAS} from "../components/data";
import useTitulada from '../hooks/useTitulada'
import useIntructor from '../hooks/useInstructor'
import Boton from './Boton'
import FileUpload from "./FileUpload";
import useAmbiente from "../hooks/useAmbiente";

export default function ModalTitulada() {

    const params = useParams()
    const { alerta, setAlerta, submitTitulada, titulada, modalTitulada, handleModalTitulada } = useTitulada()
    const { instructores } = useIntructor()
    const { ambientes } = useAmbiente()

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
    const [selectedFile, setSelectedFile] = useState(null);

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
    
    const propsSelectInstructor = {
        items: instructores,
        label: "Asignar Instructor",
        labelPlacement: 'inside',
        placeholder: 'Selecciona un Instructor',
        onChange: e => setInstructor(e.target.value),
        classNames: {
            trigger: "bg-default-100 h-auto gap-1 mb-5",
            listboxWrapper: "max-h-[400px]",
        },
        listboxProps: {
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
        },
        popoverProps: {
            classNames: {
                base: "p-0 border-small border-divider bg-background",
                arrow: "bg-default-200",
            },
        },
    };

    const propsSelectAmbiente = {
        items: ambientes,
        label: "Asignar Ambiente",
        labelPlacement: 'inside',
        placeholder: 'Selecciona un Ambiente',
        onChange: e => setAmbiente(e.target.value),
        classNames: {
            trigger: "bg-default-100 h-auto gap-1 mb-5",
            listboxWrapper: "max-h-[400px]",
        },
        listboxProps: {
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
        },
        popoverProps: {
            classNames: {
                base: "p-0 border-small border-divider bg-background",
                arrow: "bg-default-200",
            },
        },
    };
    
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
            setAmbiente(titulada.ambiente)
        }
    }, [params, titulada]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if([programa, ficha, duracion, tipo, jornada, modalidad, instructor, ambiente, selectedFile].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        setAlerta({})

        await submitTitulada({id, programa, ficha, duracion, tipo, jornada, modalidad, instructor, ambiente, estado, file: selectedFile})
    }

    const { msg } = alerta

    return (
        <>
            <Modal size="4xl" classNames={{
                body: "pb-6",
                base: "m-auto mx-2",

                }} backdrop={'blur'} isOpen={modalTitulada} onClose={handleModalTitulada}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{id ? 'Editar Titulada' : 'Agregar Titulada'}</ModalHeader>
                            <ModalBody>
                            
                                {msg && <Alerta alerta={alerta}/>}

                                <form 
                                    onSubmit={handleSubmit}
                                    encType="multipart/form-data"
                                    className="md:grid md:grid-cols-2 md:gap-x-5"
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
                                            selectProps.defaultSelectedKeys = [select?.defaultOption]
                                            propsSelectInstructor.defaultSelectedKeys = [instructor._id]
                                            selectProps.disabledKeys = [select?.defaultOption]
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

                                    <Select {...propsSelectInstructor}
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

                                    <Select {...propsSelectAmbiente}
                                        renderValue={(items) => {
                                            return items.map((item) => (
                                                <div key={item?.data?._id} className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                                    </svg>
                                                    <div className="flex flex-col">
                                                        <span>{item?.data?.bloque}-{item?.data?.numero}</span>
                                                        <span className="text-default-500 text-tiny">Capacidad: {item?.data?.capacidad}, Categoria: {item?.data?.categoria}</span>
                                                    </div>
                                                </div>
                                            ));
                                        }}
                                        >
                                        {(ambiente) => (
                                            <SelectItem key={ambiente?._id || instructor._id} textValue={ambiente?.numero}>
                                                <div className="flex gap-2 items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                                    </svg>
                                                    <div className="flex flex-col">
                                                        <span className="text-small">{ambiente?.bloque}-{ambiente?.numero}</span>
                                                        <span className="text-tiny text-default-400">Capacidad: {ambiente?.capacidad} aprendices, Categoria: {ambiente?.categoria}</span>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        )}
                                    </Select>


                                    {id && (
                                        <div className="w-full flex flex-col justify-center gap-4 md:col-span-2">
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

                                    <div className="md:col-span-2">
                                        <FileUpload onFileSelect={(file) => setSelectedFile(file)} />
                                    </div>

                                    <Boton type="submit" classes={'bg-primary-100 w-full md:col-span-2'}>{ id ? 'Guardar Cambios': 'Crear Titulada'}</Boton>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>  
        </>

    )
}
