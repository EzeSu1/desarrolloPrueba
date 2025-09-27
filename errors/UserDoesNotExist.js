export class UserDoesNotExist extends Error{
    constructor(id) {
        super();
        this.message="No existe un usuario con este ID: " + id+".";
    }
}