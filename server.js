import dotenv from "dotenv";
import express from "express";
import router from "./routes/routes.js";
import {errorHandler} from "./middlewares/errorHandler.js";
import path from "node:path";
import { existsSync, readdirSync, writeFileSync } from "fs";


const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development"; //
dotenv.config({ path: envFile });
const app = express();

app.use(express.json());

const dataDir = path.join(process.cwd(), "data");

if (existsSync(dataDir)) {
  readdirSync(dataDir).forEach((file) => {
    if (file.endsWith(".json")) {
      writeFileSync(path.join(dataDir, file), "[]", "utf-8");
    }
  });
  console.log("✅ Archivos JSON reiniciados");
}

console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`API Base URL: ${process.env.API_BASE_URL}`);




const PORT = process.env.PORT;
app.use(router);

app.listen(PORT, () => {
  console.log(`API Testing demo running on http://localhost:${PORT}`);
});