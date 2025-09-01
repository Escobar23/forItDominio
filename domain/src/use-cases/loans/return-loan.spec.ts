import { describe, test, expect } from "vitest";
import { returnLoanUseCase } from "./return-loan";
import { Loan } from "../../entities/loans";

describe("returnLoanUseCase", () => {
  test("should set returnDate if loan not returned", () => {
    const loan: Loan = {
      id: "2",
      bookId: "book-789",
      userId: "user-001",
      loanDate: new Date(),
      returnDate: null,
    };

    const returnedLoan = returnLoanUseCase(loan);

    expect(returnedLoan.returnDate).toBeInstanceOf(Date);
  });

  test("should throw error if loan already returned", () => {
    const loan: Loan = {
      id: "3",
      bookId: "book-222",
      userId: "user-333",
      loanDate: new Date(),
      returnDate: new Date(),
    };

    expect(() => returnLoanUseCase(loan)).toThrow("El libro ya fue devuelto");
  });
});