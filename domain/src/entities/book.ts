export interface Book {
  readonly id: string;
  readonly title: string;
  readonly author: string;
  state: 'IN_PROGRESS' | 'RETURNED' | 'OVERDUE';
  availableCopies: number;
}

export function createBook(
  id: string,
  title: string,
  author: string,
  state:  'IN_PROGRESS' | 'RETURNED' | 'OVERDUE',
  availableCopies: number
): Book {
  return { id, title, author, state, availableCopies };
}