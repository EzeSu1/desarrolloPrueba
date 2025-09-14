
import {Pedido} from "../models/entities/pedido.js"

class PedidosMapper{
    map(nuevoPedidoJson, comprador, items) {
        return new Pedido(comprador, items, nuevoPedidoJson.moneda, nuevoPedidoJson.direccion_entrega)
    }

}

export default new PedidosMapper();