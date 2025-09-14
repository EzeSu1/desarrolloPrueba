import PedidosRepository from "../repositories/pedidosRepository.js"
import { Pedido } from "../models/entities/pedido.js"
import { ItemPedido } from "../models/entities/itemPedido.js"
import { Usuario } from "../models/entities/usuario.js"
import { DireccionEntrega } from "../models/entities/direccionEntrega.js";
import ProductosService from "./productoService.js";
import UsuariosService from "./usuariosService.js"
import PedidosMapper from "../mappers/pedidosMapper.js";




class PedidosService {
    constructor() {
        this.pedidosRepository = new PedidosRepository()
    }

    obtenerPedido(id) {
        return this.pedidosRepository.findById(id)
    }

    crearPedido(nuevoPedidoJson) {
        const comprador = UsuariosService.obtenerUsuario(nuevoPedidoJson.compradorId)

        if (!comprador) {
            throw new Error("El comprador no existe")
        }

        const items = nuevoPedidoJson.items.map(itemJson => {
            const productoBuscado = ProductosService.obtenerProducto(itemJson.productoId);
            if (!productoBuscado) {
                throw new Error(`Producto con id ${itemJson.productoId} no existe`);
            }

            return new ItemPedido(productoBuscado, itemJson.cantidad, productoBuscado.getPrecio());
        });

            const nuevoPedido = PedidosMapper.map(nuevoPedidoJson, comprador, items)

        return this.pedidosRepository.save(nuevoPedido)
    }

    obtenerPedidosPorUserId(userId) {
        return this.pedidosRepository.findByUserId(userId)
    }

    actualizarPedido() {

    }

    eliminarPedido(id) {
        return this.pedidosRepository.deleteById(id)
    }
}



export default new PedidosService()