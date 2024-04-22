import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Chip
} from "@nextui-org/react";
import useTitulada from "../hooks/useTitulada";
import { EyeIcon } from "./EyeIcon";
import { Link } from "react-router-dom";

export default function TableCompetencias() {
  const { titulada, handleModalDetallesCompetencia } = useTitulada();

  const { competencias } = titulada;

  return (
    <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NOMBRE</TableColumn>
        <TableColumn>DURACIÓN MÁXIMA</TableColumn>
        <TableColumn>CÓDIGO NORMA</TableColumn>
        <TableColumn>ESTADO</TableColumn>
        <TableColumn>VER</TableColumn>
      </TableHeader>
      <TableBody>
        {competencias?.map((competencia) => (
          <TableRow key={competencia?._id}>
            <TableCell className="uppercase">{competencia?.descripcion_general}</TableCell>
            <TableCell>{`${competencia?.duracion_maxima} horas`}</TableCell>
            <TableCell>{competencia?.codigo_norma}</TableCell>
            <TableCell>
              <Chip>{competencia?.estado}</Chip>
            </TableCell>
            <TableCell>
              <Tooltip content="Detalles de la competencia">
                <Link to={`?competencia=${competencia._id}`} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon/>
                </Link>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
