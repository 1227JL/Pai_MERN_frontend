import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Link,
  User,
} from "@nextui-org/react";
import useAprendiz from "../hooks/useAprendiz";

export default function ModalDetallesAprendiz() {
  const { aprendiz, modalDetallesAprendiz, handleModalDetallesAprendiz } =
    useAprendiz();

  return (
    <>
      <Modal
        size="xl"
        classNames={{
          body: "pb-6",
          base: "m-auto mx-2",
        }}
        backdrop={"blur"}
        isOpen={modalDetallesAprendiz}
        onClose={handleModalDetallesAprendiz}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1  hei ">
                Detalles Aprendiz
              </ModalHeader>
              <ModalBody>
                <div className="md:flex justify-between items-center">
                  <p className="font-bold">Nombre</p>
                  <p>{aprendiz?.nombre}</p>
                </div>
                <div className="md:flex justify-between items-center">
                  <p className="font-bold">Email</p>
                  <p>{aprendiz?.email}</p>
                </div>
                <div className="md:flex justify-between items-center">
                  <p className="font-bold">Telefono</p>
                  <p>{aprendiz?.telefono}</p>
                </div>
                <div className="md:flex justify-between items-center">
                  <p className="font-bold">Tipo Documento</p>
                  <p>{aprendiz?.tipoDocumento}</p>
                </div>
                <div className="md:flex justify-between items-center">
                  <p className="font-bold">Dcoumento</p>
                  <p>{aprendiz?.documento}</p>
                </div>
                <div className="md:flex justify-between items-center">
                  <p className="font-bold mb-2">Estado de Formación</p>
                  <div
                    className={`p-3 rounded-lg ${(() => {
                      switch (aprendiz?.estado) {
                        case "Etapa Lectiva":
                          return "bg-success-100";
                        case "Etapa Productiva":
                          return "bg-warning-100";
                        case "Formación Finalizada":
                          return "bg-danger-100";
                        default:
                          return "bg-default-100";
                      }
                    })()}`}
                  >
                    <p
                      className={`text-sm ${(() => {
                        switch (aprendiz?.estado) {
                          case "Etapa Lectiva":
                            return "text-success-600";
                          case "Etapa Productiva":
                            return "text-warning-600";
                          case "Formación Finalizada":
                            return "text-danger-600";
                          default:
                            return "text-default-400";
                        }
                      })()}`}
                    >
                      {aprendiz?.estado}
                    </p>
                  </div>
                </div>
                <div className="md:flex justify-between items-center">
                  <p className="font-bold">Archivo Adjunto</p>
                  <Link
                    isExternal
                    isBlock
                    showAnchorIcon
                    href={`http://localhost:4000/uploads/documentosAprendices/${aprendiz?.documentoAdjunto}`}
                    color="secondary"
                  >
                    Ver documento del aprendiz
                  </Link>
                </div>
                <div className="md:flex justify-between items-center">
                  <p className="font-bold">Asignado por</p>
                  <User
                    name={aprendiz?.creador?.nombre}
                    className="mt-2"
                    description={aprendiz?.creador?.email}
                    avatarProps={{
                      src: aprendiz?.creador?.imagen,
                    }}
                  />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
