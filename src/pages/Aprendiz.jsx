import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Chip,
  Image,
  Tooltip,
  Tabs,
  Tab,
  Calendar,
  CardBody,
  Divider,
  Button,
} from "@nextui-org/react";
import { EditIcon } from "../components/EditIcon";
import { parseDate } from "@internationalized/date";
import useAprendiz from "../hooks/useAprendiz";
import Spinner from "../components/Spinner";
import { formatCurrentDate, formatTime } from "../helpers/utils";
import ModalAprendiz from "../components/ModalAprendiz";
import { useLocation } from 'react-router-dom';
import TableTituladasAsociadasAprendiz from "../components/TableTituladasAsociadasAprendiz";


export default function Aprendiz() {
  const {
    cargando,
    aprendiz,
    ingreso,
    obtenerAprendiz,
    obtenerIngresosAprendiz,
    obtenerDocumento,
    handleModalEditarAprendiz,
    obtenerTituladasAprendiz
  } = useAprendiz();
  const dateCurrent = formatCurrentDate();

  const [date, setDate] = useState(dateCurrent); // Establece la fecha actual como estado inicial
  const params = useParams();
  const navigate = useNavigate()

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const tab = query.get('tab');

  const handleTabSelected = async (key) => {
    navigate(`?tab=${key}`)

    if(key == 'ingresos'){
      await obtenerIngresosAprendiz(date);
    }

    if(key == 'programas'){
      console.log('aposas')
      await obtenerTituladasAprendiz(aprendiz._id);
    }
  }

  useEffect(() => {
    const obtenerData = async () => {
      await obtenerAprendiz(params.id);
    };

    obtenerData();
  }, [params.id]); // Dependencia en el id del aprendiz para obtener los datos del aprendiz.

  useEffect(() => {
    if (aprendiz && aprendiz._id && tab == 'ingresos') {
      // Asegúrate de que el aprendiz y su _id estén definidos
      const obtenerIngresos = async () => {
        await obtenerIngresosAprendiz(date);
      };

      obtenerIngresos();
    }
  }, [date]);

  
  useEffect(() => {
    if (Object.keys(aprendiz).length > 0 && tab == 'programas') {
      // Asegúrate de que el aprendiz y su _id estén definidos
      const obtenerTituladas = async () => {
        await obtenerTituladasAprendiz();
      };

      obtenerTituladas();
    }
  }, [aprendiz]);

  if (Object.keys(aprendiz).length == 0) return <Spinner>Obteniendo Aprendiz...</Spinner>;

  return (
    <>
      <div className="md:w-1/2 lg:w-2/3 mx-auto space-y-5">
        <Card className="xl:w-3/5 mx-auto p-5 flex flex-col gap-5">
          <div className="flex gap-5">
            <div className="flex max-lg:flex-col items-center max-lg:text-center gap-4 justify-around w-full">
                <Image
                  width={150}
                  height={150}
                  alt="NextUI hero Image with delay"
                  src={aprendiz.imagen || "/notPhoto.svg"}
                />
              <div>
                <h1 className="mb-0 text-base">{aprendiz?.nombre}</h1>
                <p className="text-foreground-400">
                  <span className="text-foreground-500 font-semibold">ID: </span>
                  {aprendiz?.documento}
                </p>
                <p className="text-foreground-400">
                  <span className="text-foreground-500 font-semibold">
                    EMAIL:{" "}
                  </span>
                  {aprendiz?.email}
                </p>
                <p className="text-foreground-400">
                  <span className="text-foreground-500 font-semibold">CEL: </span>
                  {aprendiz?.telefono}
                </p>
                <p className="text-foreground-400">
                  <span className="text-foreground-500 font-semibold">RH: </span>
                  {aprendiz?.rh}
                </p>
                <div className="flex max-lg:items-center flex-col gap-3">
                  <Chip className="mt-2 rounded-none">{aprendiz?.estado}</Chip>
                  <Button
                    onClick={obtenerDocumento}
                    color="secondary"
                  >
                    Ver identificación
                  </Button>
                </div>
              </div>
            </div>
            <Tooltip
              color="secondary"
              content="Editar aprendiz"
            >
              <span className="ml-auto text-lg text-default-400 absolute right-5">
                <EditIcon />
              </span>
            </Tooltip>
          </div>
        </Card>
        <div className="flex flex-col items-center justify-center">
          <Tabs onSelectionChange={key=>handleTabSelected(key)} aria-label="Options">
            <Tab key="programas" title="Programas">
              <Card>
                <CardBody className="space-y-3">
                  <h2 className="font-bold text-start">Programas de Formación Asociados</h2>
                  <TableTituladasAsociadasAprendiz/>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="ingresos" title="Ingresos">
              <Card>
                <CardBody className="gap-5">
                  <Calendar
                    onChange={(e) => setDate(`${e.year}-${e.month}-${e.day}`)}
                    color={"success"}
                    defaultValue={parseDate(dateCurrent)}
                    showMonthAndYearPickers
                    aria-label="Date (Visible Month)"
                  />
                  <div>
                    <h1 className="text-center">Información de ingreso</h1>
                    {cargando && aprendiz ? (
                      <Spinner>Obteniendo información...</Spinner>
                    ) : (                      
                      <Card>
                        <CardBody className="space-y-2">
                          <div>
                            <p className="font-semibold">
                              Hora de ingreso:{" "}
                              <span className="font-normal">
                                {ingreso?.fechaIngreso
                                  ? formatTime(ingreso?.fechaIngreso)
                                  : "Ningun registro de ingreso"}
                              </span>
                            </p>
                            <Divider />
                            <p className="font-semibold">
                              Hora de salida:{" "}
                              <span className="font-normal">
                                {ingreso?.fechaSalida || ingreso?.fechaIngreso
                                  ? "Aprendiz en la sede"
                                  : "Ningun registro de salida"}
                              </span>
                            </p>
                            <Divider />
                          </div>
                          <div>
                            <h3 className="font-bold">Objetos ingresados</h3>
                            {ingreso?.objetos?.length > 0 ? (
                              ingreso?.objetos?.map((objeto, index) => (
                                <p key={index}>{objeto}</p>
                              ))
                            ) : (
                              <h3>No hay objetos ingresados</h3>
                            )}
                          </div>
                        </CardBody>
                      </Card>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="videos" title="Videos">
              <Card>
                <CardBody>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
      <ModalAprendiz />
    </>
  );
}
