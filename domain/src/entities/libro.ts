export interface Libro {
  readonly id: string;
  readonly titulo: string;
  readonly autor: string;
  readonly isbn: string;
  ejemplaresDisponibles: number;
}

export function crearLibro(
  id: string,
  titulo: string,
  autor: string,
  isbn: string,
  ejemplaresDisponibles: number
): Libro {
  return { id, titulo, autor, isbn, ejemplaresDisponibles };
}