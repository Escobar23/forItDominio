export interface Prestamo {
  readonly id: string;
  readonly userId: string;
  readonly bookId: string;
  readonly loanDate: Date;
  readonly returnDate: Date | null;
}

export function crearPrestamo(
  id: string,
  userId: string,
  bookId: string,
  loanDate: Date = new Date(),
  returnDate: Date | null = null
): Prestamo {
  return { id, userId, bookId, loanDate, returnDate: null };
}