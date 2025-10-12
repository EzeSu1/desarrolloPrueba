import mongoose from "mongoose";


export const changeStateSchema = new mongoose.Schema({
    fecha: {type: Date, required: true},
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true},
    estado: {type: String, required: true},
    motivo: {type: String, required: true}
}, { _id: false })

export class CambioEstadoPedido {
    constructor(estado, pedido, usuario, motivo) {
        this.fecha = new Date()
        this.usuario = usuario
        this.estado = estado
        this.motivo = motivo
    }
}