class PedidosRepository {
    constructor() {
        this.pedidos = []
        this.ultimo_id = 1
    }

    findById(id) {
        return this.pedidos.find(pedido => pedido.id === id)
    }

    save(pedido) {
        pedido.id = this.ultimo_id++
        this.pedidos.push(pedido)

        return pedido
    }

    findByUserId(userId) {
        return this.pedidos.filter(p => p.comprador.getId() === userId)
    }

    deleteById(id) {
        const index = this.pedidos.findIndex(pedido => pedido.id === id)
        if (index !== -1) {
            const pedidoEliminado = this.pedidos.splice(index, 1)[0]
            return pedidoEliminado
        }
        return null
    }
}

export default PedidosRepository