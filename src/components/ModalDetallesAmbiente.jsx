import { User } from '@nextui-org/react'
import {Modal, ModalContent, ModalHeader, ModalBody} from "@nextui-org/react";
import useAmbiente from '../hooks/useAmbiente';

export default function ModalDetallesAmbiente() {
    
    const { ambiente, modalDetallesAmbiente, handleModalDetallesAmbiente } = useAmbiente()
    
    if(!ambiente?.numero) return
    return (
        <>
            <Modal size='xl' classNames={{
              body: "pb-6",
              base: "m-auto mx-2",
            }} backdrop={'blur'} isOpen={modalDetallesAmbiente} onClose={handleModalDetallesAmbiente}>
                <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">Ambiente {ambiente?.bloque}-{ambiente?.numero}</ModalHeader>
                        <ModalBody>
                          <div className='md:flex justify-between items-center'>
                            <p className='font-bold'>Bloque</p>
                            <p>{ambiente?.bloque}</p>
                          </div>
                          <div className='md:flex justify-between items-center'>
                            <p className='font-bold'>Número</p>
                            <p>{ambiente?.numero}</p>
                          </div>
                          <div className='md:flex justify-between items-center'>
                            <p className='font-bold'>Capacidad</p>
                            <p>{ambiente?.capacidad} Aprendices</p>
                          </div>
                          <div className='md:flex justify-between items-center'>
                            <p className='mb-2 md:0 font-bold'>Categoria</p>
                            <div className={`flex gap-2 py-2 px-5 items-center rounded-lg ${(() => {
                                switch (ambiente?.categoria) {
                                    case 'Cocina':
                                      return 'bg-warning-100';
                                    case 'Informática':
                                      return 'bg-blue-100';
                                    case 'No Disponible':
                                      return 'bg-danger-100';
                                    default:
                                      return 'bg-default-100';
                                }
                                })()}`}>
                             
                              <p className='text-sm'>{ambiente?.categoria}</p>
                            </div>
                          </div>
                          <div className='md:flex justify-between items-center'>
                            <p className='font-bold'>Creado por</p>
                            <User   
                              name={ambiente?.creador?.nombre}
                              className='mt-2'
                              description={ambiente?.creador?.email}
                              avatarProps={{
                                src: ambiente?.creador?.imagen
                              }}
                            />
                          </div>
                          <div>
                            <p className='font-bold mb-2'>Estado del Ambiente</p>
                            <div className={`p-3 rounded-lg ${(() => {
                                switch (ambiente?.estado) {
                                    case 'Disponible':
                                      return 'bg-success-100';
                                    case 'En Mantenimiento':
                                      return 'bg-warning-100';
                                    case 'No Disponible':
                                      return 'bg-danger-100';
                                    default:
                                      return 'bg-default-100';
                                }
                                })()}`}>
                                <p className={`text-sm ${(() => {
                                    switch (ambiente?.estado) {
                                        case 'Disponible':
                                          return 'text-success-600';
                                        case 'En Mantenimiento':
                                          return 'text-warning-600';
                                        case 'No Disponible':
                                          return 'text-danger-600';
                                        default:
                                          return 'text-default-400';
                                    }
                                    })()}`}
                                >{ambiente?.estado}</p>
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
