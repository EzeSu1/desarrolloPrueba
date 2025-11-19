import dotenv from "dotenv"
import app from "./app.js"
import { connect } from "./clients/mongoClient.js"

const envFile = process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: envFile });

const PORT = process.env.PORT;

connect()
    .then(() => {
        console.info("✅ Conectado a MongoDB");
        app.listen(PORT, () => {
            console.log(`API corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("❌ No se pudo conectar a MongoDB:", err);
        process.exit(1);
    });


