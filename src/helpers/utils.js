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
