import { EstadoPedido } from "../enums/estadoPedido.js"
import { Notificacion } from "./notificacion.js"


class FactoryNotificacion {

    crearSegunEstadoPedido(estado) {
        switch(estado) {
            case EstadoPedido.PENDIENTE:
                return "Te llego un pedido que está pendiente de confirmación."
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


    crearSegunPedido(pedido) {
        let notificacion;

        switch (pedido.estado) {
            case EstadoPedido.PENDIENTE:
            case EstadoPedido.CONFIRMADO:
            case EstadoPedido.EN_PREPARACION:
                notificacion = new Notificacion(
                    pedido.obtenerVendedor(),
                    this.crearSegunEstadoPedido(pedido.estado)
                );
                break;

            case EstadoPedido.ENVIADO:
            case EstadoPedido.CANCELADO:
            case EstadoPedido.ENTREGADO:
                notificacion = new Notificacion(
                    pedido.comprador,
                    this.crearSegunEstadoPedido(pedido.estado)
                );
                break;

        }

        return notificacion;
    }
}

export default new FactoryNotificacion()