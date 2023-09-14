import { Fragment, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import quitarTildes from '../helpers/quitarTildes'
import useIntructor from '../hooks/useIntructor'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const BusquedaInstructores = () => {
    const { buscador, handleBuscador, instructores } = useIntructor()

    const [ busqueda, setBusqueda] = useState('')
      
    const instructoresFiltrador = busqueda === '' ? [] : instructores.filter(instructor => {
        const nombreSinTildes = quitarTildes(instructor.name).toLowerCase();
        const busquedaSinTildes = quitarTildes(busqueda).toLowerCase();
        return nombreSinTildes.includes(busquedaSinTildes);
    });

    return (
        <Transition.Root show={ buscador } as={Fragment} afterLeave={()=>setBusqueda('') }>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto mt-20 p-4 sm:p-20 md:p-20" onClose={ handleBuscador }>
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
                    onChange={(instructor) => (window.location = `/consultar/instructores/${instructor.name}`)}
                >
                    <div className="relative">
                        <Combobox.Input
                            className="h-12 w-full border-0 bg-transparent pl-4 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm outline-none"
                            placeholder="Busca el Programa de Formación"
                            onChange={e=>setBusqueda(e.target.value)}
                        />
                    </div>

                    {instructoresFiltrador?.length > 0 && (
                        <Combobox.Options static className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                            {instructoresFiltrador.map(instructor => (
                                <Combobox.Option
                                    key={instructor.name}
                                    value={instructor}
                                    className={({active}) => classNames('cursor-default select-none px-4 py-2', active && 'bg-primary-100 text-white hover:cursor-pointer transition-color') }
                                >
                                    {instructor.name}
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

export default BusquedaInstructores
  