import { describe, test, expect } from "vitest";
import { createLoanUseCase } from "./create-loan";
import { Loan } from "../../entities/loans";

describe("createLoanUseCase", () => {
  test("should create a loan with null returnDate", () => {
    const loan: Loan = createLoanUseCase("1", "book-123", "user-456");

    expect(loan.id).toBe("1");
    expect(loan.bookId).toBe("book-123");
    expect(loan.userId).toBe("user-456");
    expect(loan.returnDate).toBeNull();
    expect(loan.loanDate).toBeInstanceOf(Date);
  });
});