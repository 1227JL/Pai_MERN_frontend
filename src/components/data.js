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

const ESTADOSAPRENDIZ = [
  {name:"Convocatoria", uid: "convocatoria"},
  {name:"Etapa Lectiva", uid: "etapa lectiva"},
  {name:"Etapa Productiva", uid: "etapa productiva"},
  {name:"Formación Finalizada", uid: "formación finalizada"},
  {name:"Deserción", uid: "deserción"}
];

const ESTADOSINSTRUCTORES = [
  'Activo',
  'Inactivo',
  'Vacaciones'
]

const ESTADOSAMBIENTES = [
  'Disponible',
  'No Disponible',
  'En Mantenimiento'
]

const CONTRATOS = ['Término Indefinido', 'Término Fijo']
const AREAS = ['Deportes', 'Gastronomia', 'Sistemas', 'Gestion', 'Idiomas']
const BLOQUESAMBIENTE = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

const CATEGORIASAMBIENTE = [
  "Informática o de Computo",
  "Cocina",
  "Gestión",
  "Enfermería",
  "Idiomas",
  "Electricidad y Electrónica",
  "Construcción y Obras Civiles",
  "Agricultura y Agroindustria",
  "Automotriz y Mecánica Industrial",
  "Turismo y Hotelería",
  "Arte y Cultura",
  "Recursos Naturales y Medio Ambiente",
  "Seguridad y Salud en el Trabajo",
  "Diseño Gráfico y Multimedia",
  "Logística y Transporte",
  "Mecánica de Aviación",
  "Energías Renovables y Medio Ambiente",
  "Tecnologías de la Información y Comunicación (TIC)",
  "Finanzas y Contabilidad",
  "Salud y Belleza",
  "Gastronomía y Repostería"
]

const columns = [
  {name: "NOMBRE", uid: "nombre", sortable: true},
  {name: "CONTRATO", uid: "contrato", sortable: true},
  {name: "AREA", uid: "area", sortable: true},
  {name: "ESTADO", uid: "estado", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const columnsAprendiz = [
  {name: "NOMBRE", uid: "nombre", sortable: true},
  {name: "ESTADO", uid: "estado", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const columnsAmbiente = [
  {name: "BLOQUE", uid: "bloque", sortable: true},
  {name: "CATEGORIA", uid: "categoria", sortable: true},
  {name: "CAPACIDAD", uid: "capacidad", sortable: true},
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

export {columns, columnsAmbiente, statusOptions, columnsAprendiz, contratoOptions, PROGRAMAS, JORNADAS, MODALIDADES, ESTADOSTITULADAS, ESTADOSAPRENDIZ, ESTADOSINSTRUCTORES, ESTADOSAMBIENTES, CONTRATOS, AREAS, BLOQUESAMBIENTE, CATEGORIASAMBIENTE};
