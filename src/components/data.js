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
  {name: "NOMBRE", uid: "nombre", sortable: true},
  {name: "CONTRATO", uid: "contrato", sortable: true},
  {name: "AREA", uid: "area", sortable: true},
  {name: "ESTADO", uid: "estado", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Activo", uid: "activo"},
  {name: "Inactivo", uid: "inactivo"},
  {name: "Vacaciones", uid: "vacaciones"},
];

const contratoOptions = [
  {name: "Término Indefinido", uid: "termino indefinido"},
  {name: "Término Fijo", uid: "termino fijo"},
];

export {columns, statusOptions, contratoOptions, PROGRAMAS, JORNADAS, MODALIDADES, ESTADOSTITULADAS, CONTRATOS, AREAS};
