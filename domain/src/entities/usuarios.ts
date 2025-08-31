export interface User {
  id: string;
  name: string;
  email: string;
  hashPassword: string;
  rol: 'ADMIN' | 'LIBRARIAN' | 'USER';
}
export function createUser(
  id: string,
  name: string,
  email: string,
  hashPassword: string,
  rol: 'ADMIN' | 'LIBRARIAN' | 'USER'
): User {
  return { id, name, email, hashPassword, rol };
}
