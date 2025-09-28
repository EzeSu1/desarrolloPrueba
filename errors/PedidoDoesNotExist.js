

export class PedidoDoesNotExist extends Error{
    constructor(id) {
        super();
        this.message= "No existe un pedido con ese ID.";
    }
}