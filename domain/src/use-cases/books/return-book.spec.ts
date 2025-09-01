import { returnBookUseCase } from "./return-book";
import { Book } from "../../entities/book";
import { describe, test, expect } from "vitest";

describe("ReturnBookUseCase", () => {
  test("should mark book as RETURNED and increase copies", () => {
    const book: Book = {
      id: "3",
      title: "Fahrenheit 451",
      author: "Ray Bradbury",
      state: "IN_PROGRESS",
      availableCopies: 1,
    };

    const updatedBook = returnBookUseCase(book);

    expect(updatedBook.state).toBe("RETURNED");
    expect(updatedBook.availableCopies).toBe(2);
  });

  test("should not allow returning if book was not borrowed", () => {
    const book: Book = {
      id: "4",
      title: "Orgullo y prejuicio",
      author: "Jane Austen",
      state: "RETURNED",
      availableCopies: 5,
    };

    expect(() => returnBookUseCase(book)).toThrow("Book was not borrowed");
  });
});