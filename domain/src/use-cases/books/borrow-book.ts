import { Book } from "../../entities/book";

export function borrowBookUseCase(book: Book): Book {
  if (book.availableCopies <= 0) {
    throw new Error("No copies available");
  }

  return {
    ...book,
    state: "IN_PROGRESS",
    availableCopies: book.availableCopies - 1,
  };
}