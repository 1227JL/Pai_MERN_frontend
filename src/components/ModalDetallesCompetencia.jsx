import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Chip,
} from "@nextui-org/react";
import useTitulada from "../hooks/useTitulada";

export default function ModalDetallesCompetencia() {
  const {
    competencia,
    modalDetallesCompetencia,
    handleModalDetallesCompetencia,
  } = useTitulada();
  return (
    <>
      <Modal
        size="xl"
        classNames={{
          body: "pb-6",
          base: "m-auto mx-2",
        }}
        backdrop={"blur"}
        isOpen={modalDetallesCompetencia}
        onClose={handleModalDetallesCompetencia}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1  hei ">
                Detalles de la Competencia
              </ModalHeader>
              <ModalBody>
                <div>
                  <p className="font-bold">Descripcion General</p>
                  <p>{competencia?.descripcion_general}</p>
                </div>
                <div>
                  <p className="font-bold">Código Norma</p>
                  <p>{competencia?.codigo_norma}</p>
                </div>
                <div>
                  <p className="font-bold">Nombre Competencia</p>
                  <p>{competencia?.nombre_competencia}</p>
                </div>
                <div>
                  <p className="font-bold">Duración Máxima</p>
                  <p>{competencia?.duracion_maxima} horas</p>
                </div>
                <div className="space-y-3">
                  <p className="font-bold">Resultados de Aprendizaje</p>
                  <Table
                    hideHeader
                    isStriped
                    aria-label="Example static collection table"
                  >
                    <TableHeader>
                      <TableColumn>NOMBRE</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {competencia.resultados_aprendizaje?.map(
                        (resultado, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell className="uppercase">
                                {resultado}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
                    </TableBody>
                  </Table>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
