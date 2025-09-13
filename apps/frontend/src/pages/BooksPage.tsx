import { useEffect, useState } from "react";
import { BooksApi, Book } from "../api/books";
import { BookCard } from "../components/BookCard";
import { useAuth } from "../auth/useAuth";

export function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const data = await BooksApi.list();
        setBooks(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateBook = (updated: Book) =>
    setBooks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));

  if (loading) return <p style={{ padding: 24 }}>Cargando libros...</p>;

  return (
    <div style={{ padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <h2>Biblioteca</h2>
          <small>Hola, {user?.name} ({user?.rol})</small>
        </div>
        <button onClick={logout}>Salir</button>
      </header>

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))" }}>
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onBorrow={async (id) => {
              const updated = await BooksApi.borrow(id);
              updateBook(updated);
            }}
            onReturn={async (id) => {
              const updated = await BooksApi.return(id);
              updateBook(updated);
            }}
          />
        ))}
      </div>
    </div>
  );
}
