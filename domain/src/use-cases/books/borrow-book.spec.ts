import { borrowBookUseCase } from "./borrow-book";
import { Book } from "../../entities/book";
import { describe, test, expect } from "vitest";

describe("BorrowBookUseCase", () => {
  test("should mark book as IN_PROGRESS and reduce copies when available", () => {
    const book: Book = {
      id: crypto.randomUUID(),
      title: "El Principito",
      author: "Antoine de Saint-Exupéry",
      state: "RETURNED",
      availableCopies: 3,
    };

    const updatedBook = borrowBookUseCase(book);

    expect(updatedBook.state).toBe("IN_PROGRESS");
    expect(updatedBook.availableCopies).toBe(2);
  });

  test("should throw error if no copies are available", () => {
    const book: Book = {
      id: "2",
      title: "1984",
      author: "George Orwell",
      state: "RETURNED",
      availableCopies: 0,
    };

    expect(() => borrowBookUseCase(book)).toThrow("No copies available");
  });
});
