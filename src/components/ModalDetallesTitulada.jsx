import useTitulada from "../hooks/useTitulada";
import { Link, User } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import useInstructor from "../hooks/useInstructor";

export default function ModalDetallesTitulada() {
  const { titulada, modalDetallesTitulada, handleModalDetallesTitulada } =
    useTitulada();
  const { setBusqueda } = useInstructor();
  const navigate = useNavigate();

  if (!titulada.instructores) return;
  return (
    <>
      <Modal
        size="xl"
        classNames={{
          body: "pb-6",
          base: "m-auto mx-2",
        }}
        backdrop={"blur"}
        isOpen={modalDetallesTitulada}
        onClose={handleModalDetallesTitulada}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {titulada?.programa}
              </ModalHeader>
              <ModalBody>
                <div className="md:flex justify-between items-center">
                  <p className="font-bold">Ficha</p>
                  <p>{titulada?.ficha}</p>
                </div>
                <div className="md:flex justify-between items-center">
                  <p className="font-bold">Tipo de Formación</p>
                  <p>{titulada?.titulo}</p>
                </div>
                <div className="md:flex justify-between items-center">
                  <p className="font-bold">Instructor a Cargo</p>
                  <Link
                    className="cursor-pointer"
                    color="secondary"
                    onClick={() => {
                      navigate("/consultar/instructores");
                      setBusqueda(titulada?.instructores[0]?.nombre);
                    }}
                  >
                    <User
                      name={titulada?.instructores[0]?.nombre}
                      className="mt-2"
                      description={titulada?.instructores[0]?.email}
                      avatarProps={{
                        src: titulada?.instructores[0]?.imagen,
                      }}
                    />
                  </Link>
                </div>
                <div className="md:flex justify-between items-center">
                  <p className="font-bold">Ambiente</p>
                  <p>{`${titulada?.ambiente?.bloque}-${titulada?.ambiente?.numero}`}</p>
                </div>
                <div className="md:flex justify-between items-center">
                  <p className="font-bold">Modalidad</p>
                  <p>{titulada?.modalidad}</p>
                </div>
                <div className="md:flex justify-between items-center">
                  <p className="font-bold">Jornada</p>
                  <p>{titulada?.jornada}</p>
                </div>
                <div className="md:flex justify-between items-center">
                  <p className="font-bold">Duración</p>
                  <p>{titulada?.duracion_etapa_lectiva + titulada?.duracion_etapa_productiva}</p>
                </div>
                <div className="md:flex justify-between items-center">
                  <p className="font-bold">Cantidad de Aprendices</p>
                  <p>{titulada?.aprendices?.length || 25}</p>
                </div>
                <div className="md:flex justify-between items-center">
                  <p className="font-bold">Archivo Adjunto</p>
                  <Link
                    isExternal
                    isBlock
                    showAnchorIcon
                    href={`http://localhost:4000/uploads/disenosCurriculares/${titulada?.archivoAdjunto}`}
                    color="secondary"
                  >
                    Ver Diseño Curricular
                  </Link>
                </div>
                <div className="md:flex justify-between items-center">
                  <p className="font-bold mb-2">Estado de Formación</p>
                  <div
                    className={`p-3 rounded-lg ${(() => {
                      switch (titulada?.estado) {
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
                        switch (titulada?.estado) {
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
                      {titulada?.estado}
                    </p>
                  </div>
                </div>
                <div className="md:flex justify-between items-center">
                  <p className="font-bold">Creada por</p>
                  <User
                    name={titulada?.creador?.nombre}
                    className="mt-2"
                    description={titulada?.creador?.email}
                    avatarProps={{
                      src: titulada?.creador?.imagen,
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
