import { Usuario } from "../../entities/usuarios";

export interface UsuarioRepository {
  findByEmail(email: string): Promise<Usuario | null>;
}

export class LoginUsuario {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute(email: string, password: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findByEmail(email);
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }

    // comparación básica (en un caso real usaríamos bcrypt)
    if (usuario.contraseñaHash !== password) {
      throw new Error("Contraseña incorrecta");
    }

    return usuario;
  }
}