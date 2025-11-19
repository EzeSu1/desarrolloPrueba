import request from "supertest"
import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"
import { ProductModel } from "../models/entities/producto.js"
import { UserModel } from "../models/entities/usuario.js"
import {afterAll, beforeAll, beforeEach, test} from "@jest/globals"
import app from "../app.js"

// falta probar
describe("ProductosController - Integración", () => {
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
        return mongoose.connection.db.dropDatabase()
    })

    test("GET /productos/:id", () => {
        return UserModel.create({ nombre: "Juan", email: "juan@test.com", telefono: "11223344", tipo: "VENDEDOR" })
            .then(usuario => {
                return ProductModel.create({
                    vendedor: usuario._id,
                    titulo: "Mouse Gamer",
                    descripcion: "RGB 7200 DPI",
                    categorias: [{nombre: "Electrónica"}],
                    precio: 5000,
                    moneda: "ARS",
                    stock: 10,
                    fotos: ["a.jpg"],
                    activo: true
                })
            })
            .then(producto => {
                return request(app)
                    .get(`/productos/${producto._id}`)
                    .expect(200)
                    .then(res => {
                        expect(res.body).toMatchObject({
                            id: producto._id.toString(),
                            titulo: "Mouse Gamer",
                            precio: 5000,
                            moneda: "ARS"
                        })
                    })
            })
    })

    test("POST /productos", () => {

        return UserModel.create({
            nombre: "Carlos",
            email: "carlos32@test.com",
            telefono: "111222333",
            tipo: "VENDEDOR"
        })
            .then(vendedor => {

                const nuevoProducto = {
                    vendedorId: vendedor._id.toString(),
                    titulo: "Teclado Mecánico",
                    descripcion: "Switch Red",
                    categorias: [{nombre: "Periféricos"}],
                    precio: 15000,
                    moneda: "ARS",
                    stock: 7,
                    fotos: ["foto1.jpg"]
                }

                return request(app)
                    .post("/productos")
                    .send(nuevoProducto)
                    .expect(201)
                    .then(res => {
                        expect(res.body).toMatchObject({ titulo: "Teclado Mecánico", precio: 15000, moneda: "ARS", stock: 7 })
                        return ProductModel.findById(res.body.id);
                    })
                    .then(model => {
                        expect(model).not.toBeNull();
                        expect(model.titulo).toBe("Teclado Mecánico")
                    })
            })
    })
})
