
import {Pedido} from "../models/entities/pedido.js"
import UsuariosMapper from "./usuariosMapper.js";
import {ItemPedido} from "../models/entities/itemPedido.js";
import productosMapper from "./productosMapper.js";
import {CambioEstadoPedido} from "../models/entities/cambioEstadoPedido.js";



class PedidosMapper{
    map(nuevoPedidoJson, comprador, items, direccion) {
        return new Pedido(comprador, items, nuevoPedidoJson.moneda, direccion)
    }

    mapToPedidosObject(dataObjects) {
        return dataObjects.map(this.mapToPedidoObject);
    }

    mapToPedidoObject(dataObjects) {
        const { moneda, direccionEntrega } = dataObjects

        const items = dataObjects.items.map(i => {
            const producto = productosMapper.mapToProductoObject(i.producto )
            return  new ItemPedido(producto, i.cantidad, i.precio_unitario)
        })

        const comprador = UsuariosMapper.mapToUsuarioObject(dataObjects.comprador)
        const pedido = new Pedido(comprador, items, moneda, direccionEntrega)
        pedido.id = dataObjects.id
        pedido.estado = dataObjects.estado
        pedido.historial_estados = dataObjects.historial_estados.map(h =>
            new CambioEstadoPedido(h.estado, pedido, UsuariosMapper.mapToUsuarioObject(h.usuario), h.motivo, new Date(h.fecha))
        )

        return pedido
    }

}

export default new PedidosMapper();