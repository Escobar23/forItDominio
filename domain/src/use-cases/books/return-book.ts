import { Book } from "../../entities/book";

export function returnBookUseCase(book: Book): Book {
  if (book.state !== "IN_PROGRESS") {
    throw new Error("Book was not borrowed");
  }

  return {
    ...book,
    state: "RETURNED",
    availableCopies: book.availableCopies + 1,
  };
}