class PedidosDTOs {
    pedidoToDTO(pedido) {
        return {
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

    pedidoActualizadoOutPutDTO(pedido){
        return {
            "comprador": pedido.comprador._id,
            "pedidoId" : pedido.id,
            "estado": pedido.estado
        }

    }
}

export default new PedidosDTOs();
