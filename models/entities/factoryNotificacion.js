import { EstadoPedido } from "../enums/estadoPedido.js"
import { Notificacion } from "./notificacion.js"


export class FactoryNotificacion {
    /*
    constructor() {
        this.notificacionResitory = new NotificacionesRepository()
    }
    */

    crearSegunEstadoPedido(estado) {
        switch(estado) {
            case EstadoPedido.PENDIENTE:
                return "Tu pedido ha sido recibido y está pendiente de confirmación."
            case EstadoPedido.CONFIRMADO:
                return "Tu pedido fue confirmado por el vendedor."
            case EstadoPedido.EN_PREPARACION:
                return "Tu pedido está siendo preparado."
            case EstadoPedido.ENVIADO:
                return "Tu pedido ha sido enviado y está en camino."
            case EstadoPedido.ENTREGADO:
                return "Tu pedido fue entregado con éxito."
            case EstadoPedido.CANCELADO:
                return "Tu pedido ha sido cancelado."
            default:
                return "El estado de tu pedido ha cambiado."
        }
    }

    /*
    crearSegunPedido(pedido) {
        const estado = pedido.estado
        switch (estado) {
            case(EstadoPedido.PENDIENTE, EstadoPedido.CONFIRMADO, EstadoPedido.EN_PREPARACION):
                const notificacion = new Notificacion(pedido.obtenerVendedor(), this.crearSegunEstadoPedido(pedido.estado))
            case(EstadoPedido.CONFIRMADO, EstadoPedido.ENVIADO):
                const notificacion = new Notificacion(pedido.comprador, this.crearSegunEstadoPedido(pedido.estado))


        }

        return notificacion
    }
    */
}

export default FactoryNotificacion