import { useEffect, useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody} from "@nextui-org/react";
import useInstructor from '../hooks/useInstructor'
import Alerta from './Alerta'
import {
    Select,
    SelectItem,
    Input
} from '@nextui-org/react'
import {MailIcon} from '../components/MailIcon';
import { AREAS, CONTRATOS, ESTADOSINSTRUCTORES } from './data'
import Boton from './Boton';
import { agregarDominioSena } from '../helpers/Utils';

export default function ModalInstructor() {

  const { alerta, setAlerta, instructor, modalInstructor, handleModalInstructor, submitInstructor } = useInstructor();

  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrato, setContrato] = useState('');
  const [area, setArea] = useState('');
  const [estado, setEstado] = useState('Activo')

  const propsEmail = {
    startContent: <MailIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />,
    endContent: (
      <div className="pointer-events-none flex items-center">
        <span className="text-default-400 text-small">@sena.edu.co</span>
      </div>
    ),
  };

  const inputsInstructor = [
    { state: nombre, stateSet: setNombre, type: 'text', label: 'Nombre', placeholder: 'Nombre Completo' },
    { state: identificacion, stateSet: setIdentificacion, type: 'number', label: 'Identificación', placeholder: 'Cédula de Ciudadania' },
    { state: email, stateSet: setEmail, type: 'text', label: 'Email', placeholder: 'Instructor' },
    { state: telefono, stateSet: setTelefono, type: 'number', label: 'Teléfono', placeholder: 'Teléfono de contacto' },
  ];
  
  const selectsInstructor = [
    { label: 'Tipo Contrato', stateSet: setContrato, defaultOption: contrato, options: CONTRATOS, placeholder: 'Seleccione un tipo de Contrato' },
    { label: 'Area', stateSet: setArea, defaultOption: area, options: AREAS, placeholder: 'Seleccione una área' },
  ];
  
  useEffect(() => {
    if (instructor && Object.keys(instructor).length > 0) {
      setId(instructor._id);
      setNombre(instructor.nombre || ''); // Siempre define un valor inicial
      setIdentificacion(instructor.identificacion || ''); // Siempre define un valor inicial
      setEmail(instructor.email || ''); // Siempre define un valor inicial
      setTelefono(instructor.telefono || ''); // Siempre define un valor inicial
      setContrato(instructor.contrato || ''); // Siempre define un valor inicial
      setArea(instructor.area || ''); // Siempre define un valor inicial
      setEstado(instructor.estado || ''); // Siempre define un valor inicial
      return;
    }
  
    setId(null);
    setNombre(''); // Puedes mantener esto como una cadena vacía si es necesario
    setIdentificacion('');
    setEmail('');
    setTelefono('');
    setContrato('');
    setArea('');
    setEstado('');
  }, [id, instructor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, identificacion, email, telefono, contrato].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    setAlerta({});

    await submitInstructor({ id, nombre, identificacion, email: agregarDominioSena(email), telefono, contrato, area, estado });
  };

  const { msg } = alerta;

  return (
    <>
      <Modal
        classNames={{
          body: "pb-6",
          base: "m-auto mx-2",
        }}
        backdrop={'blur'}
        isOpen={modalInstructor}
        onClose={handleModalInstructor}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{id ? 'Editar' : 'Agregar'} Instructor</ModalHeader>
              <ModalBody>
                {msg && <Alerta alerta={alerta} />}

                <form onSubmit={handleSubmit}>
                  {inputsInstructor.map((input) => (
                    <div key={input.label} className='mb-5'>
                      <Input
                        {...(input.label === 'Email' ? propsEmail : {})}
                        type={input.type}
                        label={input.label}
                        labelPlacement={'inside'}
                        placeholder={input.placeholder}
                        value={input.state}
                        onChange={(e) => input.stateSet(e.target.value)}
                      />
                    </div>
                  ))}

                  {selectsInstructor.map(select => {
                    const selectProps = {
                      key: select.label,
                      className: 'mb-5',
                      label: select.label,
                      onChange: e => select.stateSet(e.target.value),
                      placeholder: select.placeholder,
                    };

                    if(id) {
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

                  {id && (
                    <div className="w-full flex flex-col justify-center gap-4 md:col-span-2">
                        <div className="flex w-full flex-wrap md:flex-nowrap mb-5 gap-4">
                            <Select 
                              label="Selecciona un estado" 
                              color={
                                estado === 'Activo' ? 'success' :
                                estado === 'Inactivo' ? 'danger' :
                                estado === 'Vacaciones' ? 'warning' :
                                'default'
                              }
                              onChange={e=> setEstado(e.target.value)}
                              defaultSelectedKeys={[estado]}
                            >
                              {ESTADOSINSTRUCTORES.map((estado) => (
                                <SelectItem key={estado} value={estado}>
                                  {estado}
                                </SelectItem>
                              ))}
                            </Select>
                        </div>
                    </div>  
                  )}

                  <Boton type="submit" classes={'bg-primary-100 w-full'}>{ id ? 'Guardar Cambios': 'Registrar Instructor'}</Boton>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
    )
}


