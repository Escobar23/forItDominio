import express from "express";
import bodyParser from "body-parser";
import { LoginUsuario } from "../../../domain/src/use-cases/usuarios/login-usuario";
import { Usuario } from "../../../domain/src/entities/usuarios";

const app = express();
app.use(bodyParser.json());

// repositorio en memoria
const usuarios: Usuario[] = [
  { id: "1", nombre: "Sofía", email: "sofia@test.com", contraseñaHash: "1234", rol: "ADMIN" }
];

class InMemoryUsuarioRepo {
  async findByEmail(email: string): Promise<Usuario | null> {
    return usuarios.find(u => u.email === email) || null;
  }
}

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const login = new LoginUsuario(new InMemoryUsuarioRepo());
    const user = await login.execute(email, password);

    res.json({ mensaje: "Login exitoso", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Backend escuchando en http://localhost:3000");
});