import UsuariosRepository from "../repositories/usuariosRepository.js";
import PedidosService from "../services/pedidosService.js";
import ProductosService from "../services/productosService.js"
import UsuariosMapper   from "../mappers/usuariosMapper.js";
import NotificacionesService from "../services/notificacionesService.js";
import UsuariosValidator from "../services/validators/usuariosValidator.js";
import UsuariosService from "../services/usuariosService.js";
import {UserDoesNotExist} from "../errors/UserDoesNotExist.js"
import {beforeEach, describe, expect, jest, test} from "@jest/globals";
import ProductosValidator from "../services/validators/productosValidator.js";

NotificacionesService.obtenerNotificaciones = jest.fn();
jest.mock("../repositories/usuariosRepository.js")
jest.mock("../services/pedidosService.js")
jest.mock("../services/productosService.js")
jest.mock("../mappers/usuariosMapper.js")
jest.mock("../services/validators/usuariosValidator.js")
jest.mock("../repositories/notificacionesRepository.js")

describe("UsuariosService", () => {
    let usuariosRepositoryMock
    let notiMockRepo
    
    beforeEach(() => {
        jest.clearAllMocks();
        usuariosRepositoryMock = { save: jest.fn(), findById: jest.fn() }
        notiMockRepo = { findByUserId: jest.fn() }
        UsuariosRepository.mockImplementation(() => usuariosRepositoryMock)
        UsuariosService.usuariosRepository = usuariosRepositoryMock
    })
    
    test("Crear usuario",() => {
        const nuevo_usuario_json = {
            nombre: "Juan Perez",
            email: "juan.perez@example.com",
            telefono: "1122334455",
            tipo: "VENDEDOR",
        }

        const nuevo_usuario = {
            id: "68ded117d383dd820ee1efb2",
            nombre: "Juan Perez",
            email: "juan.perez@example.com",
            telefono: "1122334455",
            tipo: "VENDEDOR",
            fecha_alta: "2025-09-20T13:33:04.302Z"
        }

        UsuariosMapper.map.mockReturnValue(nuevo_usuario)
        usuariosRepositoryMock.save.mockResolvedValue(nuevo_usuario);
        
        return UsuariosService.crearUsuario(nuevo_usuario_json)
            .then((usuario) => {
                expect(UsuariosMapper.map).toHaveBeenCalledWith(nuevo_usuario_json);
                expect(usuariosRepositoryMock.save).toHaveBeenCalledWith(nuevo_usuario)
                expect(usuariosRepositoryMock.save).toHaveBeenCalledTimes(1)
                expect(usuario).toEqual(nuevo_usuario)
            })
    })
    
    test("Obtener un usuario por id", () => {
        const usuario = {
            _id: "68ded117d383dd820ee1efb2",
            nombre: "Juan Perez",
            email: "juan.perez@example.com",
            telefono: "1122334455",
            tipo: "VENDEDOR",
            fecha_alta: "2025-09-20T13:33:04.302Z"
        }

        usuariosRepositoryMock.findById.mockResolvedValue(usuario);
        UsuariosValidator.validarUsuario.mockReturnValue(usuario)

        return UsuariosService.obtenerUsuario("68ded117d383dd820ee1efb2")
            .then(usuario => {
                expect(usuariosRepositoryMock.findById).toHaveBeenCalledWith("68ded117d383dd820ee1efb2");
                expect(usuariosRepositoryMock.findById).toHaveBeenCalledTimes(1)
                expect(UsuariosValidator.validarUsuario).toHaveBeenCalledWith(usuario);
                expect(usuario).toEqual(
                    {
                        _id: "68ded117d383dd820ee1efb2",
                        nombre: "Juan Perez",
                        email: "juan.perez@example.com",
                        telefono: "1122334455",
                        tipo: "VENDEDOR",
                        fecha_alta: "2025-09-20T13:33:04.302Z"
                    });
            });
    });
    
    test("Obtener un usuario por id - no existe", () => {
         usuariosRepositoryMock.findById.mockImplementation(() => {
            return Promise.reject(new UserDoesNotExist())
         });

        return UsuariosService.obtenerUsuario("68ded117d383dd820pe1efb2")
            .catch(error => expect(error).toBeInstanceOf(UserDoesNotExist))
    })

    test("Obtener notificaciones de un usuario", () => {
        const usuario = {
            _id: "68e179db83b5fdd20617afb2",
            nombre: "Juan Perez",
            email: "juan.perez@example.com",
            telefono: "1122334455",
            tipo: "VENDEDOR",
            fecha_alta: "2025-09-20T13:33:04.302Z"
        }

        const notificacionesMock = [
            { _id: "68e179db83b5fdd20617afb2", usuario_destino: "68e179db83b5fdd20617afb2", mensaje:"Te llego un pedido que está pendiente de confirmación.", fecha_alta: "2025-09-20T13:33:04.302Z", leida: false, fecha_leida: null },
            { _id: "68e179db83b5fdd20617afb3", usuario_destino: "68e179db83b5fdd20617afb2", mensaje:"Te llego un pedido que está pendiente de confirmación.", fecha_alta: "2025-09-21T10:20:30.400Z", leida: true, fecha_leida: "2025-09-21T12:00:00.000Z" }
        ];

        UsuariosValidator.validarUsuario.mockReturnValue(usuario);
        //const filtros ={usuario_destino: "68e179db83b5fdd20617afb2"};
        NotificacionesService.obtenerNotificaciones.mockResolvedValue(notificacionesMock);
        usuariosRepositoryMock.findById.mockResolvedValue(usuario);
        return UsuariosService.obtenerUsuario("68e179db83b5fdd20617afb2")
            .then((usuario)=>{
                expect(usuariosRepositoryMock.findById).toHaveBeenCalledWith("68e179db83b5fdd20617afb2");
                expect(usuariosRepositoryMock.findById).toHaveBeenCalledTimes(1);
                expect(UsuariosValidator.validarUsuario).toHaveBeenCalledWith(usuario);
                expect(usuario).toEqual(usuario);
                return UsuariosService.obtenerNotificacionesUsuario("68e179db83b5fdd20617afb2",{})
            })
            .then((notificaciones)=>{
                expect(NotificacionesService.obtenerNotificaciones).toHaveBeenCalledWith({usuario_destino: "68e179db83b5fdd20617afb2"});
                expect(NotificacionesService.obtenerNotificaciones).toHaveBeenCalledTimes(1);
                expect(notificaciones).toEqual(notificacionesMock);
            })
        })
    
    test("Obtener productos de un vendedor", () => {   
        const usuario = {
            _id: "68e179db83b5fdd20617afb2",
            nombre: "Juan Perez",
            email: "juan.perez@example.com",
            telefono: "1122334455",
            tipo: "VENDEDOR",
            fecha_alta: "2025-09-20T13:33:04.302Z"
        }
        
        const productos =  [{"id":"68e179db83b5fdd20617afb6","vendedor":{"id":"68e179db83b5fdd20617afb2","nombre":"Juan Perez","email":"juan.perez@example.com","telefono":"1122334455","tipo":"VENDEDOR","fecha_alta":"2025-09-20T13:33:06.458Z"},"titulo":"Camiseta de algodón","descripcion":"Camiseta 100% algodón, color negro","categorias":[{"nombre":"ropa"},{"nombre":"hombre"}],"precio":2500,"moneda":"PESO_ARG","stock":50,"fotos":["foto1.jpg"],"activo":true},
                           {"id":"68e179db83b5fdd20617afb3","vendedor":{"id":"68e179db83b5fdd20617afb2","nombre":"Juan Perez","email":"juan.perez@example.com","telefono":"1122334455","tipo":"VENDEDOR","fecha_alta":"2025-09-20T13:33:06.458Z"},"titulo":"Camiseta de algodón","descripcion":"Camiseta 100% algodón, color negro","categorias":[{"nombre":"ropa"},{"nombre":"hombre"}],"precio":2500,"moneda":"PESO_ARG","stock":50,"fotos":["foto1.jpg"],"activo":true},
                           {"id":"68e179db83b5fdd20617afb4","vendedor":{"id":"68e179db83b5fdd20617afb2","nombre":"Juan Perez","email":"juan.perez@example.com","telefono":"1122334455","tipo":"VENDEDOR","fecha_alta":"2025-09-20T13:33:06.458Z"},"titulo":"Camiseta de algodón","descripcion":"Camiseta 100% algodón, color negro","categorias":[{"nombre":"ropa"},{"nombre":"hombre"}],"precio":2500,"moneda":"PESO_ARG","stock":50,"fotos":["foto1.jpg"],"activo":true}
                          ];
        
        UsuariosValidator.validarUsuario.mockReturnValue(usuario);
        UsuariosValidator.validarVendedor.mockReturnValue(usuario);
        usuariosRepositoryMock.findById.mockResolvedValue(usuario);
        ProductosService.obtenerProductosPaginado.mockResolvedValue(productos);
        return UsuariosService.obtenerUsuario("68e179db83b5fdd20617afb2")
            .then((usuario)=>{
                expect(usuariosRepositoryMock.findById).toHaveBeenCalledWith("68e179db83b5fdd20617afb2");
                expect(usuariosRepositoryMock.findById).toHaveBeenCalledTimes(1);
                expect(UsuariosValidator.validarUsuario).toHaveBeenCalledWith(usuario);
                expect(usuario).toEqual(usuario);
                return UsuariosService.obtenerProductosUsuario("68e179db83b5fdd20617afb2",1,{}, {})
            })  
            .then((productosObtenidos)=>{
                expect(UsuariosValidator.validarVendedor).toHaveBeenCalledWith(usuario);
                expect(ProductosService.obtenerProductosPaginado).toHaveBeenCalledWith(1, {vendedor: "68e179db83b5fdd20617afb2"}, {});
                expect(ProductosService.obtenerProductosPaginado).toHaveBeenCalledTimes(1);
                expect(productosObtenidos).toEqual(productos);
            })
    })

    test("Obtener pedidos de un usuario", () => {
         const usuario = {
            _id: "68e179db83b5fdd20617afb2",
            nombre: "Juan Perez",
            email: "juan.perez@example.com",
            telefono: "1122334455",
            tipo: "VENDEDOR",
            fecha_alta: "2025-09-20T13:33:04.302Z"
        }

        const pedidosMock = [{"id":1,"comprador":{"id":"68e179db83b5fdd20617afb2","nombre":"Juan Perez","email":"juan.perez@example.com","telefono":"1122334455","tipo":"COMPRADOR","fecha_alta":"2025-09-23T13:50:06.386Z"},"items":[{"producto":{"id":1,"vendedor":{"id":1,"nombre":"Juan Perez","email":"juan.perez@example.com","telefono":"1122334455","tipo":"VENDEDOR","fecha_alta":"2025-09-23T13:50:06.386Z"},"titulo":"Camiseta e algodón","descripcion":"Camiseta 100% algodón, color negro","categorias":[{"nombre":"ropa"},{"nombre":"hombre"}],"precio":2500,"moneda":"PESO_ARG","stock":50,"fotos":["foto1.jpg"],"activo":true},"cantidad":4,"precio_unitario":2500}],"total":10000,"moneda":"PESO_ARG","estado":"PENDIENTE","fecha_creacion":"2025-09-23T13:50:06.386Z","historial_estados":[{"fecha":"2025-09-23T13:50:06.386Z","estado":"PENDIENTE","usuario":{"id":2,"nombre":"Juan Perez","email":"juan.perez@example.com","telefono":"1122334455","tipo":"COMPRADOR","fecha_alta":"2025-09-23T13:50:06.386Z"},"motivo":"Creacion del pedido"}]},{"id":2,"comprador":{"id":2,"nombre":"Juan Perez","email":"juan.perez@example.com","telefono":"1122334455","tipo":"COMPRADOR","fecha_alta":"2025-09-23T13:50:06.385Z"},"items":[{"producto":{"id":1,"vendedor":{"id":1,"nombre":"Juan Perez","email":"juan.perez@example.com","telefono":"1122334455","tipo":"VENDEDOR","fecha_alta":"2025-09-23T13:50:06.385Z"},"titulo":"Camiseta e algodón","descripcion":"Camiseta 100% algodón, color negro","categorias":[{"nombre":"ropa"},{"nombre":"hombre"}],"precio":2500,"moneda":"PESO_ARG","stock":50,"fotos":["foto1.jpg"],"activo":true},"cantidad":4,"precio_unitario":2500}],"total":10000,"moneda":"PESO_ARG","direccion_entrega":{"calle":"Av. Siempre Viva","altura":742,"piso":3,"departamento":"B","codigo_postal":"1234","ciudad":"Springfield","provincia":"Buenos Aires","pais":"Argentina","latitud":-34.6037,"longitud":-58.3816},"estado":"PENDIENTE","fecha_creacion":"2025-09-23T13:50:06.385Z","historial_estados":[{"fecha":"2025-09-23T13:50:06.385Z","estado":"PENDIENTE","usuario":{"id":2,"nombre":"Juan Perez","email":"juan.perez@example.com","telefono":"1122334455","tipo":"COMPRADOR","fecha_alta":"2025-09-23T13:50:06.385Z"},"motivo":"Creacion del pedido"}]}]

        UsuariosValidator.validarUsuario.mockReturnValue(usuario);
        usuariosRepositoryMock.findById.mockResolvedValue(usuario);
        PedidosService.obtenerPedidosPorIdUsuario.mockResolvedValue(pedidosMock);   
        return UsuariosService.obtenerUsuario("68e179db83b5fdd20617afb2")
            .then((usuario)=>{
                expect(usuariosRepositoryMock.findById).toHaveBeenCalledWith("68e179db83b5fdd20617afb2");
                expect(usuariosRepositoryMock.findById).toHaveBeenCalledTimes(1);
                expect(UsuariosValidator.validarUsuario).toHaveBeenCalledWith(usuario);
                expect(usuario).toEqual(usuario);
                return UsuariosService.obtenerPedidosUsuario("68e179db83b5fdd20617afb2")
            })  
            .then((pedidosObtenidos)=>{
                expect(PedidosService.obtenerPedidosPorIdUsuario).toHaveBeenCalledWith("68e179db83b5fdd20617afb2");
                expect(PedidosService.obtenerPedidosPorIdUsuario).toHaveBeenCalledTimes(1);
                expect(pedidosObtenidos).toEqual(pedidosMock);
            })  
        })
  
})