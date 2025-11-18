

export class PedidoDoesNotExist extends Error{
    constructor() {
        super();
        this.message= "No existe un pedido con ese ID.";
    }
}