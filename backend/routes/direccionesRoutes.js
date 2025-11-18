import DireccionesController from "../controllers/direccionesController.js"
import express from "express"

const router = express.Router()

const pathDirecciones = "/direcciones"

router.get(pathDirecciones + "/:id", (req, res) => {
    DireccionesController.obtenerDireccion(req, res)
})

router.post(pathDirecciones, (req, res) => {
    DireccionesController.crearDireccion(req, res)
})

router.put(pathDirecciones + "/:id", (req, res) => {
    DireccionesController.actualizarDireccion(req, res)
})

router.delete(pathDirecciones + "/:id", (req, res) => {
    DireccionesController.eliminarDireccion(req,res)
})

export default router