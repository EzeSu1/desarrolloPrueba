export class InvalidPedidoEstadoError extends Error{
    constructor() {
        super();
        this.message= "No se puede cancelar un pedido que ya fue enviado"
    }
}