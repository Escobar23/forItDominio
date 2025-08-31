import { BookService } from "./book-service";
import { Book } from "../entities/book";
import { describe, test, expect } from "vitest";

describe("BookService", () => {
  const mockBook: Book = {
    id: "1",
    title: "El Principito",
    author: "Antoine de Saint-Exupéry",
    availableCopies: 2,
    state: "RETURNED"
  };

  describe("hasAvailability", () => {
    test("should return true if book has copies", () => {
      expect(BookService.hasAvailability(mockBook)).toBe(true);
    });

    test("should return false if book has no copies", () => {
      const book = { ...mockBook, availableCopies: 0 };
      expect(BookService.hasAvailability(book)).toBe(false);
    });
  });

  describe("toLend", () => {
    test("should decrease availableCopies by 1 when lending a book", () => {
      const updated = BookService.toLend(mockBook);
      expect(updated.availableCopies).toBe(mockBook.availableCopies - 1);
    });

    test("should throw an error if no copies are available", () => {
      const book = { ...mockBook, availableCopies: 0 };
      expect(() => BookService.toLend(book)).toThrow("No hay ejemplares disponibles");
    });
  });

  describe("toReturn", () => {
    test("should increase availableCopies by 1 when returning a book", () => {
      const updated = BookService.toReturn(mockBook);
      expect(updated.availableCopies).toBe(mockBook.availableCopies + 1);
    });
  });

  describe("validateData", () => {
    test("should not throw if valid data is provided", () => {
      expect(() =>
        BookService.validateData({
          title: "Nuevo libro",
          author: "Autor",
          availableCopies: 1
        })
      ).not.toThrow();
    });

    test("should throw if title is missing", () => {
      expect(() =>
        BookService.validateData({
          author: "Autor",
          availableCopies: 1
        })
      ).toThrow("Título es requerido");
    });

    test("should throw if author is missing", () => {
      expect(() =>
        BookService.validateData({
          title: "Un libro",
          availableCopies: 1
        })
      ).toThrow("Autor es requerido");
    });

    test("should throw if availableCopies is undefined", () => {
      expect(() =>
        BookService.validateData({
          title: "Un libro",
          author: "Autor"
        })
      ).toThrow("Ejemplares disponibles debe ser mayor o igual a 0");
    });

    test("should throw if availableCopies is negative", () => {
      expect(() =>
        BookService.validateData({
          title: "Un libro",
          author: "Autor",
          availableCopies: -1
        })
      ).toThrow("Ejemplares disponibles debe ser mayor o igual a 0");
    });
  });
});
