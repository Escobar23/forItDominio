import { useState } from "react";

type Props = {
  onSubmit: (email: string, password: string) => Promise<void> | void;
  loading?: boolean;
  error?: string | null;
};

export function LoginForm({ onSubmit, loading, error }: Props) {
  const [email, setEmail] = useState("sofi@mail.com");
  const [password, setPassword] = useState("1234");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit(email, password);
      }}
      style={{ display: "grid", gap: 8, maxWidth: 320 }}
    >
      <label>
        Email
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
      </label>
      <label>
        Password
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
      </label>
      <button disabled={loading} type="submit">
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </form>
  );
}
