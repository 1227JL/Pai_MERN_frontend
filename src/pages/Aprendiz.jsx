import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Chip,
  Image,
  Tooltip,
  Tabs,
  Tab,
  Calendar,
  CardHeader,
  CardBody,
  Divider,
} from "@nextui-org/react";
import { EditIcon } from "../components/EditIcon";
import { parseDate } from "@internationalized/date";
import useAprendiz from "../hooks/useAprendiz";
import Spinner from "../components/Spinner";
import { formatCurrentDate } from "../helpers/utils";

export default function Aprendiz() {
  const { cargando, aprendiz, obtenerAprendiz } = useAprendiz();
  const [date, setDate] = useState({
    day: "",
    month: "",
    year: "",
  });
  const params = useParams();
  const dateCurrent = formatCurrentDate();
  console.log(dateCurrent);

  useEffect(() => {
    return () => obtenerAprendiz(params?.id);
  }, []);

  if (cargando) return <Spinner>Obteniendo Aprendiz...</Spinner>;

  return (
    <div className="space-y-5">
      <Card className="p-5 flex flex-col gap-5">
        <div className="flex flex-col items-center text-center sm:text-start sm:items-start sm:flex-row gap-5">
          <div className="max-sm:order-2">
            <Image
              width={150}
              height={150}
              alt="NextUI hero Image with delay"
              src={"/notPhoto.svg"}
            />
          </div>
          <div className="max-sm:order-3">
            <h1 className="mb-0 text-base">{aprendiz?.nombre}</h1>
            <p className="text-foreground-400">
              <span className="text-foreground-500 font-semibold">ID: </span>
              {aprendiz?.documento}
            </p>
            <p className="text-foreground-400">
              <span className="text-foreground-500 font-semibold">EMAIL: </span>
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
            <Chip className="mt-2 rounded-none">{aprendiz?.estado}</Chip>
          </div>
          <Tooltip
            className="flex max-sm:order-1"
            color="secondary"
            content="Editar aprendiz"
          >
            <span className="ml-auto text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon />
            </span>
          </Tooltip>
        </div>
      </Card>
      <div>
        <Tabs className="mx-auto sm:mx-0" aria-label="Options">
          <Tab key="ingresos" title="Ingresos">
            <Card>
              <CardBody className="md:flex-row gap-5">
                <Calendar
                  onChange={(e) => {
                    setDate({
                      day: e.day,
                      month: e.month,
                      year: e.year,
                    });
                  }}
                  color={"success"}
                  defaultValue={parseDate(dateCurrent)}
                  className={"md:w-1/3"}
                  showMonthAndYearPickers
                  aria-label="Date (Visible Month)"
                />
                <div className="md:w-2/3">
                  <h1 className="text-center">Información de ingreso</h1>
                  <Card>
                    <CardBody className="space-y-2">
                      <div>
                        <p className="font-semibold">
                          Hora de ingreso: <span className="font-normal">6:00pm</span>
                        </p>
                        <Divider />
                        <p className="font-semibold">
                          Hora de salida: <span className="font-normal">11:45am</span>
                        </p>
                      </div>
                      <div>
                        <h3 className="font-bold">Objetos ingresados</h3>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="music" title="Music">
            <Card>
              <CardBody>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
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
  );
}
