import { Fragment, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import useTitulada from '../hooks/useTitulada'
import { quitarTildes } from '../helpers/Utils'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const BusquedaTituladas = () => {
    const { buscador, handleBuscador, tituladas } = useTitulada()

    const [ busqueda, setBusqueda] = useState('')
      
    const tituladasFiltradas = busqueda === '' ? [] : tituladas.filter(titulada => {
        const programaSinTildes = quitarTildes(titulada.programa).toLowerCase();
        const busquedaSinTildes = quitarTildes(busqueda).toLowerCase();
        return programaSinTildes.includes(busquedaSinTildes) || titulada.ficha.toString().includes(busquedaSinTildes);
    });

    return (
        <Transition.Root show={ buscador } as={Fragment} afterLeave={()=>setBusqueda('') }>
            <Dialog as="div" className="fixed inset-0 z-20 overflow-y-auto mt-20 p-4 sm:p-20 md:p-20" onClose={ handleBuscador }>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                <Combobox
                    as="div"
                    className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
                    onChange={(titulada) => (window.location = `/consultar/tituladas/${titulada.ficha}`)}
                >
                    <div className="relative">
                        <Combobox.Input
                            className="h-12 w-full border-0 bg-transparent pl-4 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm outline-none"
                            placeholder="Busca el Programa de Formación"
                            onChange={e=>setBusqueda(e.target.value)}
                        />
                    </div>

                    {tituladasFiltradas?.length > 0 && (
                        <Combobox.Options static className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                            {tituladasFiltradas.map(titulada => (
                                <Combobox.Option
                                    key={titulada._id}
                                    value={titulada}
                                    className={({active}) => classNames('cursor-default select-none px-4 py-2', active && 'bg-primary-100 text-white hover:cursor-pointer transition-color') }
                                >
                                    <div className='flex justify-between'>
                                        <p>{titulada.programa}</p>
                                        <p>{titulada.ficha}</p>
                                    </div>
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    )}
                    </Combobox>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    )
}

export default BusquedaTituladas
  