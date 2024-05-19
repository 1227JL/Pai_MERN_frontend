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
import useTitulada from "../hooks/useTitulada";
import Spinner from "./Spinner";

export default function TableInstructoresAsociadasTitulada() {
  const { instructores } = useTitulada();
  
  if(instructores.length == 0) return <Spinner>Obteniendo instructores...</Spinner>
  
  return (
    <Table aria-label="Example empty table">
      <TableHeader>
        <TableColumn>NOMBRE</TableColumn>
        <TableColumn>VER</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No hay instructores asociados"}>
        {instructores.map((instructor) => (
          <TableRow className={instructor.aCargo ? "bg-foreground-100" : ""} key={instructor._id}>
            <TableCell>{instructor.nombre}</TableCell>
            <TableCell>
              <Button
                href={`/consultar/instructores/${instructor.identificacion}`}
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
