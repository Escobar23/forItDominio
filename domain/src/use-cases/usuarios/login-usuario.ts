import { User } from "../../entities/usuarios";

export interface UsuarioRepository {
  findByEmail(email: string): Promise<User | null>;
}

export class LoginUsuario {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute(email: string, password: string): Promise<User> {
    const user = await this.usuarioRepository.findByEmail(email);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // comparación básica (en un caso real usaríamos bcrypt)
    if (user.hashPassword !== password) {
      throw new Error("Contraseña incorrecta");
    }

    return user;
  }
}