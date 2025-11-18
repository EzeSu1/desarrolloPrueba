import PedidosService from "../services/pedidosService.js";
import PedidosRepository from "../repositories/pedidosRepository.js";
import PedidosValidator from "../services/validators/pedidosValidator.js";
import UsuariosService from "../services/usuariosService.js";
import UsuariosValidator from "../services/validators/usuariosValidator.js";
import ProductosService from "../services/productosService.js";
import ProductosValidator from "../services/validators/productosValidator.js";
import DireccionesMapper from "../mappers/direccionesMapper.js";
import PedidosMapper from "../mappers/pedidosMapper.js";
import NotificacionesService from "../services/notificacionesService.js";
import { ItemPedido } from "../models/entities/itemPedido.js";
import {beforeEach, describe, expect, jest, test} from "@jest/globals";

jest.mock("../repositories/pedidosRepository.js");
jest.mock("../services/validators/pedidosValidator.js");
jest.mock("../services/usuariosService.js");
jest.mock("../services/validators/usuariosValidator.js");
jest.mock("../services/productosService.js");
jest.mock("../services/validators/productosValidator.js");
jest.mock("../mappers/direccionesMapper.js");
jest.mock("../mappers/pedidosMapper.js");
jest.mock("../services/notificacionesService.js");


describe("PedidosService (solo .then())", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("obtenerPedido devuelve pedido validado", () => {

        const pedidoMock = { id: "p1" };
        const pedidoValidado = { id: "p1", validado: true };

        PedidosRepository.findById.mockResolvedValue(pedidoMock);
        PedidosValidator.validarPedido.mockReturnValue(pedidoValidado);

        return PedidosService.obtenerPedido("p1")
            .then(result => {
                expect(PedidosRepository.findById).toHaveBeenCalledWith("p1");
                expect(PedidosValidator.validarPedido).toHaveBeenCalledWith(pedidoMock);
                expect(result).toEqual(pedidoValidado);
            });
    });

    test("obtenerPedidos retorna pedidos validados", () => {

        const pedidos = [{}, {}];
        const pedidosValidados = [{ ok: true }, { ok: true }];

        PedidosRepository.findBy.mockResolvedValue(pedidos);
        PedidosValidator.validarPedidos.mockReturnValue(pedidosValidados);

        return PedidosService.obtenerPedidos({ estado: "PENDIENTE" })
            .then(result => {
                expect(PedidosRepository.findBy)
                    .toHaveBeenCalledWith({ estado: "PENDIENTE" });
                expect(PedidosValidator.validarPedidos)
                    .toHaveBeenCalledWith(pedidos);
                expect(result).toEqual(pedidosValidados);
            });
    });

    test("obtenerPedidosPaginado retorna pedidos validados", () => {

        const pedidos = [{}, {}, {}];
        const pedidosValidados = [{ v: 1 }, { v: 2 }, { v: 3 }];

        PedidosRepository.findbyPage.mockResolvedValue(pedidos);
        PedidosValidator.validarPedidos.mockReturnValue(pedidosValidados);

        return PedidosService
            .obtenerPedidosPaginado(2, { comprador: "123" }, { fecha: -1 })
            .then(result => {

                expect(PedidosRepository.findbyPage)
                    .toHaveBeenCalledWith(2, { comprador: "123" }, { fecha: -1 });

                expect(PedidosValidator.validarPedidos)
                    .toHaveBeenCalledWith(pedidos);

                expect(result).toEqual(pedidosValidados);
            });
    });

    test("crearPedido sigue todo el flujo correctamente", () => {

        const body = {
            compradorId: "u123",
            direccionEntrega: { calle: "X", altura: 100 },
            items: [
                { productoId: "prod1", cantidad: 2 }
            ]
        };

        const comprador = { id: "u123", nombre: "Pepe" };
        const productoBuscado = {
            id: "prod1",
            vendedor: "v999",
            precio: 10
        };

        const itemPedidoInstance = new ItemPedido(productoBuscado, 2);

        const direccionMapeada = { calle: "X", altura: 100 };

        const pedidoMapeado = { id: "pedidoNuevo", items: [itemPedidoInstance] };
        const pedidoGuardado = { id: "pedidoNuevo", saved: true };

        UsuariosService.obtenerUsuario.mockResolvedValue(comprador);
        UsuariosValidator.validarComprador.mockReturnValue(true);

        ProductosService.obtenerProducto.mockResolvedValue(productoBuscado);
        ProductosValidator.validarProducto.mockReturnValue(true);
        ProductosValidator.validarStock.mockReturnValue(true);

        DireccionesMapper.map.mockReturnValue(direccionMapeada);

        PedidosMapper.map.mockReturnValue(pedidoMapeado);

        ProductosService.reducirStock.mockResolvedValue(true);

        NotificacionesService.crearNotificacion.mockReturnValue(true);

        PedidosRepository.save.mockResolvedValue(pedidoGuardado);

        return PedidosService.crearPedido(body)
            .then(result => {

                // usuario
                expect(UsuariosService.obtenerUsuario)
                    .toHaveBeenCalledWith("u123");

                expect(UsuariosValidator.validarComprador)
                    .toHaveBeenCalledWith(comprador);

                // productos
                expect(ProductosService.obtenerProducto)
                    .toHaveBeenCalledWith("prod1");

                expect(ProductosValidator.validarProducto)
                    .toHaveBeenCalledWith(productoBuscado);

                expect(ProductosValidator.validarStock)
                    .toHaveBeenCalledWith(productoBuscado, 2);

                // direccion
                expect(DireccionesMapper.map)
                    .toHaveBeenCalledWith(body.direccionEntrega);

                // pedido final
                expect(PedidosMapper.map)
                    .toHaveBeenCalledWith(
                        body,
                        comprador,
                        "v999",
                        [itemPedidoInstance],
                        direccionMapeada
                    );

                expect(ProductosService.reducirStock)
                    .toHaveBeenCalledWith([itemPedidoInstance]);

                expect(NotificacionesService.crearNotificacion)
                    .toHaveBeenCalledWith(pedidoMapeado, "v999");

                expect(PedidosRepository.save)
                    .toHaveBeenCalledWith(pedidoMapeado);

                expect(result).toEqual(pedidoGuardado);
            });
    });
});
