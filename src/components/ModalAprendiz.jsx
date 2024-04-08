import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import Alerta from "./Alerta";
import { Select, SelectItem, Input } from "@nextui-org/react";
import Boton from "./Boton";
import { MailIcon } from "./MailIcon";
import FileUpload from "./FileUpload";
import useAprendiz from "../hooks/useAprendiz";
import { useState } from "react";

export default function ModalAprendiz() {
  const { modalAprendiz, handleModalAprendiz, submitAprendeiz } =
    useAprendiz();

  const [id, setId] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [estado, setEstado] = useState("Matriculado");

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
  
  };


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

                  <FileUpload title={'Documento de identidad'}/>
                  <Boton type="submit" classes={"bg-primary-100 w-full"}>
                    {id ? "Guardar Cambios" : "Registrar Aprendiz"}
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
