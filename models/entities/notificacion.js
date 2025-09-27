import { Usuario } from "./usuario.js"

export class Notificacion {
    constructor(usuarioDestino, mensaje) {
        this.id = null
        this.usuario_destino = usuarioDestino
        this.mensaje = mensaje
        this.fecha_alta = new Date()
        this.leida = false
        this.fecha_leida = null
    }



    getUsuarioDestinoId() {
        return this.usuario_destino.getId()
    }

    marcarComoLeida() {
        this.leida = true
        this.fecha_leida = new Date()
    }
}