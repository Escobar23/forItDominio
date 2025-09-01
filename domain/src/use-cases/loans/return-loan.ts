import { Loan } from "../../entities/loans";
import { LoanService } from "../../services/loan-service";

export function returnLoanUseCase(loan: Loan): Loan {
  return LoanService.toReturn(loan);
}