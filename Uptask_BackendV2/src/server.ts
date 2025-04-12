import express from "express";
import { connectDB } from "./Config/db";
import dotenv from "dotenv";
import cors from "cors";
import { corsOptions } from "./Config/cors";
import ProjectRoutes from "./Routes/ProjectRoutes";
import AuthRoutes from "./Routes/AuthRoutes";

dotenv.config();
connectDB();

const app = express();

// Leer los cors
app.use(cors(corsOptions));

// Habilitar las lecturas Json
app.use(express.json());

// Leer las rutas
app.use("/api/auth", AuthRoutes);
app.use("/api/projects", ProjectRoutes);

export default app;
