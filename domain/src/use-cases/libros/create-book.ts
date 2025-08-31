// domain/src/use-cases/books/create-book.ts
import { Book, createBook } from "../../entities/libro";

export function createBookUseCase(
  id: string,
  title: string,
  author: string,
  availableCopies: number
): Book {
  return createBook(id, title, author, "RETURNED", availableCopies);
}