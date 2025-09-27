import  ProductosController from "../controllers/productosController.js"
import express from "express"
import {errorHandler} from "../middlewares/errorHandler.js";


const router= express.Router()

router.route("/:id")
    .get((req, res, next) => {
        ProductosController.obtenerProducto(req, res, next)
    })

router.route("/")
    .post((req, res, next) => {
        ProductosController.crearProducto(req, res, next)
})

router.use(errorHandler)

export default router;