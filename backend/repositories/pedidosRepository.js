import {Repository} from "./repository.js";
import {OrderModel} from "../models/entities/pedido.js"


class PedidosRepository extends Repository {
    constructor() {
        super(OrderModel);
    }

    updateState(pedidoId, usuario, nuevoEstado, motivo,) {
        return this.model.findById(pedidoId)
            .then(pedido => {
                pedido.actualizarEstado(nuevoEstado, usuario, motivo)
                return pedido.save()
            })
    }
}

export default new PedidosRepository()