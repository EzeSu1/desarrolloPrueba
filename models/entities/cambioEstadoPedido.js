import mongoose from "mongoose";

export const historialEstadoSchema = new mongoose.Schema({
    estado: { type: String, enum: Object.values(EstadoPedido), required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    motivo: { type: String },
    fecha: { type: Date, default: Date.now }
}, { _id: false });import { Pedido } from "./pedido.js"
import { Usuario } from "./usuario.js"
import { EstadoPedido } from "../enums/estadoPedido.js"

export class CambioEstadoPedido {
    constructor(estado, pedido, usuario, motivo) {
        this.estado = estado
        // this.pedido = pedido
        this.usuario = usuario
        this.motivo = motivo
        this.fecha = new Date()
    }
}