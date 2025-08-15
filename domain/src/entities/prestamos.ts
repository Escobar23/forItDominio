export interface Prestamo {
  readonly id: string;
  readonly usuarioId: string;
  readonly libroId: string;
  readonly fechaPrestamo: Date;
  readonly fechaDevolucion: Date | null;
}

export function crearPrestamo(
  id: string,
  usuarioId: string,
  libroId: string,
  fechaPrestamo: Date = new Date()
): Prestamo {
  return { id, usuarioId, libroId, fechaPrestamo, fechaDevolucion: null };
}