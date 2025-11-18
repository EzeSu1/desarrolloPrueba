export class ProductoDoesNotExist extends Error{
    constructor() {
        super();
        this.message= "No existe un producto con ese ID.";
    }
}