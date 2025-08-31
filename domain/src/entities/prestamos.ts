export interface Loan {
  readonly id: string;
  readonly userId: string;
  readonly bookId: string;
  readonly loanDate: Date;
  readonly returnDate: Date | null;
}

export function createLoan(
  id: string,
  userId: string,
  bookId: string,
  loanDate: Date = new Date(),
  returnDate: Date | null = null
): Loan {
  return { id, userId, bookId, loanDate, returnDate: null };
}