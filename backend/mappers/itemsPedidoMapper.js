import {ItemPedido} from "../models/entities/itemPedido.js";



class ItemsPedidoMapper {
    map(nuevo) {
        return new ItemPedido(productoBuscado, itemJson.cantidad, productoBuscado.getPrecio());
    }

    mapAll() {

    }
}


export default new ItemsPedidoMapper();