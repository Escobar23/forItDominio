import { Loan } from "../../entities/loans";

export function createLoanUseCase(
  id: string,
  bookId: string,
  userId: string,
  loanDate: Date = new Date()
): Loan {
  return {
    id,
    bookId,
    userId,
    loanDate,
    returnDate: null,
  };
}