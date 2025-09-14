import UsuariosService from "../services/usuariosService.js";
import {  usuarioSchema2,idTransform } from "./validadores.js"  //idTransform falta importarlo,

class UsuariosController {
    constructor() {
        this.usuariosService = UsuariosService;
    }

    obtenerUsuario(req, res) {
        const resultId = idTransform.safeParse(req.params.id)

        if(resultId.error) {
            res.status(400).json(resultId.error.issues)
            return
        }

        const id = resultId.data
        const usuario = this.usuariosService.obtenerUsuario(id);

        if(!usuario) {
            res.status(404).json({ error: "Usuario no encontrado con ese ID" })
            return
        }

        res.status(200).json(usuario)
    }

    obtenerPedidosUsuario(req, res) {
        const resultId = idTransform.safeParse(req.params.id)

        if(resultId.error) {
            res.status(400).json(resultId.error.issues)
            return
        }

        const id = resultId.data
        const pedidos = this.usuariosService.obtenerPedidosUsuario(id);

        if(!pedidos) {
            res.status(404).json({ error: "El usuario no tiene pedidos" })
            return
        }

        res.status(200).json(pedidos)
    }

    crearUsuario(req, res) {
        const body = req.body
        const resultBody = usuarioSchema2.safeParse(body)

        if(!resultBody.success) {
            const errores = resultBody.error.issues.map(e => ({
                path: e.path.join("."),
                message: e.message
            }));
            res.status(400).json({ errores })
            return
        }

        const usuarioCreado = this.usuariosService.crearUsuario(resultBody.data);

        if(!usuarioCreado) {
            res.status(500).json({ error: "Error al crear el usuario" })
            return
        }

        res.status(201).json(usuarioCreado)
    }

}

export default new UsuariosController();