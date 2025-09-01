import { User } from "../../entities/users";

export function getProfileUseCase(user: User) {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    rol: user.rol
  };
}