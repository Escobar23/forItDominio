import type { Book } from "../api/books";

type Props = {
  book: Book;
  onBorrow: (id: string) => void | Promise<void>;
  onReturn: (id: string) => void | Promise<void>;
};

export function BookCard({ book, onBorrow, onReturn }: Props) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <h3>{book.title}</h3>
      <p>Autor: {book.author}</p>
      <p>Estado: {book.state}</p>
      <p>Disponibles: {book.availableCopies}</p>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => onBorrow(book.id)}
          disabled={book.availableCopies <= 0}
        >
          Prestar
        </button>
        <button onClick={() => onReturn(book.id)}>Devolver</button>
      </div>
    </div>
  );
}
