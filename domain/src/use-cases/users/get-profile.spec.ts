import { describe, test, expect } from "vitest";
import { getProfileUseCase } from "./get-profile";
import { User } from "../../entities/users";

describe("GetProfileUseCase", () => {
  const user: User = {
    id: "1",
    username: "sofia",
    name: "Sofía Escobar",
    email: "sofia@test.com",
    hashPassword: "1234",
    rol: "USER",
  };

  test("should return profile without password", () => {
    const profile = getProfileUseCase(user);

    expect(profile).toEqual({
      id: "1",
      username: "sofia",
      name: "Sofía Escobar",
      email: "sofia@test.com",
      rol: "USER",
    });

    // hashPassword nunca debe aparecer en el perfil
    expect((profile as any).hashPassword).toBeUndefined();
  });
});