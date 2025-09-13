import { describe, test, expect, beforeEach, vi, Mocked } from "vitest";
import { loginUseCase, UserRepository } from "./login-user";
import { User } from "../../entities/users";

describe("loginUseCase", () => {
  let mockUserRepo: Mocked<UserRepository>;
  let fakeUser: User;

  beforeEach(() => {
    mockUserRepo = {
      findByEmail: vi.fn(),
    };

    fakeUser = {
      id: "1",
      name: "Sofía",
      email: "sofia@example.com",
      hashPassword: "hashed123",
    } as User;
  });

  test("debería loguear correctamente si el usuario existe y la contraseña es correcta", async () => {
    mockUserRepo.findByEmail.mockResolvedValue(fakeUser);

    const result = await loginUseCase(
      "sofia@example.com",
      "hashed123",
      mockUserRepo
    );

    expect(result).toEqual(fakeUser);
    expect(mockUserRepo.findByEmail).toHaveBeenCalledWith("sofia@example.com");
  });

  test("debería lanzar error si el usuario no existe", async () => {
    mockUserRepo.findByEmail.mockResolvedValue(null);

    await expect(
      loginUseCase("sofia@example.com", "hashed123", mockUserRepo)
    ).rejects.toThrow("Usuario no encontrado");

    expect(mockUserRepo.findByEmail).toHaveBeenCalledWith("sofia@example.com");
  });

  test("debería lanzar error si la contraseña es incorrecta", async () => {
    mockUserRepo.findByEmail.mockResolvedValue(fakeUser);

    await expect(
      loginUseCase("sofia@example.com", "wrongpass", mockUserRepo)
    ).rejects.toThrow("Contraseña incorrecta");
  });
});
