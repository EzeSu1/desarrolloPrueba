import { EstadoPedido } from "../enums/estadoPedido.js"
import {CambioEstadoPedido, changeStateSchema} from "./cambioEstadoPedido.js"
import mongoose from "mongoose";
import {itemOrderSchema} from "./itemPedido.js";
import {directionOrderSchema} from "./direccionEntrega.js";


const orderSchema = new mongoose.Schema({
    comprador: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true},
    items: [itemOrderSchema],
    total: {type: Number, required: true, default: 0  },
    moneda: {type: String, required: true},
    direccion_entrega: directionOrderSchema,
    estado: {type: String, required : true},
    fecha_creacion: {type: Date, default : new Date()},
    historial_estados: [changeStateSchema]
}, {timestamps: true, collection: "Pedidos"})


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

orderSchema.loadClass(Pedido)
export const OrderModel = mongoose.model("Pedido", orderSchema)