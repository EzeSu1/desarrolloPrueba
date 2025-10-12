import PedidosRepository from "../repositories/pedidosRepository.js"
import { ItemPedido } from "../models/entities/itemPedido.js"
import ProductosService from "../services/productosService.js";
import UsuariosService from "../services/usuariosService.js"
import PedidosMapper from "../mappers/pedidosMapper.js";
import NotificacionesService from "../services/notificacionesService.js";
import DireccionesMapper from "../mappers/direccionesMapper.js";
import PedidosValidator from "../services/validators/pedidosValidator.js"
import UsuariosValidator from "../services/validators/usuariosValidator.js";
import ProductosValidator from "../services/validators/productosValidator.js"
import PedidosService from "../services/pedidosService.js"
import { describe, test } from "@jest/globals";
import e from "express";


jest.mock("../repositories/pedidosRepository.js")
jest.mock("../services/productosService.js");
jest.mock("../services/usuariosService.js");
jest.mock("../services/notificacionesService.js");
jest.mock("../mappers/pedidosMapper.js");
jest.mock("../mappers/direccionesMapper.js");
jest.mock("../services/validators/productosValidator.js");
jest.mock("../services/validators/usuariosValidator.js");
jest.mock("../services/validators/pedidosValidator.js");


describe("PedidosService", ()=>{
    let mockRepoPedido
    beforeEach(()=>{
        jest.clearAllMocks();
        mockRepoPedido={
            findById : jest.fn(),
            save : jest.fn(),
            findByUserId : jest.fn(),
            update : jest.fn()
        }
        PedidosRepository.mockImplementation(() => mockRepoPedido)
        PedidosService.pedidosRepository = mockRepoPedido
    })
    test("crearPedido", () => {    
        const nuevoPedidoJson = {
            "compradorId": "68e179db83b5fdd20617afb2",
            "items": [{ "productoId": "68dd2ca5c4db8b5f969311d7", "cantidad": 50 }],
            "moneda": "PESO_ARG",
            "direccionEntrega": {
                "calle": "Av. Siempre Viva",
                "altura": 742,
                "piso": 3,
                "departamento": "B",
                "codigo_postal": "1234",
                "ciudad": "Springfield",
                "provincia": "Buenos Aires",
                "pais": "Argentina",
                "latitud": -34.6037,
                "longitud": -58.3816
            }
        };

        const compradorMock = {
            _id: "68e179db83b5fdd20617afb2",
            nombre: "Juan Perez",
            email: "juan.perez@example.com",
            telefono: "1122334455",
            tipo: "COMPRADOR",
            fecha_alta: "2025-09-20T13:33:04.302Z"
        };

        const productoMock = {
            _id: "68dd2ca5c4db8b5f969311d7",
            vendedor: "68ded117d383dd820ee1efb2",
            titulo: "plato ",
            descripcion: "ceramica",
            categorias: [{ nombre: "cocina" }, { nombre: "decoracion" }],
            precio: 130,
            moneda: "PESO_ARG",
            stock: 50,
            fotos: ["foto1.jpg"],
            activo: true
        };

        const itemPedidoMock = { producto: productoMock, cantidad: 50 };
        const direccionMock = { ...nuevoPedidoJson.direccionEntrega };
        const pedidoMappedMock = { comprador: compradorMock, items: [itemPedidoMock], direccion: direccionMock };
        const pedidoMock = { _id: "68dd2ca5c4db8b5f969311d8", ...pedidoMappedMock };

        UsuariosService.obtenerUsuario.mockResolvedValue(compradorMock);
        UsuariosValidator.validarComprador.mockReturnValue(true);
        ProductosService.obtenerProducto.mockResolvedValue(productoMock);
        ProductosValidator.validarProducto.mockReturnValue(true);
        ProductosValidator.validarStock.mockReturnValue(true);
        DireccionesMapper.map.mockReturnValue(direccionMock);
        PedidosMapper.map.mockReturnValue(pedidoMappedMock);
        mockRepoPedido.save.mockResolvedValue(pedidoMock);

        return PedidosService.crearPedido(nuevoPedidoJson).then((pedidoCreado) => {
            expect(UsuariosService.obtenerUsuario).toHaveBeenCalledWith(compradorMock._id);
            expect(UsuariosValidator.validarComprador).toHaveBeenCalledWith(compradorMock);
            expect(ProductosService.obtenerProducto).toHaveBeenCalledWith(productoMock._id);
            expect(ProductosValidator.validarProducto).toHaveBeenCalledWith(productoMock);
            expect(ProductosValidator.validarStock).toHaveBeenCalledWith(productoMock, 50);
            expect(DireccionesMapper.map).toHaveBeenCalledWith(nuevoPedidoJson.direccionEntrega);

            expect(PedidosMapper.map).toHaveBeenCalledWith(
                expect.objectContaining(nuevoPedidoJson),
                expect.objectContaining(compradorMock),
                expect.arrayContaining([expect.objectContaining(itemPedidoMock)]),
                expect.objectContaining(direccionMock)
            );

            expect(mockRepoPedido.save).toHaveBeenCalledWith(pedidoMappedMock);
            expect(pedidoCreado).toEqual(pedidoMock);
        });
    });

    test("obtenerPedidosPorIdUsuario", () => {
        const pedidosMock = [
        { id: 1, comprador: "68e179db83b5fdd20617afb2", items: [] },
        { id: 2, comprador: "68e179db83b5fdd20617afb2", items: [] },
        ];

        mockRepoPedido.findByUserId.mockResolvedValue(pedidosMock);
        PedidosValidator.validarPedidos.mockReturnValue(pedidosMock);

        return PedidosService.obtenerPedidosPorIdUsuario("68e179db83b5fdd20617afb2")
            .then((pedidos) => {
                expect(mockRepoPedido.findByUserId).toHaveBeenCalledWith({ comprador: "68e179db83b5fdd20617afb2" });
                expect(PedidosValidator.validarPedidos).toHaveBeenCalledWith(pedidosMock);
                expect(pedidos).toEqual(pedidosMock);
        
        });
    })
    /*
    test("obtenerPedidosPorIdUsuario - sin pedidos", async () => {
        mockRepoPedido.findByUserId.mockResolvedValue([]);

        await expect(PedidosService.obtenerPedidosPorIdUsuario("68e179db83b5fdd20617afb2")).rejects.toThrow(
        "No se encontraron pedidos para el usuario"
        );

        expect(mockRepoPedido.findByUserId).toHaveBeenCalledWith({ comprador: "68e179db83b5fdd20617afb2" });
    });
    */

    test("actualizarPedido ", () => {
        const idPedido = "68dd2ca5c4db8b5f969311d8";
        const nuevoEstadoJson = {
        usuarioId: "68e179db83b5fdd20617afb2",
        estado: "ENVIADO",
        motivo: "Pedido enviado",
        };

        
        const vendedorMock = {
            _id: "68e179db83b5fdd20617afb9",
            nombre: "Juan Perez",
            email: "juan.perez@example.com",
            telefono: "1122334455",
            tipo: "VENDEDOR",
            fecha_alta: "2025-09-20T13:33:04.302Z"
        };
    

        const pedidoMock = {
        id: idPedido,
        estado: "PENDIENTE",
        comprador: { id: "68e179db83b5fdd20617afb2" },
        };

        const pedidoActualizadoMock = {
        ...pedidoMock,
        estado: "ENVIADO",
        };

        UsuariosService.obtenerUsuario.mockResolvedValue(vendedorMock);
        UsuariosValidator.validarUsuario.mockReturnValue(vendedorMock);
        mockRepoPedido.findById.mockResolvedValue(pedidoMock);
        PedidosValidator.validarPedido.mockReturnValue(pedidoMock);
        PedidosValidator.validarCambioEstado.mockReturnValue(pedidoMock);
        mockRepoPedido.update.mockResolvedValue(pedidoActualizadoMock);
        NotificacionesService.crearNotificacion.mockResolvedValue();

        return PedidosService.actualizarPedido(idPedido, nuevoEstadoJson)
            .then((pedidoActualizado)=>{
                expect(UsuariosService.obtenerUsuario).toHaveBeenCalledWith(nuevoEstadoJson.usuarioId);
                expect(UsuariosValidator.validarUsuario).toHaveBeenCalledWith(vendedorMock);
                expect(mockRepoPedido.findById).toHaveBeenCalledWith(idPedido);
                expect(PedidosValidator.validarPedido).toHaveBeenCalledWith(pedidoMock);
                expect(PedidosValidator.validarCambioEstado).toHaveBeenCalledWith(pedidoMock, nuevoEstadoJson.estado);
                expect(mockRepoPedido.update).toHaveBeenCalledWith(
                idPedido,
                vendedorMock,
                nuevoEstadoJson.estado,
                nuevoEstadoJson.motivo
                );
                expect(NotificacionesService.crearNotificacion).toHaveBeenCalledWith(pedidoActualizadoMock);
                expect(pedidoActualizado).toEqual(pedidoActualizadoMock);

            })

        
    })


})