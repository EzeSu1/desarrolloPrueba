export class CategoriaDoesNotExist extends Error{
    constructor() {
        super();
        this.message= "No existe esa categoria."
    }
}