import { useEffect, useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody} from "@nextui-org/react";
import useAmbiente from '../hooks/useAmbiente'
import Alerta from './Alerta'
import {
  Select,
  SelectItem,
  Input
} from '@nextui-org/react'
import Boton from './Boton';

export default function ModalAmbiente() {

  const { alerta, setAlerta, ambiente, modalAmbiente, handleModalAmbiente } = useAmbiente();

  const handleSubmit = () => {
  
  }
  const { msg } = alerta;

  return (
    <>
      <Modal
        classNames={{
          body: "pb-6",
          base: "m-auto mx-2",
        }}
        backdrop={'blur'}
        isOpen={modalAmbiente}
        onClose={handleModalAmbiente}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Agregar Ambiente</ModalHeader>
              <ModalBody>
                {msg && <Alerta alerta={alerta} />}

                <form onSubmit={handleSubmit}>
                  

                  <Boton type="submit" classes={'bg-primary-100 w-full'}>Registrar Ambiente</Boton>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
    )
}


