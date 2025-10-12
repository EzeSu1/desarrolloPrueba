import dotenv from "dotenv";
import express from "express";
import router from "./routes/routes.js";
import {connect} from "./clients/mongoClient.js";


const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development"; //
dotenv.config({ path: envFile });
const app = express();

app.use(express.json());



console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`API Base URL: ${process.env.API_BASE_URL}`);




const PORT = process.env.PORT;
app.use(router);

connect()
    .then(() => {
      console.info("✅ Conectado a MongoDB");
      app.listen(PORT, () => {
        console.log(`API Testing demo running on http://localhost:${PORT}`);
      });
    })
    .catch(err => {
      console.error("❌ No se pudo conectar a MongoDB:", err);
      process.exit(1); // corta el proceso si no hay DB
    });

