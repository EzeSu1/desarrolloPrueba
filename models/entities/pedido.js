import { EstadoPedido } from "../enums/estadoPedido.js"
import { CambioEstadoPedido } from "./cambioEstadoPedido.js"



export class Pedido {
    constructor(comprador, items, moneda, direccionEntrega) {
        this.id = null
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
        return this.comprador.getId()
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