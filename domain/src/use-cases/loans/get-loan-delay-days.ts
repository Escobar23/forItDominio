import { Loan } from "../../entities/loans";
import { LoanService } from "../../services/loan-service";

export function getLoanDelayDaysUseCase(loan: Loan, allowedDays: number = 14): number {
  return LoanService.diasAtraso(loan, allowedDays);
}