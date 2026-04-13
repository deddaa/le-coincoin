import cors from "cors";
import helmet from "helmet";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";

//----------------------------------------

dotenv.config();

const app = express();

//----------------------------------------

app.use(helmet());

app.use(cors(
    {origin: "http://localhost:5173",
        credentials: true
    }
));

app.use(express.json());

//----------------------------------------

app.use("/api/auth", authRoutes);



//----------------------------------------

export default app;
