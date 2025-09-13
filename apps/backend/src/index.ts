import express from "express";
import bodyParser from "body-parser";
import {loginUseCase} from "../../../domain/src/use-cases/users/login-user";
import { User } from "../../../domain/src/entities/users";
import cors from "cors";

const app = express();
app.use(bodyParser.json());

// repositorio en memoria
const usuarios: User[] = [
  { id: "1", name: "Sofía", username: "sofi23", email: "sofia@test.com", hashPassword: "1234", rol: "ADMIN" }
];

class InMemoryUsuarioRepo {
  async findByEmail(email: string): Promise<User | null> {
    return usuarios.find(u => u.email === email) || null;
  }
}

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userRepo = new InMemoryUsuarioRepo();
    const user = loginUseCase(email, password, userRepo);

    res.json({ mensaje: "Login exitoso", user });
  } catch (error: any) {
    res.status(401).json({ mensaje: error.message });
  }
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));