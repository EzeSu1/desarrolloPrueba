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

    obtenerPedido(pedidoId) {
        return this.pedidosRepository.findById(pedidoId)
            .then(pedido => PedidosValidator.validarPedido(pedido))
    }

    obtenerPedidosPorIdUsuario(usuarioId) {
        return this.pedidosRepository.findByUserId({ comprador: usuarioId })
            .then(pedidos => PedidosValidator.validarPedidos(pedidos))
    }

    crearPedido(nuevoPedidoJson) {
        const comprador_id = nuevoPedidoJson.compradorId

        return UsuariosService.obtenerUsuario(comprador_id)
            .then(comprador => {
                UsuariosValidator.validarComprador(comprador)
                // TODO: Copiar y pegar en el mapper?
                return Promise.all(nuevoPedidoJson.items.map(itemJson => {
                        return ProductosService.obtenerProducto(itemJson.productoId)
                        .then(productoBuscado => {
                            ProductosValidator.validarProducto(productoBuscado)
                            ProductosValidator.validarStock(productoBuscado, itemJson.cantidad)

                            return new ItemPedido(productoBuscado, itemJson.cantidad);
                        })
                }))
                    // ItemsPedidoMapper.mapAll(nuevoPedidoJson.items)
                .then(items => {
                    const direccion = DireccionesMapper.map(nuevoPedidoJson.direccionEntrega)
                    const nuevo_pedido = PedidosMapper.map(nuevoPedidoJson, comprador, items, direccion)

                    NotificacionesService.crearNotificacion(nuevo_pedido)

                    return this.pedidosRepository.save(nuevo_pedido)
                })
            })
    }

    actualizarPedido(idPedido, nuevoEstadoJson) {
        const usuario_id = nuevoEstadoJson.usuarioId
        return UsuariosService.obtenerUsuario(usuario_id)
            .then(usuario => {
                UsuariosValidator.validarUsuario(usuario)
                return this.pedidosRepository.findById(idPedido)
                    .then(pedido => {
                        PedidosValidator.validarPedido(pedido)
                        PedidosValidator.validarCambioEstado(pedido, nuevoEstadoJson.estado)

                        return this.pedidosRepository.update(idPedido, usuario, nuevoEstadoJson.estado, nuevoEstadoJson.motivo)
                    })
            })
            .then(pedidoActualizado => {
                NotificacionesService.crearNotificacion(pedidoActualizado)
                return pedidoActualizado
            })
    }
}

export default new PedidosService()