export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  contraseñaHash: string;
  rol: 'ADMIN' | 'BIBLIOTECARIO' | 'USUARIO';
}
export function crearUsuario(
  id: string,
  nombre: string,
  email: string,
  contraseñaHash: string,
  rol: 'ADMIN' | 'BIBLIOTECARIO' | 'USUARIO'
): Usuario {
  return { id, nombre, email, contraseñaHash, rol };
}
