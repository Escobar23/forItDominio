export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  hashPassword: string;
  rol: 'ADMIN' | 'LIBRARIAN' | 'USER';
}
export function createUser(
  id: string,
  username: string,
  name: string,
  email: string,
  hashPassword: string,
  rol: 'ADMIN' | 'LIBRARIAN' | 'USER'
): User {
  return { id, name, username, email, hashPassword, rol };
}
