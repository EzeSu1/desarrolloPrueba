import express from "express";
import cors from "cors";
import router from "./routes/routes.js";

const app = express();

app.use(express.json());

app.use(cors({
    origin: process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(",").map(o => o.trim())
        : true
}));

app.use(router);

export default app;
