import { Book } from '../entities/book';

export const BookService = {
  hasAvailability: (libro: Book): boolean => {
    return libro.availableCopies > 0;
  },

  toLend: (book: Book): Book => {
    if (!BookService.hasAvailability(book)) {
      throw new Error('No hay ejemplares disponibles');
    }
    return {
      ...book,
      availableCopies: book.availableCopies - 1
    };
  },

  toReturn: (book: Book): Book=> {
    return {
      ...book,
      availableCopies: book.availableCopies + 1
    };
  },

  validateData: (datos: Partial<Book>): void => {
    if (!datos.title?.trim()) {
      throw new Error('Título es requerido');
    }
    if (!datos.author?.trim()) {
      throw new Error('Autor es requerido');
    }
    if (datos.availableCopies === undefined || datos.availableCopies < 0) {
      throw new Error('Ejemplares disponibles debe ser mayor o igual a 0');
    }
  }
};