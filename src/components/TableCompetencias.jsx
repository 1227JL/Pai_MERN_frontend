import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip} from "@nextui-org/react";
import useTitulada from "../hooks/useTitulada";

export default function TableCompetencias() {

    const { titulada } = useTitulada()
    console.log(titulada)
  return (
    <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NOMBRE</TableColumn>
        <TableColumn>SERIAL</TableColumn>
        <TableColumn>ESTADO</TableColumn>
      </TableHeader>
      <TableBody>
        {titulada.competencias.map(competencia => (
            <TableRow key={competencia._id}>
                <TableCell>{competencia.descripcion_general}</TableCell>
                <TableCell>{competencia.codigo_norma}</TableCell>
                <TableCell>
                    <Chip>{competencia.estado}</Chip>
                </TableCell>
            </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
