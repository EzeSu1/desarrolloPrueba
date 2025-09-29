import mongoose from "mongoose";
import {Producto} from "./producto.js";


const notificacionSchema = new mongoose.Schema({
    usuario_destino: { type: String, required: true },
    mensaje: { type: String, required: true },
    fecha_alta: { type: Date, default: Date.now, required: true },
    fecha_leida: { type: Date , required: false },
    leida: { type: String,  default: false, required: true},
}, {timestamps : true, collection : "Notificaciones"})
export class Notificacion {
    constructor(usuarioDestino, mensaje) {
        this.usuario_destino = usuarioDestino
        this.mensaje = mensaje
        this.fecha_alta = new Date()
        this.leida = false
        this.fecha_leida = null
    }



    getUsuarioDestinoId() {
        return this.usuario_destino._id
    }

    marcarComoLeida() {
        this.leida = true
        this.fecha_leida = new Date()
    }
}
notificacionSchema.loadClass(Producto)
export const NotificacionModel = mongoose.model("Notificacion", notificacionSchema)