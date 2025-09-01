import { Loan } from "../../entities/loans";
import { LoanService } from "../../services/loan-service";

export function checkLoanExpirationUseCase(loan: Loan, allowedDays: number = 14): boolean {
  return LoanService.isExpired(loan, allowedDays);
}