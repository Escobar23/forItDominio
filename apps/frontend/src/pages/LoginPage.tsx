import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { AuthApi } from "../api/books";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState<string | null>(null);
  const { login } = useAuth();
  const nav = useNavigate();

  return (
    <div style={{ padding: 24 }}>
      <h2>Login</h2>
      <LoginForm
        loading={loading}
        error={error}
        onSubmit={async (email, password) => {
          try {
            setErr(null);
            setLoading(true);
            const res = await AuthApi.login(email, password);
            login(res.user);
            nav("/");
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (e: any) {
            setErr(e.message || "Error de login");
          } finally {
            setLoading(false);
          }
        }}
      />
    </div>
  );
}
