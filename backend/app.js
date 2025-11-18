import express from "express";
import healthRoutes from "./routes/routes.js";

const app = express();

app.use("/", healthRoutes);  

export default app;

