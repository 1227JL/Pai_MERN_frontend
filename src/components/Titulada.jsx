import { Link, Chip } from "@nextui-org/react";
import React from "react";

export default function Titulada({ titulada }) {
  return (
    <div
      key={titulada?._id}
      className="flex gap-2 flex-col shadow-small p-5 rounded-xl"
    >
      <div className="grid grid-cols-1 gap-1">
        <p className="text-slate-600 font-bold uppercase">
          {titulada?.programa}
        </p>
        <p className="text-black-300 font-semibold md:col-span-01">{titulada?.ficha}</p>

        <p className="text-black-300 font-semibold">{titulada?.tipo}</p>
        <p className="text-slate-600 font-semibold">
          Jornada: {titulada?.jornada}
        </p>

        <p className="text-slate-600 font-semibold">
          Ambiente: {titulada?.ambiente?.bloque}-{titulada?.ambiente?.numero}
        </p>
      </div>
      <Chip>{titulada?.estado}</Chip>
      <Link
        className="mx-auto"
        isBlock
        showAnchorIcon
        href={`/consultar/tituladas/${titulada?.ficha}`}
        color="secondary"
      >
        Ver Titulada
      </Link>
    </div>
  );
}
