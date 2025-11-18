import UsuariosRepository from "../repositories/usuariosRepository.js"
import service from '../services/usuariosService.js'
import {beforeEach, describe, expect, jest, test} from "@jest/globals"
import NotificacionesService from "../services/notificacionesService.js"
import ProductosService from "../services/productosService.js"
import PedidosService from "../services/pedidosService.js"


describe("UsuariosService", () => {
    let save_spy
    let findById_spy
    let test_user = { _id: "68ddf7912e522f75405d4a2e", nombre: "juan", email: "jp@email.com", telefono: "1122334455", tipo: "COMPRADOR", fecha_alta: new Date() }

    beforeEach(() => {
        jest.clearAllMocks()

        jest.spyOn(NotificacionesService, "obtenerNotificaciones").mockResolvedValue([
            { id: "68g299543f00530b3f3ec15a", usuario_destino: "68g299543f00530b3f3ec15b", mensaje: "Hola", fecha_alta: "2025-11-10T10:00:00Z", leida: false, fecha_leida: null},
            { id: "68g299543f00530b3f3ec15c", usuario_destino: "68g299543f00530b3f3ec15b", mensaje: "Adiós", fecha_alta: "2025-11-10T11:00:00Z", leida: true, fecha_leida: "2025-11-10T12:00:00Z"}
        ])

        jest.spyOn(PedidosService, "obtenerPedidos").mockResolvedValue([
            { id: "68g299543f00530b3f3ec15d", comprador: "68g299543f00530b3f3ec15b", items: [{ productoId: "68g299543f00530b3f3ec15e", cantidad: 2 }], total: 500, moneda: "PESO_ARG", direccion_entrega: "Calle Falsa 123"},
            { id: "68g299543f00530b3f3ec15f", comprador: "68g299543f00530b3f3ec15b", items: [{ productoId: "68g299543f00530b3f3ec160", cantidad: 1 }], total: 350, moneda: "PESO_ARG", direccion_entrega: "Calle Verdadera 456"}
        ])

        jest.spyOn(ProductosService, "obtenerProductosPaginado").mockResolvedValue([
            { id: "68g299543f00530b3f3ec161", vendedor: "68g299543f00530b3f3ec162", titulo: "Producto 1", descripcion: "Descripción del producto 1", categorias: [{ id: "68g299543f00530b3f3ec163", nombre: "Categoria A" }, { id: "68g299543f00530b3f3ec164", nombre: "Categoria B" }], precio: 1200, moneda: "PESO_ARG", stock: 10, fotos: ["foto1.jpg", "foto2.jpg"]}
        ])

        findById_spy = jest.spyOn(UsuariosRepository, "findById").mockResolvedValue(test_user)
        save_spy = jest.spyOn(UsuariosRepository, "save").mockResolvedValue(test_user)
    })

    test("debería obtener un usuario por ID", () => {
        const usuario_id = "68ddf7912e522f75405d4a2e"

        return service.obtenerUsuario(usuario_id)
            .then(result => {
                expect(findById_spy).toHaveBeenCalledWith(usuario_id)
                expect(result._id).toBe("68ddf7912e522f75405d4a2e")
            })
    })

    test("debería obtener las notificaciones del usuario", () => {
        const filtros = {}

        return service.obtenerNotificacionesUsuario("68ddf7912e522f75405d4a2e", filtros)
            .then(result => {
                expect(findById_spy).toHaveBeenCalledWith("68ddf7912e522f75405d4a2e")
                expect(NotificacionesService.obtenerNotificaciones).toHaveBeenCalledWith({...filtros, usuario_destino: "68ddf7912e522f75405d4a2e"})
                expect(result.length).toBe(2)
            })
    })

    test("debería crear un nuevo usuario", () => {
        const json_usuario = {nombre: "juan", email: "jp@email.com", telefono: "1122334455", tipo: "COMPRADOR"}

        return service.crearUsuario(json_usuario)
            .then(result => {
                expect(save_spy).toHaveBeenCalled()
                expect(result._id).toBe("68ddf7912e522f75405d4a2e")
            })
    })
})
