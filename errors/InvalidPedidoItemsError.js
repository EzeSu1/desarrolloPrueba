export class InvalidPedidoItemsError extends Error{
    constructor() {
        super();
        this.message= "El pedido no puede estar vacío. Debe contener al menos un producto."
    }
}