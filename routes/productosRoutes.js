import  ProductosController from "../controllers/productosController.js"
import express from "express"

const router = express.Router()

const pathProductos = "/productos"

router.get(pathProductos + "/:id", (req, res) => {
    ProductosController.obtenerProducto(req, res)
})

router.post(pathProductos, (req, res) => {
    ProductosController.crearProducto(req, res)
})



export default router