import {Repository} from "./repository.js";
import {LoginUserModel} from "../models/entities/loginUser.js";


class LoginRepository extends Repository {
    constructor() {
        super(LoginUserModel);
    }

    findByUser(user) {
        const query = {
           $or: [
               { 'user.nombre': user },
               { 'user.email': user }
           ]
        };
        return this.model.findOne(query);
    }
}

export default new LoginRepository()