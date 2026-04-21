import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import annoncesRoutes from "./routes/annonce.routes.js";
import messageRoutes from "./routes/messages.routes.js";

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

app.use("/api/message", messageRoutes);

app.use("/api/annonce", annoncesRoutes);



//----------------------------------------

export default app;
