export class InvalidPedidoRolError extends Error{
    constructor(id) {
        super();
        this.message = "El usuario con id: "+id+ ", NO es un COMPRADOR"
    }
}