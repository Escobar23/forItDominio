import { LoanService } from "./loan-service";
import { Loan } from "../entities/loans";
import { describe, test, expect } from "vitest";

describe("LoanService", () => {
  const baseLoan: Loan = {
    id: "1",
    bookId: "b1",
    userId: "u1",
    loanDate: new Date("2025-08-01"),
    returnDate: null
  };

  describe("isReturned", () => {
    test("should return false if loan is not returned", () => {
      expect(LoanService.isReturned(baseLoan)).toBe(false);
    });

    test("should return true if loan has returnDate", () => {
      const loan = { ...baseLoan, returnDate: new Date("2025-08-10") };
      expect(LoanService.isReturned(loan)).toBe(true);
    });
  });

  describe("toReturn", () => {
    test("should set returnDate if loan is not returned", () => {
      const updated = LoanService.toReturn(baseLoan);
      expect(updated.returnDate).toBeInstanceOf(Date);
    });

    test("should throw if loan is already returned", () => {
      const loan = { ...baseLoan, returnDate: new Date("2025-08-10") };
      expect(() => LoanService.toReturn(loan)).toThrow("El libro ya fue devuelto");
    });
  });

  describe("isExpired", () => {
    test("should return false if loan is already returned", () => {
      const loan = { ...baseLoan, returnDate: new Date("2025-08-10") };
      expect(LoanService.isExpired(loan)).toBe(false);
    });

    test("should return false if loan is within allowedDays", () => {
      const loan = { ...baseLoan, loanDate: new Date() }; // hoy mismo
      expect(LoanService.isExpired(loan, 14)).toBe(false);
    });

    test("should return true if loan is past allowedDays", () => {
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 20); // hace 20 días
      const loan = { ...baseLoan, loanDate: oldDate };
      expect(LoanService.isExpired(loan, 14)).toBe(true);
    });
  });

  describe("diasAtraso", () => {
    test("should return 0 if loan is not expired", () => {
      const loan = { ...baseLoan, loanDate: new Date() };
      expect(LoanService.diasAtraso(loan, 14)).toBe(0);
    });

    test("should return number of overdue days if loan is expired", () => {
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 20); // hace 20 días
      const loan = { ...baseLoan, loanDate: oldDate };
      expect(LoanService.diasAtraso(loan, 14)).toBeGreaterThan(0);
    });

    test("should return exact overdue days (rounded up)", () => {
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 16); // hace 16 días
      const loan = { ...baseLoan, loanDate: oldDate };
      // 16 - 14 = 2 días de atraso
      expect(LoanService.diasAtraso(loan, 14)).toBe(2);
    });
  });
});
