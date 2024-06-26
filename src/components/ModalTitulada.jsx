import {Modal, ModalContent, ModalHeader, ModalBody} from "@nextui-org/react";
import { useEffect, useState } from 'react'
import Alerta from './Alerta'
import { useParams } from 'react-router-dom'
import {
    Select,
    SelectItem,
    Input,
    User
} from '@nextui-org/react'
import {JORNADAS, MODALIDADES, ESTADOSTITULADAS} from "../components/data";
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
    const [ficha, setFicha] = useState('')
    const [jornada, setJornada] = useState('')
    const [estado, setEstado] = useState('Convocatoria')
    const [modalidad, setModalidad] = useState('')
    const [instructor, setInstructor] = useState({})
    const [ambiente, setAmbiente] = useState({})
    const [selectedFile, setSelectedFile] = useState(null);

    const inputsTitulada = [
        {state: ficha, stateSet: setFicha, type: 'number', label: 'Número Ficha', placeholder: 'Número de Ficha'},
    ]
    
    const selectsTitulada = [
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
        isDisabled: modalidad == 'Virtual' ? true : false,
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
            setFicha(titulada.ficha);
            setJornada(titulada.jornada);
            setModalidad(titulada.modalidad);
            setEstado(titulada.estado)
            setInstructor(titulada.instructores[0]);
            setAmbiente(titulada.ambiente)
        }
    }, [params, titulada]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if([ficha, jornada, modalidad, instructor].includes('') || !id && !selectedFile){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        if(modalidad !== 'Virtual' && !ambiente){
            setAlerta({
                msg: 'Se requiere un ambiente de formación para la formación presencial',
                error: true
            }) 
            return
        }

        setAlerta({})

        await submitTitulada({id, ficha, jornada, modalidad, instructor, ambiente, estado, file: selectedFile})

        setFicha('')
    }

    const { msg } = alerta

    return (
        <>
            <Modal size="xl" classNames={{
                body: "pb-6",
                base: "m-auto mx-2",

                }} backdrop={'blur'} isOpen={modalTitulada} onClose={handleModalTitulada}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{id ? 'Editar' : 'Agregar'} Titulada</ModalHeader>
                            <ModalBody>
                            
                                {msg && <Alerta alerta={alerta}/>}

                                <form 
                                    onSubmit={handleSubmit}
                                    encType="multipart/form-data"
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

                                    {selectsTitulada?.map(select => {
                                        const selectProps = {
                                            key: select?.label,
                                            className: 'mb-5',
                                            label: select?.label,
                                            onChange: e => select?.stateSet(e.target.value),
                                            placeholder: select?.placeholder,
                                        };

                                        if (id) {
                                            selectProps.defaultSelectedKeys = [select?.defaultOption]
                                            selectProps.disabledKeys = [select?.defaultOption]
                                            propsSelectInstructor.defaultSelectedKeys = [instructor?._id]
                                            propsSelectInstructor.disabledKeys = [instructor?._id || instructor]
                                            propsSelectAmbiente.defaultSelectedKeys = [ambiente?._id]
                                            propsSelectAmbiente.disabledKeys = [ambiente?._id || ambiente]
                                        }
                                        
                                        return (
                                            <Select {...selectProps}>
                                                {select?.options?.map(option => (
                                                    <SelectItem key={option?.name} value={option?.name}>
                                                        {option?.name}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                        );
                                    })}

                                    <Select {...propsSelectInstructor}
                                        renderValue={(items) => {
                                            return items.map((item) => (
                                                <div key={item?.data?._id} className="flex items-center gap-2">
                                                    <User
                                                        avatarProps={{radius: "full", src: item?.data?.imagen}}
                                                        description={item?.data?.email}
                                                        name={item?.data?.nombre}
                                                    />
                                                </div>
                                            ));
                                        }}
                                        >
                                        {(user) => (
                                            <SelectItem key={user?._id || instructor._id} textValue={user?.nombre}>
                                                <div className="flex gap-2 items-center">
                                                    <User
                                                        avatarProps={{radius: "full", src: user?.imagen}}
                                                        description={user?.email}
                                                        name={user?.nombre}
                                                    />
                                                </div>
                                            </SelectItem>
                                        )}
                                    </Select>

                                    <Select {...propsSelectAmbiente}
                                        renderValue={(items) => {
                                            return items.map((item) => (
                                                <div key={item?.data?._id} className="flex items-center gap-2">
                                                    <img src="/src/assets/ambiente.png" alt="icono ambientes" height={40} width={40}/>
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
                                                    <img src="/src/assets/ambiente.png" alt="icono ambientes" height={40} width={40}/>
                                                    <div className="flex flex-col">
                                                        <span className="text-small">{ambiente?.bloque}-{ambiente?.numero}</span>
                                                        <span className="text-tiny text-default-400">Capacidad: {ambiente?.capacidad} aprendices, Categoria: {ambiente?.categoria}</span>
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

                                    <div>
                                        <FileUpload onFileSelect={(file) => setSelectedFile(file)} title={'Diseño curricular'} />
                                    </div>

                                    <Boton type="submit" classes={'bg-primary-100 w-full'}>{ id ? 'Guardar Cambios': 'Crear Titulada'}</Boton>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>  
        </>

    )
}
