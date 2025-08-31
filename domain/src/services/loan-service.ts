import { Loan } from "../entities/loans.js";

export const LoanService = {
  isReturned: (loan: Loan): boolean => {
    return loan.returnDate !== null;
  },

  toReturn: (loan: Loan): Loan => {
    if (LoanService.isReturned(loan)) {
      throw new Error('El libro ya fue devuelto');
    }
    return {
      ...loan,
      returnDate: new Date()
    };
  },

  isExpired: (loan: Loan, allowedDays: number = 14): boolean => {
    if (LoanService.isReturned(loan)) {
      return false;
    }
    
    const today = new Date();
    const expirationDate = new Date(loan.loanDate);
    expirationDate.setDate(expirationDate.getDate() + allowedDays);
    
    return today > expirationDate;
  },

  diasAtraso: (loan: Loan, allowedDays: number = 14): number => {
    if (!LoanService.isExpired(loan, allowedDays)) {
      return 0;
    }
    
    const today = new Date();
    const expirationDate = new Date(loan.loanDate);
    expirationDate.setDate(expirationDate.getDate() + allowedDays);
    
    const difference = today.getTime() - expirationDate.getTime();
    return Math.ceil(difference / (1000 * 60 * 60 * 24));
  }
};
