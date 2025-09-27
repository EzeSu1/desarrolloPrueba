export class ProductoSinStockError extends Error{
    constructor(id) {
        super();
        this.message= "No hay stock para el producto con este ID: " + id+".";
    }
}