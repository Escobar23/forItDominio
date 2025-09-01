import { User } from "../../entities/users";

export function loginUseCase(
  username: string,
  password: string,
  users: User[]
): User {
  const user = users.find(
    (u) => u.username === username && u.hashPassword === password
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  return user;
}