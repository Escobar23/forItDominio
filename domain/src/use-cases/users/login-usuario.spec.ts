import { describe, test, expect } from "vitest";
import { LoginUsuario, UsuarioRepository } from "./login-usuario";
import { User } from "../../entities/users";

const fakeUser: User = {
  id: "1",
  name: "Sofía",
  email: "sofia@test.com",
  hashPassword: "1234",
  rol: "ADMIN",
};

class InMemoryUsuarioRepo implements UsuarioRepository {
  private usuarios: User[] = [fakeUser];

  async findByEmail(email: string): Promise<User | null> {
    return this.usuarios.find(u => u.email === email) || null;
  }
}

describe("LoginUsuario", () => {
  test("debería loguear con credenciales correctas", async () => {
    const repo = new InMemoryUsuarioRepo();
    const login = new LoginUsuario(repo);

    const result = await login.execute("sofia@test.com", "1234");

    expect(result.email).toBe("sofia@test.com");
  });

  test("debería fallar con email incorrecto", async () => {
    const repo = new InMemoryUsuarioRepo();
    const login = new LoginUsuario(repo);

    await expect(login.execute("otro@test.com", "1234")).rejects.toThrow(
      "Usuario no encontrado"
    );
  });

  test("debería fallar con contraseña incorrecta", async () => {
    const repo = new InMemoryUsuarioRepo();
    const login = new LoginUsuario(repo);

    await expect(login.execute("sofia@test.com", "wrong")).rejects.toThrow(
      "Contraseña incorrecta"
    );
  });
});