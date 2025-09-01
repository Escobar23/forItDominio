import { describe, test, expect } from "vitest";
import { getLoanDelayDaysUseCase } from "./get-loan-delay-days";
import { Loan } from "../../entities/loans";

describe("getLoanDelayDaysUseCase", () => {
  test("should return 0 if loan is not expired", () => {
    const recentLoan: Loan = {
      id: "7",
      bookId: "book-777",
      userId: "user-888",
      loanDate: new Date(),
      returnDate: null,
    };

    expect(getLoanDelayDaysUseCase(recentLoan)).toBe(0);
  });

  test("should return number of days late if expired", () => {
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 20); // hace 20 días

    const expiredLoan: Loan = {
      id: "8",
      bookId: "book-999",
      userId: "user-000",
      loanDate: oldDate,
      returnDate: null,
    };

    expect(getLoanDelayDaysUseCase(expiredLoan, 14)).toBeGreaterThan(0);
  });

  test("should return 0 if loan already returned", () => {
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 20);

    const returnedLoan: Loan = {
      id: "9",
      bookId: "book-101",
      userId: "user-202",
      loanDate: oldDate,
      returnDate: new Date(),
    };

    expect(getLoanDelayDaysUseCase(returnedLoan, 14)).toBe(0);
  });
});
