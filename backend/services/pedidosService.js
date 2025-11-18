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
import ProductosRepository from "../repositories/productosRepository.js";



export class PedidosService {
    obtenerPedido(usuario_id) {
        return PedidosRepository.findById(usuario_id)
            .then(pedido => PedidosValidator.validarPedido(pedido))
    }
    
    obtenerPedidos(filtros) {
        return PedidosRepository.findBy(filtros)
            .then(pedidos => PedidosValidator.validarPedidos(pedidos))
    }

    obtenerPedidosPaginado(pagina, filtros, ordenamiento) {
        return PedidosRepository.findbyPage(pagina, filtros, ordenamiento)
            .then(pedidos => PedidosValidator.validarPedidos(pedidos))
    }

    crearPedido(nuevoPedidoJson) {
        const comprador_id = nuevoPedidoJson.compradorId

        return UsuariosService.obtenerUsuario(comprador_id)
            .then(comprador => {
                UsuariosValidator.validarComprador(comprador)
                return Promise.all(nuevoPedidoJson.items.map(itemJson => {
                        return ProductosService.obtenerProducto(itemJson.productoId)
                        .then(productoBuscado => {
                            ProductosValidator.validarProducto(productoBuscado)
                            ProductosValidator.validarStock(productoBuscado, itemJson.cantidad)

                            return new ItemPedido(productoBuscado, itemJson.cantidad);
                        })
                }))
                .then(items => {
                    const direccion = DireccionesMapper.map(nuevoPedidoJson.direccionEntrega)
                    const nuevo_pedido = PedidosMapper.map(nuevoPedidoJson, comprador, items[0].producto.vendedor, items, direccion)

                    return ProductosService.reducirStock(items)
                        .then(() => {
                            NotificacionesService.crearNotificacion(nuevo_pedido, items[0].producto.vendedor)
                            return PedidosRepository.save(nuevo_pedido)
                        })
                })
            })
    }

    actualizarPedido(pedidoId, nuevoEstadoJson) {
        const accionador_id = nuevoEstadoJson.usuarioId

        return UsuariosService.obtenerUsuario(accionador_id)
            .then(usuario => {
                UsuariosValidator.validarUsuario(usuario)
                return PedidosRepository.findById(pedidoId)
                    .then(pedido => {
                        PedidosValidator.validarPedido(pedido)
                        PedidosValidator.validarCambioEstado(pedido, nuevoEstadoJson.estado)
                        if (pedido.estado === nuevoEstadoJson.estado) {
                            return pedido
                        }
                        if (nuevoEstadoJson.estado === "CANCELADO") {

                            return Promise.all(pedido.items.map(item => {
                                console.log("Restaurando stock por cancelacion de pedido", item.producto)
                                return ProductosService.agregarStock(item.producto, item.cantidad)}
                            ))
                                .then(() => PedidosRepository.updateState(pedidoId, usuario, nuevoEstadoJson.estado, nuevoEstadoJson.motivo))

                        }
                        if (nuevoEstadoJson.estado === "ENVIADO") {
                            return ProductosService.agregarVentas(pedido.items)
                                .then(() => PedidosRepository.updateState(pedidoId, usuario, nuevoEstadoJson.estado, nuevoEstadoJson.motivo))
                        }

                        return PedidosRepository.updateState(pedidoId, usuario, nuevoEstadoJson.estado, nuevoEstadoJson.motivo)
                            .then(pedidoActualizado => {
                                return ProductosService.obtenerVendedor(pedidoActualizado.items[0].producto)
                                    .then(vendedorId => {
                                        NotificacionesService.crearNotificacion(pedidoActualizado, vendedorId)
                                        return pedidoActualizado;
                                    });
                            });

                    })
            })

    }
}

export default new PedidosService()