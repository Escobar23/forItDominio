import { User } from "../../entities/users";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
}

export async function loginUseCase(
  email: string,
  password: string,
  userRepo: UserRepository
): Promise<User> {
  const user = await userRepo.findByEmail(email);

  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  if (user.hashPassword !== password) {
    throw new Error("Contraseña incorrecta");
  }

  return user;
}