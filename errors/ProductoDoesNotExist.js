export class ProductoDoesNotExist extends Error{
    constructor(id) {
        super();
        this.message= "No existe un producto con este ID: " + id+".";
    }
}