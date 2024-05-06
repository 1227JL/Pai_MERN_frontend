import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import Alerta from "./Alerta";
import { Select, SelectItem, Input } from "@nextui-org/react";
import Boton from "./Boton";
import { MailIcon } from "./MailIcon";
import FileUpload from "./FileUpload";
import useAprendiz from "../hooks/useAprendiz";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function ModalAprendiz() {
  const {
    alerta,
    aprendiz,
    setAlerta,
    modalAprendiz,
    handleModalAprendiz,
    submitAprendiz,
  } = useAprendiz();

  const params = useParams()
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [estado, setEstado] = useState("Matriculado");
  const [selectedFile, setSelectedFile] = useState(null);

  const inputsAprendiz = [
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
    startContent: (
      <MailIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
    ),
  };

  useEffect(() => {
    if (params.identificacion && aprendiz && Object.keys(aprendiz).length > 0) {
        setId(aprendiz._id);
        setEmail(aprendiz.modalidad);
        setTelefono(aprendiz.estado)
        setTelefono(aprendiz.instructores[0]);
    }
}, [params, aprendiz]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [
        email,
        telefono,
        selectedFile,
      ].includes("")
    ) {
      return setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
    }

    setAlerta({})

    await submitAprendiz({
      email,
      telefono,
      estado,
      file: selectedFile,
    });
  };

  const { msg } = alerta

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
                  {msg && <Alerta alerta={alerta}/>}
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
                  <FileUpload
                    onFileSelect={(file) => setSelectedFile(file)}
                    title={"Documento de Identidad"}
                  />
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
