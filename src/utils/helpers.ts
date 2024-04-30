export const calcularEdad = (fechaNacimiento: Date): number => {
  // Obtener la fecha actual
  const fechaActual = new Date();

  // Convertir las fechas a milisegundos
  const milisegundosNacido = fechaNacimiento.getTime();
  const milisegundosActual = fechaActual.getTime();

  // Calcular la diferencia en milisegundos
  const diferenciaMilisegundos = milisegundosActual - milisegundosNacido;

  // Convertir la diferencia a años
  const edadEnAnos = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 365));

  // Devolver la edad
  return edadEnAnos;
}