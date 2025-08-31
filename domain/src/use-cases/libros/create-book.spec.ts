import { createBookUseCase } from "./create-book";
import { Book } from "../../entities/libro";
import { describe, test, expect } from "vitest";


describe("CreateBookUseCase", () => {
  test("should create a book with given parameters", () => {
    const book: Book = createBookUseCase(
      "1",
      "El Principito",
      "Antoine de Saint-Exupéry",
      3
    );

    expect(book).toEqual({
      id: "1",
      title: "El Principito",
      author: "Antoine de Saint-Exupéry",
      state: "RETURNED", 
      availableCopies: 3,
    });
  });

  test("should set state as RETURNED by default", () => {
    const book = createBookUseCase("2", "1984", "George Orwell", 5);

    expect(book.state).toBe("RETURNED");
  });

  test("should create book with correct number of copies", () => {
    const copies = 10;
    const book = createBookUseCase("3", "Fahrenheit 451", "Ray Bradbury", copies);

    expect(book.availableCopies).toBe(copies);
  });
});