export class InvalidRolError extends Error{
    constructor(rol) {
        super();
        this.message = "El usuario NO es un "+ rol;
    }
}