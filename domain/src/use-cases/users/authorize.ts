import { User } from "../../entities/users";

export function authorizeUseCase(user: User, requiredRoles: Array<'ADMIN' | 'LIBRARIAN' | 'USER'>) {
  if (!requiredRoles.includes(user.rol)) {
    throw new Error("Access denied: insufficient role");
  }
  return true;
}