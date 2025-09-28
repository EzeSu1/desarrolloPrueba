import fs from "node:fs/promises";
import PedidosMapper from "../mappers/pedidosMapper.js";
import {Repository} from "./repository.js";



class PedidosRepository extends Repository{
    constructor() {
        super("pedidos.json", (data)=>PedidosMapper.mapToPedidosObject(data));
    }

    findByUserId(userId) {
        return this.getAll()
            .then(pedidos =>{
                return pedidos.filter(p => p.comprador.id === Number(userId))
            })
    }

    deleteById(id) {
        const index = this.pedidos.findIndex(pedido => pedido.id === id)
        if (index !== -1) {
            const pedidoEliminado = this.pedidos.splice(index, 1)[0]
            return pedidoEliminado
        }
        return null
    }

    update(idPedido, usuario, nuevoEstado, motivo,) {
        return this.getAll()
            .then(pedidos =>{
                const indice = pedidos.findIndex(p => p.id === Number(idPedido));
                if (indice === -1) {
                    return null
                }
                const pedido = pedidos[indice]
                pedido.actualizarEstado(nuevoEstado, usuario, motivo)
                pedidos[indice] = pedido

                return fs.writeFile(
                    this.filePath,
                    JSON.stringify(pedidos)
                ).then(() => pedido);
            })
        //TODO
    }
}


export default PedidosRepository