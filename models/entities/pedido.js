import { EstadoPedido } from "../enums/estadoPedido.js"
import {CambioEstadoPedido, historialEstadoSchema} from "./cambioEstadoPedido.js"
import mongoose from "mongoose";
import {itemPedidoSchema} from "./itemPedido.js";
import {direccionEntregaSchema} from "./direccionEntrega.js";



const pedidoSchema = new mongoose.Schema({
    comprador: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    items: { type: [itemPedidoSchema], required: true},
    total: { type: Number, required: true, default: 0 },
    moneda: { type: String, required: true },
    direccion_entrega: { type: direccionEntregaSchema, required: true },
    estado: { type: String},
    historial_estados: { type: [historialEstadoSchema], default: [] },
    fecha_creacion: { type: Date, default: Date.now }
}, { timestamps: true, collection: "Pedidos" });

export class Pedido {
    constructor(comprador, items, moneda, direccionEntrega) {
        this.comprador = comprador
        this.items = items
        this.total = this.calcularTotal()
        this.moneda = moneda
        this.direccion_entrega = direccionEntrega
        this.estado = null
        this.fecha_creacion = new Date()
        this.historial_estados = []
        this.actualizarEstado(EstadoPedido.PENDIENTE, comprador, "Creacion del pedido")

    }



    getEstado() {
        return this.estado
    }

    getCompradorId() {
        return this.comprador._id
    }

    calcularTotal() {
        return this.items.reduce((acumulador, item) => acumulador + item.subtotal(), 0)
    }

    actualizarEstado(nuevoEstado, quien, motivo) {
        const nuevo_cambioEstado = new CambioEstadoPedido(nuevoEstado, this, quien, motivo)

        this.estado = nuevoEstado
        this.agregarHistorialEstados(nuevo_cambioEstado)
    }


    agregarHistorialEstados(nuevoCambioEstado) {
        this.historial_estados.push(nuevoCambioEstado)
    }

    obtenerVendedor() {
        return this.items[0].producto.vendedor
    }
}

pedidoSchema.loadClass(Pedido)

export const PedidoModel= mongoose.model("Pedido", pedidoSchema)