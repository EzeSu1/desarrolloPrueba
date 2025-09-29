import fs from "node:fs/promises";
import PedidosMapper from "../mappers/pedidosMapper.js";
import {Repository} from "./repository.js";
import {PedidoModel} from "../models/entities/pedido.js";



class PedidosRepository extends Repository{
    constructor() {
        super(PedidoModel);
    }

    findByUserId(userId) {
        return this.model.find({ comprador: userId })

    }


    update(idPedido, usuario, nuevoEstado, motivo,) {
        return this.model.findById(idPedido)
            .then(pedido =>{
                pedido.actualizarEstado(nuevoEstado, usuario, motivo)
                return pedido.save()
            })
        //TODO
    }
}


export default PedidosRepository