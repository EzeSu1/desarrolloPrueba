import  ProductosController from "../controllers/productosController.js"
import express from "express"
import {errorHandler} from "../middlewares/errorHandler.js";
import {queryParamsHandler} from "../middlewares/queryParamsHandler.js";

const router = express.Router()

router.route("/paginasTotales")
    .get(ProductosController.paginasTotales)

router.route("/:id")
    .get(ProductosController.obtenerProducto)

router.route("/:id/agregarStock")
    .post(ProductosController.agregarStock)

router.route("/")
    .get(queryParamsHandler, ProductosController.obtenerProductosPaginado)
    .post(ProductosController.crearProducto)





router.use(errorHandler)

export default router;