import { Link } from '@nextui-org/react';
import React from 'react'

export default function Titulada({titulada}) {
  return (
    <div key={titulada._id} className='flex flex-col shadow-small p-5 rounded-xl'>
      <div className='flex flex-col items-center lg:flex-row lg:justify-between'>
        <p className='text-slate-600 font-bold uppercase text-center'>{titulada?.programa}</p>
        <p className='text-black-300 font-semibold'>{titulada?.ficha}</p>
      </div>
      <div className="flex flex-col items-center lg:flex-row lg:justify-between">
        <p className='text-black-300 font-semibold'>{titulada?.tipo}</p>
        <p className='text-slate-600 font-semibold'>Jornada: <span className='font-normal'>{titulada?.jornada}</span></p>
      </div>
      <div className="flex flex-col items-center lg:flex-row lg:justify-between">
        <p className='text-slate-600 font-semibold'>Ambiente: <span className='font-normal'>{titulada?.ambiente?.bloque}-{titulada?.ambiente?.numero}</span></p>
        <p className={`lg:ml-auto ${(() => {
          switch (titulada?.estado) {
            case 'Etapa Lectiva':
              return 'text-primary-100';
            case 'Etapa Productiva':
              return 'text-amber-400';
            case 'Formación Finalizada':
              return 'text-red-500';
            default:
              return 'text-black-300';
          }
        })()} font-semibold`}>{titulada?.estado}</p>
      </div>
      <Link className='mx-auto' isBlock showAnchorIcon href={`/consultar/tituladas/${titulada?.ficha}`} color="secondary">
        Ver Titulada
      </Link>
    </div>
  )
}
