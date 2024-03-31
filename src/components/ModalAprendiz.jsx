import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import Alerta from "./Alerta";
import { Select, SelectItem, Input } from "@nextui-org/react";
import Boton from "./Boton";
import useTitulada from "../hooks/useTitulada";
import { TIPOSIDENTIFICACION } from "./data";
import { MailIcon } from "./MailIcon";
import FileUpload from "./FileUpload";

export default function ModalAprendiz() {
  const { alerta, setAlerta, modalAprendiz, handleModalAprendiz, submitAprendeiz } =
    useTitulada();

  const [id, setId] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [tipoIdentificacion, setTipoIdentificacion] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const inputsAprendiz = [
    {
      state: nombres,
      stateSet: setNombres,
      type: "text",
      label: "Nombres",
      placeholder: "Nombres del aprendiz",
    },
    {
      state: apellidos,
      stateSet: setApellidos,
      type: "text",
      label: "Apellidos",
      placeholder: "Apellidos del aprendiz",
    },
    {
      state: identificacion,
      stateSet: setIdentificacion,
      type: "number",
      label: "Identificación",
      placeholder: "Número de documento",
    },
    {
      state: email,
      stateSet: setEmail,
      type: "text",
      label: "Email",
      placeholder: "Email de contacto",
    },
    {
      state: telefono,
      stateSet: setTelefono,
      type: "number",
      label: "Teléfono",
      placeholder: "Teléfono de contacto",
    },
  ];

  const propsEmail = {
    startContent: <MailIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />,
  };

  const selectsAprendiz = [
    {
      label: "Tipo de identificación",
      stateSet: setTipoIdentificacion,
      defaultOption: tipoIdentificacion,
      options: TIPOSIDENTIFICACION,
      placeholder: "Seleccione un tipo de identificación",
    },
  ];

  // useEffect(() => {
  //   if (aprendiz && Object.keys(aprendiz).length > 0) {
  //     setId(aprendiz._id);
  //     setNombre(aprendiz.nombre || ""); // Siempre define un valor inicial
  //     setIdentificacion(aprendiz.identificacion || ""); // Siempre define un valor inicial
  //     setEmail(aprendiz.email || ""); // Siempre define un valor inicial
  //     setTelefono(aprendiz.telefono || ""); // Siempre define un valor inicial
  //     setContrato(aprendiz.contrato || ""); // Siempre define un valor inicial
  //     setArea(aprendiz.area || ""); // Siempre define un valor inicial
  //     setEstado(aprendiz.estado || ""); // Siempre define un valor inicial
  //     return;
  //   }

  //   setId(null);
  //   setNombre(""); // Puedes mantener esto como una cadena vacía si es necesario
  //   setIdentificacion("");
  //   setEmail("");
  //   setTelefono("");
  //   setContrato("");
  //   setArea("");
  //   setEstado("");
  // }, [id, aprendiz]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombres, identificacion, email, telefono].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    setAlerta({});

    await submitAprendeiz({
      id,
      nombres,
      identificacion,
      email,
      telefono,
      estado,
    });
  };

  const { msg } = alerta;

  return (
    <>
      <Modal
        classNames={{
          body: "pb-6",
          base: "m-auto mx-2",
        }}
        backdrop={"blur"}
        isOpen={modalAprendiz}
        onClose={handleModalAprendiz}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {id ? "Editar" : "Agregar"} Aprendiz
              </ModalHeader>
              <ModalBody>
                {msg && <Alerta alerta={alerta} />}

                <form onSubmit={handleSubmit}>
                  {inputsAprendiz.map((input) => (
                    <div key={input.label} className="mb-5">
                      <Input
                        {...(input.label === "Email" ? propsEmail : {})}
                        type={input.type}
                        label={input.label}
                        labelPlacement={"inside"}
                        placeholder={input.placeholder}
                        value={input.state}
                        onChange={(e) => input.stateSet(e.target.value)}
                      />
                    </div>
                  ))}

                  {selectsAprendiz.map((select) => {
                    const selectProps = {
                      key: select.label,
                      className: "mb-5",
                      label: select.label,
                      onChange: (e) => select.stateSet(e.target.value),
                      placeholder: select.placeholder,
                    };

                    if (id) {
                      selectProps.selectedKeys = [select?.defaultOption];
                      selectProps.disabledKeys = [select?.defaultOption];
                      selectProps.defaultSelectedKeys = [select?.defaultOption];
                    }

                    return (
                      <Select {...selectProps}>
                        {select.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </Select>
                    );
                  })}

                  <FileUpload/>

                  {/* {id && (
                    <div className="w-full flex flex-col justify-center gap-4 md:col-span-2">
                      <div className="flex w-full flex-wrap md:flex-nowrap mb-5 gap-4">
                        <Select
                          label="Selecciona un estado"
                          color={
                            estado === "Activo"
                              ? "success"
                              : estado === "Inactivo"
                              ? "danger"
                              : estado === "Vacaciones"
                              ? "warning"
                              : "default"
                          }
                          onChange={(e) => setEstado(e.target.value)}
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
                  )} */}

                  <Boton type="submit" classes={"bg-primary-100 w-full"}>
                    {id ? "Guardar Cambios" : "Registrar Instructor"}
                  </Boton>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
