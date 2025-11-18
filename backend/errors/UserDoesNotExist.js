export class UserDoesNotExist extends Error{
    constructor() {
        super();
        this.message="No existe un usuario con este ID.";
    }
}