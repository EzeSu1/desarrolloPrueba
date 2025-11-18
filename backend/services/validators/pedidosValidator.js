import {PedidoDoesNotExist} from "../../errors/PedidoDoesNotExist.js";
import {InvalidPedidoEstadoError} from "../../errors/InvalidPedidoEstadoError.js";

class PedidosValidator {

    validarPedidos(pedidos) {
        return pedidos.map(pedido => this.validarPedido(pedido))
    }

    validarPedido(pedido) {
        if (!pedido) {
            throw new PedidoDoesNotExist()
        }

        return pedido
    }

    validarCambioEstado(pedido, nuevo_estado) {
        if (
            ((pedido.estado === "ENVIADO" || pedido.estado === "ENTREGADO") && nuevo_estado === "CANCELADO") ||
            ((nuevo_estado === "ENVIADO" || nuevo_estado === "ENTREGADO") && pedido.estado === "CANCELADO")
        ) {
            throw new InvalidPedidoEstadoError();
        }

        return pedido;
    }
}


export default new PedidosValidator()