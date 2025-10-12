import {Pedido} from "../models/entities/pedido.js"


class PedidosMapper {

    map(nuevoPedidoJson, comprador, items, direccion) {
        return new Pedido(comprador, items, nuevoPedidoJson.moneda, direccion)
    }
}

export default new PedidosMapper();