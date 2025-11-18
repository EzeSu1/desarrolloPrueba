import {Pedido} from "../models/entities/pedido.js"


class PedidosMapper {
    map(nuevoPedidoJson, comprador, vendedor, items, direccion) {
        return new Pedido(comprador, vendedor, items, nuevoPedidoJson.moneda, direccion)
    }
}

export default new PedidosMapper();