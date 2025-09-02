import { describe, test, expect } from "vitest";
import { loginUseCase } from "./login-user";
import { User } from "../../entities/users";

describe("LoginUseCase", () => {
  const users: User[] = [
    {
      id: "1",
      username: "sofia",
      name: "Sofía Escobar",
      email: "sofia@test.com",
      hashPassword: "1234",
      rol: "USER",
    },
    {
      id: "2",
      username: "admin",
      name: "Admin",
      email: "admin@test.com",
      hashPassword: "adminpass",
      rol: "ADMIN",
    },
  ];

  test("should login successfully with valid credentials", () => {
    const user = loginUseCase("sofia", "1234", users);
    expect(user.username).toBe("sofia");
  });

  test("should throw error with invalid credentials", () => {
    expect(() => loginUseCase("sofia", "wrongpass", users)).toThrow("Invalid credentials");
  });

  test("should throw error if user does not exist", () => {
    expect(() => loginUseCase("ghost", "1234", users)).toThrow("Invalid credentials");
  });
});
