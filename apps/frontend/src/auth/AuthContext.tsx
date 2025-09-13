import { createContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

type Rol = "ADMIN" | "LIBRARIAN" | "USER";

type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  rol: Rol;
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem("user");
    return raw ? (JSON.parse(raw) as User) : null;
  });

  const value = useMemo(
    () => ({
      user,
      login: (u: User) => {
        setUser(u);
        localStorage.setItem("user", JSON.stringify(u));
      },
      logout: () => {
        setUser(null);
        localStorage.removeItem("user");
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
