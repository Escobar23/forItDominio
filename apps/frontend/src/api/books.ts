import { api } from "./client";

export type Book = {
  id: string;
  title: string;
  author: string;
  state: "IN_PROGRESS" | "RETURNED" | "OVERDUE";
  availableCopies: number;
};

export const BooksApi = {
  list: () => api.get<Book[]>("/books"),
  borrow: (id: string) => api.post<Book>(`/books/${id}/borrow`),
  return: (id: string) => api.post<Book>(`/books/${id}/return`),
};

export type LoginResponse = {
  mensaje: string;
  user: {
    id: string;
    username: string;
    name: string;
    email: string;
    rol: "ADMIN" | "LIBRARIAN" | "USER";
  };
};

export const AuthApi = {
  login: (email: string, password: string) =>
    api.post<LoginResponse>("/login", { email, password }),
};
