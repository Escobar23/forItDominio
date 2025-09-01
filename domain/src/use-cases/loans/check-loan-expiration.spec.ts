import { describe, test, expect } from "vitest";
import { checkLoanExpirationUseCase } from "./check-loan-expiration";
import { Loan } from "../../entities/loans";

describe("checkLoanExpirationUseCase", () => {
  test("should return false if loan is not expired", () => {
    const recentLoan: Loan = {
      id: "4",
      bookId: "book-111",
      userId: "user-222",
      loanDate: new Date(),
      returnDate: null,
    };

    expect(checkLoanExpirationUseCase(recentLoan)).toBe(false);
  });

  test("should return true if loan is expired", () => {
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 30);

    const expiredLoan: Loan = {
      id: "5",
      bookId: "book-333",
      userId: "user-444",
      loanDate: oldDate,
      returnDate: null,
    };

    expect(checkLoanExpirationUseCase(expiredLoan)).toBe(true);
  });

  test("should return false if loan is already returned", () => {
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 30);

    const returnedLoan: Loan = {
      id: "6",
      bookId: "book-555",
      userId: "user-666",
      loanDate: oldDate,
      returnDate: new Date(),
    };

    expect(checkLoanExpirationUseCase(returnedLoan)).toBe(false);
  });
});
