import { describe, test, expect } from "vitest";
import { authorizeUseCase } from "./authorize";
import { User } from "../../entities/users";

describe("AuthorizeUseCase", () => {
  const admin: User = {
    id: "1",
    username: "admin",
    name: "Admin",
    email: "admin@test.com",
    hashPassword: "adminpass",
    rol: "ADMIN",
  };

  const librarian: User = {
    id: "2",
    username: "libro",
    name: "Librarian",
    email: "libro@test.com",
    hashPassword: "libpass",
    rol: "LIBRARIAN",
  };

  test("should allow access if role is authorized", () => {
    expect(authorizeUseCase(admin, ["ADMIN"])).toBe(true);
    expect(authorizeUseCase(librarian, ["ADMIN", "LIBRARIAN"])).toBe(true);
  });

  test("should deny access if role is not authorized", () => {
    expect(() => authorizeUseCase(librarian, ["ADMIN"])).toThrow("Access denied: insufficient role");
  });
});
