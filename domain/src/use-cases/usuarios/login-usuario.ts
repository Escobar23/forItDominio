import { UsuarioRepository } from "../../services/UsuarioRepository";
import bcrypt from "bcryptjs";
import { Usuario } from "../../entities/Usuario";

export class LoginUsuario {
  constructor(private usuarioRepo: UsuarioRepository) {}

  async ejecutar(email: string, password: string): Promise<Usuario> {
    const usuario = await this.usuarioRepo.buscarPorEmail(email);

    if (!usuario) {
      throw new Error("Credenciales inválidas");
    }

    const passwordValido = await bcrypt.compare(password, usuario.passwordHash);
    if (!passwordValido) {
      throw new Error("Credenciales inválidas");
    }

    return usuario;
  }
}
