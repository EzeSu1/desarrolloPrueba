import { EstadoPedido } from "../enums/estadoPedido.js"
import { CambioEstadoPedido } from "./cambioEstadoPedido.js"
import { DireccionEntrega } from "./direccionEntrega.js"
import { FactoryNotificacion } from "./factoryNotificacion.js";
import { pedidoSchema } from "../../controllers/validadores.js";


export class Pedido {
    constructor(comprador, items, moneda, direccionEntrega) {
        this.id = null
        this.comprador = comprador

        const productosSinStock = this.validarStockItems(items)

        if (productosSinStock.length > 0) {
            const productos = productosSinStock.map(item => item.nombreProducto()).join(", ")

            throw new Error("No se puede crear este pedido. No hay stock disponible para estos productos: " + productos)
        }

        this.items = items
        this.total = this.calcularTotal()
        this.moneda = moneda
        this.direccion_entrega = direccionEntrega
        this.estado = null
        this.fecha_creacion = new Date()
        this.historial_estados = []
        this.actualizarEstado(EstadoPedido.PENDIENTE, comprador, "Creacion del pedido")
        // this.notificar()
    }


    /*notificar() {
        const factoryNotificacion = new FactoryNotificacion()
        return factoryNotificacion.crearSegunPedido(this)
    }*/

    // Hace falta hacer una conversion?
    calcularTotal() {
        return this.items.reduce((acumulador, item) => acumulador + item.subtotal(), 0)
    }

    actualizarEstado(nuevoEstado, quien, motivo) {
        const nuevo_cambioEstado = new CambioEstadoPedido(nuevoEstado, this, quien, motivo)

        this.estado = nuevoEstado
        this.agregarHistorialEstados(nuevo_cambioEstado)
        /*
        if (this.estado != EstadoPedido.ENTREGADO|| this.estado != EstadoPedido.CANCELADO) {
            this.notificar()
        }*/

    }

    validarStockItems(items) {
        return items.filter(item => !item.hayStockDisponible()) // Pensar un nombre mejor para hayStockDisponible()...
    }

    //funciones: agregarId
    agregarHistorialEstados(nuevoCambioEstado) {
        this.historial_estados.push(nuevoCambioEstado)
    }

    cancelarPedido(quien, motivo) {
        if (this.estado !== EstadoPedido.ENVIADO && this.estado !== EstadoPedido.CANCELADO) {
            this.actualizarEstado(EstadoPedido.CANCELADO, quien, motivo)
        } else {
            throw new Error("El pedido no puede ser cancelado si ya fue entregado o cancelado.")
        }
    }

    obtenerVendedor() {
        return this.items[0].producto.vendedor
    }
}