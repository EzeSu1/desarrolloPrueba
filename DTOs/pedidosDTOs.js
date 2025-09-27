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
            "comprador": pedido.comprador.getId(),
            "pedidoId" : pedido.id,
            "estado": pedido.estado,
            "historial_estados": pedido.historial_estados
        }

    }
}

export default new PedidosDTOs();
