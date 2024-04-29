export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export  function quitarTildes(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function agregarDominioSena(email) {
  if (email.includes('@')) {
    // Si el email contiene '@', elimina todo después del arroba y luego concatena '@soy.sena.edu.co'.
    const nombreUsuario = email.split('@')[0];
    return nombreUsuario + '@soy.sena.edu.co';
  } else {
    // Si el email no contiene '@', simplemente concatena '@soy.sena.edu.co'.
    return email + '@soy.sena.edu.co';
  }
}

export function formatCurrentDate() {
  // Obtiene la fecha actual
  const now = new Date();

  // Obtiene el año, mes y día de la fecha
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // getMonth() retorna mes del 0 (enero) al 11 (diciembre), por eso se suma 1
  const day = now.getDate();

  // Formatea el mes y el día para asegurar el formato de dos dígitos
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  // Combina las partes en el formato deseado
  return `${year}-${formattedMonth}-${formattedDay}`;
}


export function formatTime(isoString) {
  const date = new Date(isoString);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // El '0' se convierte en '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}:${minutes} ${ampm}`;
}