import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Button,
} from "@nextui-org/react";
import useAprendiz from "../hooks/useAprendiz";

export default function TableTituladasAsociadasAprendiz() {
  const { tituladas } = useAprendiz();
  return (
    <Table aria-label="Example empty table">
      <TableHeader>
        <TableColumn>PROGRAMA</TableColumn>
        <TableColumn>FICHA</TableColumn>
        <TableColumn className="max-sm:hidden">TITULO</TableColumn>
        <TableColumn className="max-sm:hidden">AMBIENTE</TableColumn>
        <TableColumn className="max-sm:hidden">INSTRUCTOR A CARGO</TableColumn>
        <TableColumn>VER</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No hay programas asociados"}>
        {tituladas.map((titulada) => (
          <TableRow key={titulada._id}>
            <TableCell>{titulada.programa}</TableCell>
            <TableCell>{titulada.ficha}</TableCell>
            <TableCell className="max-sm:hidden">{titulada.titulo}</TableCell>
            <TableCell className="max-sm:hidden">{`${titulada.ambiente.bloque}-${titulada.ambiente.numero}`}</TableCell>
            <TableCell className="max-sm:hidden">{titulada.instructores[0].instructor.nombre}</TableCell>
            <TableCell>
              <Button
                href={`/consultar/tituladas/${titulada.ficha}`}
                as={Link}
                color="primary"
                showAnchorIcon
                variant="solid"
              >
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
