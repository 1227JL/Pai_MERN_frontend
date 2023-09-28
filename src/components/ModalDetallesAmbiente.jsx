import { Link, User } from '@nextui-org/react'
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

                        </ModalBody>
                      </>
                    )}
                </ModalContent>
            </Modal>  
        </>
    )
}
