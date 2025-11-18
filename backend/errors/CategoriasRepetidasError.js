export class CategoriasRepetidasError extends Error{
    constructor() {
        super();
        this.message= "No se le pueden asignar categorias repetidas al producto."
    }
}