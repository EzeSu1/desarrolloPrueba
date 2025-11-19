import request from "supertest"
import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"
import app from "../app.js"
import { UserModel } from "../models/entities/usuario.js"
import { ProductModel } from "../models/entities/producto.js"
import {afterAll, beforeAll, describe} from "@jest/globals"


describe("UsuariosController - Integración", () => {
    jest.setTimeout(30000)
    let mongoServer

    beforeAll(() => {
        return MongoMemoryServer.create()
            .then(server => {
                mongoServer = server
                const uri = mongoServer.getUri()
                return mongoose.connect(uri)
            })
    })

    afterAll(() => {
        return mongoose.disconnect()
            .then(() => mongoServer.stop())
    })

    beforeEach(() => {
        return UserModel.deleteMany({})
    })

    test("GET /usuarios/:id", () => {
        return UserModel.create({ nombre: "Pedro", email: "pp@email.com", telefono: "1122334455", tipo: "COMPRADOR"})
            .then(usuarioCreado => {
                return request(app)
                    .get(`/usuarios/${usuarioCreado._id}`)
                    .expect(200)
                    .then(res => { expect(res.body).toMatchObject({ id: usuarioCreado._id.toString(), nombre: "Pedro", email: "pp@email.com", telefono: "1122334455", tipo: "COMPRADOR", }) })
            })
    })

    test("POST /usuarios", () => {
        const body = { nombre: "Carlos", email: "carlos@test.com", telefono: "111222333", tipo: "COMPRADOR" }

        return request(app)
            .post("/usuarios")
            .send(body)
            .expect(201)
            .then(res => { expect(res.body).toMatchObject({ nombre: "Carlos", email: "carlos@test.com", telefono: "111222333", tipo: "COMPRADOR" }) })
    })
    /*
    test("GET /usuarios/:id/pedidos", () => {
        let usuarioCreado

        return UserModel.create({nombre: "Pepe",
            email: "pepe@test.com",
            telefono: "123123123",
            tipo: "COMPRADOR"
        })
            .then(usuario => {
                usuarioCreado = usuario;

                return PedidoModel.create([
                    { comprador: usuario._id, total: 100 },
                    { comprador: usuario._id, total: 200 }
                ]);
            })
            .then(() => {
                return request(app)
                    .get(`/usuarios/${usuarioCreado._id}/pedidos`)
                    .expect(200);
            })
            .then(res => {
                expect(Array.isArray(res.body)).toBe(true);
                expect(res.body.length).toBe(2);
            });
    });
*/
    test("GET /usuarios/:id/productos - devuelve productos del usuario vendedor", () => {
        let vendedor

        return UserModel.create({ nombre: "Juan", email: "juan@test.com", telefono: "222333444",  tipo: "VENDEDOR" })
            .then(user => {
                vendedor = user

                return ProductModel.create([
                    { vendedor: user._id, titulo: "Auriculares", descripcion: "Auriculares Bluetooth", categorias: [{ nombre: "Electrónica" }], precio: 5000, moneda: "ARS", stock: 10, fotos: ["foto1.jpg"],activo: true },
                    { vendedor: user._id, titulo: "Mouse Gamer", descripcion: "Mouse RGB",categorias: [{ nombre: "Electrónica" }], precio: 8000, moneda: "ARS", stock: 5, fotos: ["foto2.jpg"], activo: true }
                ])
            })
            .then(() => {
                return request(app)
                    .get(`/usuarios/${vendedor._id}/productos`)
                    .expect(200);
            })
            .then(res => {
                expect(Array.isArray(res.body)).toBe(true)
                expect(res.body.length).toBe(2)

                expect(res.body[0]).toHaveProperty("titulo")
                expect(res.body[0]).toHaveProperty("precio")
                // expect(res.body[0]).toHaveProperty("activo")
            })
    })
})
