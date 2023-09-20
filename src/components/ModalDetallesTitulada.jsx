import useTitulada from '../hooks/useTitulada'
import { User } from '@nextui-org/react'
import {Modal, ModalContent, ModalHeader, ModalBody} from "@nextui-org/react";


export default function ModalDetallesTitulada() {
    
    const { titulada, modalDetallesTitulada, handleModaDetalleslTitulada } = useTitulada()
    
    
    if(!titulada.instructores) return
    return (
        <>
            <Modal classNames={{
                body: "pb-6",
                base: "m-auto mx-2",
            }} backdrop={'blur'} isOpen={modalDetallesTitulada} onClose={handleModaDetalleslTitulada}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{titulada?.programa}</ModalHeader>
                            <ModalBody>
                                <div>
                                    <p className='font-bold'>Ficha</p>
                                    <p>{titulada?.ficha}</p>
                                </div>
                                <div>
                                    <p className='font-bold'>Tipo de Formación</p>
                                    <p>{titulada?.tipo}</p>
                                </div>
                                <div>
                                    <p className='font-bold'>Instructor a Cargo</p>
                                    <User   
                                        name={titulada?.instructores[0]?.nombre}
                                        className='mt-2'
                                        description={titulada?.instructores[0]?.email}
                                        avatarProps={{
                                            src: titulada?.instructores[0]?.imagen
                                        }}
                                    />
                                </div>
                                <div>
                                    <p className='font-bold'>Ambiente</p>
                                    <p>{titulada?.ambiente || 'E-105'}</p>
                                </div>
                                <div>
                                    <p className='font-bold'>Modalidad</p>
                                    <p>{titulada?.modalidad}</p>
                                </div>
                                <div>
                                    <p className='font-bold'>Jornada</p>
                                    <p>{titulada?.jornada}</p>
                                </div>
                                <div>
                                    <p className='font-bold'>Duración</p>
                                    <p>{titulada?.duracion}</p>
                                </div>
                                <div>
                                    <p className='font-bold'>Cantidad de Aprendices</p>
                                    <p>{titulada?.aprendices?.length || 25}</p>
                                </div>
                                <div>
                                    <p className='font-bold'>Creada por</p>
                                    <User   
                                        name={titulada?.creador?.nombre}
                                        className='mt-2'
                                        description={titulada?.creador?.email}
                                        avatarProps={{
                                            src: titulada?.creador?.imagen
                                        }}
                                    />
                                </div>
                                <div>
                                    <p className='font-bold mb-2'>Estado de Formación</p>
                                    <div className={`p-3 rounded-lg ${(() => {
                                        switch (titulada?.estado) {
                                            case 'Etapa Lectiva':
                                                return 'bg-success-100';
                                            case 'Etapa Productiva':
                                                return 'bg-warning-100';
                                            case 'Formación Finalizada':
                                                return 'bg-danger-100';
                                            default:
                                                return 'bg-default-100';
                                        }
                                        })()}`}>
                                        <p className={`text-sm ${(() => {
                                            switch (titulada?.estado) {
                                                case 'Etapa Lectiva':
                                                    return 'text-success-600';
                                                case 'Etapa Productiva':
                                                    return 'text-warning-600';
                                                case 'Formación Finalizada':
                                                    return 'text-danger-600';
                                                default:
                                                    return 'text-default-400';
                                            }
                                            })()}`}
                                        >{titulada.estado}</p>
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>  
        </>
    )
}
