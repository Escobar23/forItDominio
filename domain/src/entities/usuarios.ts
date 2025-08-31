export interface Usuario {
  id: string;
  name: string;
  email: string;
  hashPassword: string;
  rol: 'ADMIN' | 'LIBRARIAN' | 'USER';
}
export function crearUsuario(
  id: string,
  name: string,
  email: string,
  hashPassword: string,
  rol: 'ADMIN' | 'LIBRARIAN' | 'USER'
): Usuario {
  return { id, name, email, hashPassword, rol };
}
