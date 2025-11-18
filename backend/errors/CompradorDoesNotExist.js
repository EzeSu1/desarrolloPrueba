export class CompradorDoesNotExist extends Error{
    constructor(id) {
        super();
        this.message= "No existe un comprador con este ID: " + id+".";
    }
}