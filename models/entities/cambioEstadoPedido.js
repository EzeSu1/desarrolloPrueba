import { Pedido } from "./pedido.js"
import { Usuario } from "./usuario.js"
import { EstadoPedido } from "../enums/estadoPedido.js"

export class CambioEstadoPedido {
    constructor(estado, pedido, usuario, motivo) {
        this.fecha = new Date()
        this.estado = estado
        // this.pedido = pedido
        this.usuario = usuario
        this.motivo = motivo
    }
}