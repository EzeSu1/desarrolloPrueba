class PedidosDTOs {
    pedidoToDTO(pedido) {
        return {
            "id": pedido._id,
            "comprador": pedido.compradorId,
            "items": pedido.items,
            "total": pedido.total,
            "moneda": pedido.moneda,
            "direccion_entrega": pedido.direccion_entrega
        }
    }

    pedidosToDTO(pedidos) {
        return pedidos.map(pedido => this.pedidoToDTO(pedido))
    }

    pedidoActualizadoOutPutDTO(pedido) {
        return {
            "comprador": pedido.comprador._id,
            "pedidoId" : pedido._id,
            "estado": pedido.estado,
            "historial_estados": this.historialOutPutDTO(pedido.historial_estados)
        }
    }
    historialOutPutDTO(historial) {
        return historial.map(cambio => ({
            "fecha": cambio.fecha,
            "usuario": cambio._id,
            "estado": cambio.estado,
            "motivo": cambio.motivo
        }))
    }
}

export default new PedidosDTOs();