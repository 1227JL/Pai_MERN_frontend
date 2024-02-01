import { User } from '@nextui-org/react'
import {Modal, ModalContent, ModalHeader, ModalBody, Progress} from "@nextui-org/react";
import useInstructor from '../hooks/useInstructor';

export default function ModalDetallesInstructor() {

    const { instructor, modalDetallesInstructor, handleModalDetallesInstructor } = useInstructor()
    
    return (
        <>
            <Modal size='xl' classNames={{
                body: "pb-6",
                base: "m-auto mx-2",
            }} backdrop={'blur'} isOpen={modalDetallesInstructor} onClose={handleModalDetallesInstructor}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                            <ModalBody>
                                <div className='mb-2 md:flex justify-between items-center'>
                                    <User  
                                        name={instructor?.nombre}
                                        description={instructor?.email}
                                        avatarProps={{
                                            src: instructor?.imagen
                                        }}
                                    />
                                </div>
                                <div className='md:flex justify-between items-center'>
                                    <p className='font-bold'>Identificación</p>
                                    <p>{instructor?.identificacion}</p>
                                </div>
                                <div className='md:flex justify-between items-center'>
                                    <p className='font-bold'>Email</p>
                                    <p>{instructor?.email}</p>
                                </div>
                                <div className='md:flex justify-between items-center'>
                                    <p className='font-bold'>Teléfono</p>
                                    <p>{instructor?.telefono}</p>
                                </div>
                                <div className='md:flex justify-between items-center'>
                                    <p className='font-bold'>Area</p>
                                    <p>{instructor?.area}</p>
                                </div>
                                <div className='md:flex justify-between items-center'>
                                    <p className='font-bold'>Contrato</p>
                                    <p>{instructor?.contrato}</p>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <p className='font-bold'>Horas realizadas</p>
                                    <Progress
                                        formatOptions={'number'}
                                        size="md"
                                        radius="sm"
                                        classNames={{
                                            track: "border border-default",
                                            indicator: "bg-gradient-to-r from-success-600 to-success-300",
                                            label: "tracking-wider font-medium text-default-600",
                                            value: "text-foreground/80",
                                        }}
                                        value={instructor?.horas}
                                        maxValue={instructor?.contrato === 'Término Fijo' ? 160 : 120}
                                        showValueLabel={true}
                                    />
                                </div>
                                <div>
                                    <p className='font-bold mb-2'>Estado</p>
                                    <div className={`p-3 rounded-lg ${(() => {
                                        switch (instructor?.estado) {
                                            case 'Activo':
                                                return 'bg-success-100';
                                            case 'Inactivo':
                                                return 'bg-danger-100';
                                            case 'Vacaciones':
                                                return 'bg-warning-100';
                                            default:
                                                return 'bg-default-100';
                                        }
                                        })()}`}>
                                        <p className={`text-sm ${(() => {
                                            switch (instructor?.estado) {
                                                case 'Activo':
                                                    return 'text-success-600';
                                                case 'Inactivo':
                                                    return 'text-danger-600';
                                                case 'Vacaciones':
                                                    return 'text-warning-600';
                                                default:
                                                    return 'text-default-400';
                                            }
                                            })()}`}
                                        >{instructor.estado}</p>
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
