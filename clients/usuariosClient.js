import axios from "axios";
import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });

export class UsuariosClient {
    constructor({
                    baseURL = process.env.API_BASE_URL,
                    timeout = 5000
                } = {}) {
        this.http = axios.create({
            baseURL,
            timeout,
            headers: {"Content-Type": "application/json"}
        });
    }

    getTodos() {
        return this.http.get(`/todos`).then(res => ({data: res.data, status: res.status}));
    }

    findById(id) {
        return this.http.get(`/usuarios/${id}`)
            .then(res => ({data: res.data, status: res.status}));
    }
    createUsers(payload) {
        return this.http.post(`/usuarios`, payload).then(res => ({data: res.data, status: res.status}));
    }

    updateTodos(id, payload) {
        return this.http.put(`/todos/${id}`, payload).then(res => ({data: res.data, status: res.status}));
    }

    deleteTodos(id) {
        return this.http.delete(`/todos/${id}`).then(res => ({data: res.data, status: res.status}));
    }
}