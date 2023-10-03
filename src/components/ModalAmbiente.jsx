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
import { BLOQUESAMBIENTE, CATEGORIASAMBIENTE } from './data';
   
export default function ModalAmbiente() {

  const { alerta, setAlerta, ambiente, modalAmbiente, handleModalAmbiente, submitAmbiente } = useAmbiente();

  const [id, setId] = useState(null)
  const [numero, setNumero] = useState('')
  const [capacidad, setCapacidad] = useState('')
  const [bloque, setBloque] = useState('')
  const [categoria, setCategoria] = useState('')

  useEffect(() => {
    if (ambiente && Object.keys(ambiente).length > 0) {
      setId(ambiente._id);
      setNumero(ambiente.numero || ''); // Siempre define un valor inicial
      setCapacidad(ambiente.capacidad || ''); // Siempre define un valor inicial
      setBloque(ambiente.bloque || ''); // Siempre define un valor inicial
      setCategoria(ambiente.categoria || ''); // Siempre define un valor inicial
      return;
    }
  
    setId(null);
    setNumero(''); // Puedes mantener esto como una cadena vacía si es necesario
    setCapacidad('');
    setBloque('');
    setCategoria('');
  }, [id, ambiente]);

  const inputsAmbiente = [
    {state: numero, stateSet: setNumero, type: 'number', label: 'Número Ambiente', placeholder: 'Número del Ambiente'},
    {state: capacidad, stateSet: setCapacidad, type: 'number', label: 'Capacidad Ambiente', placeholder: 'Capacidad del Ambiente'},
  ]

  const selectsAmbiente = [
    {label: 'Bloque Ambiente', stateSet: setBloque, defaultOption: bloque, options: BLOQUESAMBIENTE, placeholder: 'Seleccione el bloque'},
    {label: 'Categoria Ambiente', stateSet: setCategoria, defaultOption: categoria, options: CATEGORIASAMBIENTE, placeholder: 'Seleccione una categoria'},
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()

    if([numero, capacidad, bloque, categoria].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    setAlerta({})

    await submitAmbiente({id, numero, capacidad, bloque, categoria})
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
              <ModalHeader className="flex flex-col gap-1">{id ? 'Agregar' : 'Editar'} Ambiente</ModalHeader>
              <ModalBody>
                {msg && <Alerta alerta={alerta} />}

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  {inputsAmbiente.map(input => (
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

                  {selectsAmbiente.map(select => {
                    const selectProps = {
                      key: select.label,
                      className: 'mb-5',
                      label: select.label,
                      onChange: e => select.stateSet(e.target.value),
                      placeholder: select.placeholder,
                    };

                    if (id) {
                      selectProps.selectedKeys = [select?.defaultOption]
                      selectProps.disabledKeys = [select?.defaultOption]
                      selectProps.defaultSelectedKeys = [select?.defaultOption]
                    }
                    
                    return (
                      <Select {...selectProps}>
                        {select.options.map(option => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                        ))}
                      </Select>
                    );
                  })}


                  <Boton type="submit" classes={'bg-primary-100 w-full'}>{id ? 'Guardar Cambios' : 'Registrar Ambiente'}</Boton>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
    )
}


