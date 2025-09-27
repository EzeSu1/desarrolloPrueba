import PedidosRepository from "../repositories/pedidosRepository.js"
import { ItemPedido } from "../models/entities/itemPedido.js"
import ProductosService from "./productosService.js";
import UsuariosService from "./usuariosService.js"
import PedidosMapper from "../mappers/pedidosMapper.js";
import NotificacionesService from "./notificacionesService.js";
import {CompradorDoesNotExist} from "../errors/CompradorDoesNotExist.js";
import {ProductoDoesNotExist} from "../errors/ProductoDoesNotExist.js";
import DireccionesMapper from "../mappers/direccionesMapper.js";
import {InvalidPedidoEstadoError} from "../errors/InvalidPedidoEstadoError.js";
import {UserDoesNotExist} from "../errors/UserDoesNotExist.js";
import {PedidoDoesNotExist} from "../errors/PedidoDoesNotExist.js";
import {InvalidPedidoRolError} from "../errors/InvalidPedidoRolError.js";
import {ProductoSinStockError} from "../errors/ProductoSinStockError.js";


export class PedidosService {
    constructor() {
        this.pedidosRepository = new PedidosRepository()
    }

    obtenerPedido(pedido_id) {
        return this.pedidosRepository.findById(pedido_id)
            .then(pedido => {
                if (!pedido) { //TODO: hacerlo en validators
                    throw new PedidoDoesNotExist(pedido_id)
                }
                return pedido
            })
    }

    crearPedido(nuevo_pedido_json) {
        const comprador_id = nuevo_pedido_json.compradorId
        return  UsuariosService.obtenerUsuario(comprador_id)
            .then(comprador => {
                if (!comprador) { //TODO: hacerlo en validators
                    throw new CompradorDoesNotExist(comprador_id)
                }
                if(comprador.tipo !== "COMPRADOR"){ //TODO: hacerlo en validators
                    throw new InvalidPedidoRolError(comprador_id)
                }

                return Promise.all(nuevo_pedido_json.items.map(itemJson => {
                        return ProductosService.obtenerProducto(itemJson.productoId)
                        .then(productoBuscado => {
                            if (!productoBuscado) {
                                throw new ProductoDoesNotExist(itemJson.productoId); //TODO: hacerlo en validators
                            }
                            if (!productoBuscado.estaDisponible(itemJson.cantidad)){
                                throw new ProductoSinStockError(productoBuscado.id) //TODO: hacerlo en validators
                            }

                            return new ItemPedido(productoBuscado, itemJson.cantidad, productoBuscado.getPrecio());
                        })
                }))
                .then(items => {
                    const direccion = DireccionesMapper.map(nuevo_pedido_json.direccionEntrega)
                    const nuevo_pedido = PedidosMapper.map(nuevo_pedido_json, comprador, items, direccion)
                    NotificacionesService.crearNotificacion(nuevo_pedido)
                    return this.pedidosRepository.save(nuevo_pedido)
                })
            })

            .then(nuevo_pedido => nuevo_pedido)

    }
        //NotificacionesService.crearNotificacion(nuevoPedido)

    obtenerPedidosPorIdUsuario(usuario_id) {
        return this.pedidosRepository.findByUserId(usuario_id)
            .then(pedidos => pedidos)
    }

    actualizarPedido(id_pedido, nuevo_estado_json) {
        const usuario_id = nuevo_estado_json.usuarioId
        return UsuariosService.obtenerUsuario(usuario_id)
            .then(usuario=>{
                if(!usuario){
                    throw new UserDoesNotExist(usuario_id) //TODO: hacerlo en validators
                }
                return this.pedidosRepository.findById(id_pedido)
                .then(pedido =>{
                    if(!pedido){
                        throw new PedidoDoesNotExist(id_pedido) //TODO: hacerlo en validators
                    }
                    if (pedido.estado === "ENVIADO" && nuevo_estado_json.estado === "CANCELADO") { //TODO: hacerlo en validators
                        throw new InvalidPedidoEstadoError()
                    }
                    return this.pedidosRepository.update(id_pedido, usuario, nuevo_estado_json.estado, nuevo_estado_json.motivo)
                })
            })
            .then(pedido_actualizado=> {
                NotificacionesService.crearNotificacion(pedido_actualizado)
                return pedido_actualizado
            })

    }

    eliminarPedido(pedido_id) {
        return this.pedidosRepository.deleteById(pedido_id)
    }
    /*
    static instance() {
        if (!PedidosService.singleton) {
            PedidosService.singleton = new PedidosService();
        }
        return PedidosService.singleton;
    }*/
}



export default new PedidosService()