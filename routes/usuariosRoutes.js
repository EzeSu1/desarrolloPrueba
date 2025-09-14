import UsuariosController from "../controllers/usuariosController.js"
import express from "express"

const router = express.Router()

const pathUsuarios = "/usuarios"

router.get(pathUsuarios + "/:id", (req, res) => {
    UsuariosController.obtenerUsuario(req, res)
})

router.get(pathUsuarios + "/:id/pedidos", (req, res) => {
    UsuariosController.obtenerPedidosUsuario(req, res)
})

router.post(pathUsuarios, (req, res) => {
    UsuariosController.crearUsuario(req, res)
})

router.put(pathUsuarios + "/:id", (req, res) => {
    UsuariosController.actualizarUsuario(req, res)

})

export default router