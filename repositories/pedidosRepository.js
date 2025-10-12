import {Repository} from "./repository.js";
import {OrderModel} from "../models/entities/pedido.js"


class PedidosRepository extends Repository {
    constructor() {
        super(OrderModel);
    }

    findByUserId(usuario_id) {
        return this.model.find(usuario_id)
    }

    update(idPedido, usuario, nuevoEstado, motivo,) {
        return this.model.findById(idPedido)
            .then( pedido=>{
                pedido.actualizarEstado(nuevoEstado, usuario, motivo)
                return pedido.save()
            })
        //TODO
    }

}

export default PedidosRepository