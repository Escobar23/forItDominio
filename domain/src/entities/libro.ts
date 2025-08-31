export interface Libro {
  readonly id: string;
  readonly title: string;
  readonly author: string;
  state: 'IN_PROGRESS' | 'RETURNED' | 'OVERDUE';
  ejemplaresDisponibles: number;
}

export function crearLibro(
  id: string,
  title: string,
  author: string,
  state:  'IN_PROGRESS' | 'RETURNED' | 'OVERDUE',
  ejemplaresDisponibles: number
): Libro {
  return { id, title, author, state, ejemplaresDisponibles };
}