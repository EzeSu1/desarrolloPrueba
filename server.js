import dotenv from "dotenv";
import express from "express";
import routes from "./routes/routes.js";
import UsuariosService from "./services/usuariosService.js";
import ProductoService from "./services/productoService.js";
import ProductosController from "./controllers/productosController.js";


const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development"; //
dotenv.config({ path: envFile });
const app = express();

app.use(express.json());

console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`API Base URL: ${process.env.API_BASE_URL}`);




const PORT = process.env.PORT;
routes.forEach(router => app.use(router));

app.listen(PORT, () => {
  console.log(`API Testing demo running on http://localhost:${PORT}`);
});


// http://localhost:3000/health-check