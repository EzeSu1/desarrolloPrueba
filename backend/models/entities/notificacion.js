import mongoose from "mongoose";


const notificacionSchema = new mongoose.Schema({
    usuario_destino: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true},
    mensaje: { type: String, required: true },
    fecha_alta: { type: Date, default: Date.now, required: true },
    fecha_leida: { type: Date , required: false },
    leida: { type: Boolean,  default: false, required: true},
}, {timestamps : true, collection : "Notificaciones"})


export class Notificacion {
    constructor(usuarioDestino, mensaje) {
        this.usuario_destino = usuarioDestino
        this.mensaje = mensaje
        this.fecha_alta = new Date()
        this.leida = false
        this.fecha_leida = null
    }


    marcarComoLeida() {
        this.leida = true
        this.fecha_leida = new Date()
    }
}

notificacionSchema.loadClass(Notificacion)
export const NotificationModel = mongoose.model("Notificacion", notificacionSchema)