import PedidosRepository from "../repositories/pedidosRepository.js"
import { ItemPedido } from "../models/entities/itemPedido.js"
import ProductosService from "./productosService.js";
import UsuariosService from "./usuariosService.js"
import PedidosMapper from "../mappers/pedidosMapper.js";
import NotificacionesService from "./notificacionesService.js";
import DireccionesMapper from "../mappers/direccionesMapper.js";
import PedidosValidator from "./validators/pedidosValidator.js"
import UsuariosValidator from "./validators/usuariosValidator.js";
import ProductosValidator from "./validators/productosValidator.js"



export class PedidosService {
    constructor() {
        this.pedidosRepository = new PedidosRepository()
    }

    obtenerPedido(pedido_id) {
        return this.pedidosRepository.findById(pedido_id)
            .then(pedido => PedidosValidator.validarPedido(pedido))
    }

    crearPedido(nuevo_pedido_json) {
        const comprador_id = nuevo_pedido_json.compradorId

        return UsuariosService.obtenerUsuario(comprador_id)
            .then(comprador => {
                UsuariosValidator.validarComprador(comprador)
                // TODO: Copiar y pegar en el mapper?
                return Promise.all(nuevo_pedido_json.items.map(itemJson => {
                        return ProductosService.obtenerProducto(itemJson.productoId)
                        .then(productoBuscado => {
                            ProductosValidator.validarProducto(productoBuscado)
                            ProductosValidator.validarStock(productoBuscado, itemJson.cantidad)

                            return new ItemPedido(productoBuscado, itemJson.cantidad, productoBuscado.getPrecio());
                        })
                }))
                    // ItemsPedidoMapper.mapAll(nuevo_pedido_json.items)
                .then(items => {
                    const direccion = DireccionesMapper.map(nuevo_pedido_json.direccionEntrega)
                    const nuevo_pedido = PedidosMapper.map(nuevo_pedido_json, comprador, items, direccion)

                    NotificacionesService.crearNotificacion(nuevo_pedido)

                    return this.pedidosRepository.save(nuevo_pedido)
                })
            })
    }

    obtenerPedidosPorIdUsuario(usuario_id) {
        return this.pedidosRepository.findByUserId(usuario_id)
            .then(pedidos => pedidos)
    }

    actualizarPedido(id_pedido, nuevo_estado_json) {
        const usuario_id = nuevo_estado_json.usuarioId
        return UsuariosService.obtenerUsuario(usuario_id)
            .then(usuario => {
                UsuariosValidator.validarUsuario(usuario)
                return this.pedidosRepository.findById(id_pedido)
                    .then(pedido => {
                        PedidosValidator.validarPedido(pedido)
                        PedidosValidator.validarCambioEstado(pedido, nuevo_estado_json.estado)

                        return this.pedidosRepository.update(id_pedido, usuario, nuevo_estado_json.estado, nuevo_estado_json.motivo)
                    })
            })
            .then(pedido_actualizado => {
                NotificacionesService.crearNotificacion(pedido_actualizado)
                return pedido_actualizado
            })
    }

}


export default new PedidosService()