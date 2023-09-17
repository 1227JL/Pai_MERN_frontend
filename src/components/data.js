const PROGRAMAS = [
  { name: "Tecnologo"},
  { name: "Técnico"},
  { name: "Curso Corto"}
];

const JORNADAS = [
  { name: "Mañana"},
  { name: "Tarde"},
  { name: "Noche"}
];

const MODALIDADES = [
  { name: "Presencial"},
  { name: "Virtual"}
];

const ESTADOSTITULADAS = [
  "Convocatoria",
  "Etapa Lectiva",
  "Etapa Productiva",
  "Formación Finalizada",
];

const CONTRATOS = ['Término Indefinido', 'Término Fijo']
const AREAS = ['Deportes', 'Gastronomia', 'Sistemas', 'Gestion', 'Idiomas']

const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NOMBRE", uid: "nombre", sortable: true},
  {name: "AREA", uid: "area", sortable: true},
  {name: "EMAIL", uid: "email"},
  {name: "ESTADO", uid: "estado", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Activo", uid: "activo"},
  {name: "Inactivo", uid: "inactivo"},
  {name: "Vacaciones", uid: "vacaciones"},
];

export {columns, statusOptions, PROGRAMAS, JORNADAS, MODALIDADES, ESTADOSTITULADAS, CONTRATOS, AREAS};
