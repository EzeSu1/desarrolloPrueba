export class ProductoSinStockError extends Error{
    constructor() {
        super();
        this.message= "No hay stock para el producto con este ID.";
    }
}