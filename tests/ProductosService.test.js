import { beforeEach, expect, jest } from "@jest/globals"
import {ProductoDoesNotExist} from "../errors/ProductoDoesNotExist"
describe("ProductosService", ()=>{
    let mockRepoProducto
    let producto
    beforeEach(()=>{
        mockRepoProducto ={
        save : jest.fn(),
        findById : jest.fn(),
        findByPage : jest.fn()
    }
    producto={"id":1,"vendedor":{"id":1,"nombre":"Juan Perez","email":"juan.perez@example.com","telefono":"1122334455","tipo":"VENDEDOR","fecha_alta":"2025-09-20T13:33:06.458Z"},"titulo":"Camiseta de algodón","descripcion":"Camiseta 100% algodón, color negro","categorias":[{"nombre":"ropa"},{"nombre":"hombre"}],"precio":2500,"moneda":"PESO_ARG","stock":50,"fotos":["foto1.jpg"],"activo":true}

})
    
    test("Crear producto",()=>{
       
        mockRepoProducto.save.mockResolvedValue(producto);
        return mockRepoProducto.save(producto)
            .then(productoCreado=>{
                expect(mockRepoProducto.save).toHaveBeenCalledWith(producto)
                expect(mockRepoProducto.save).toHaveBeenCalledTimes(1)
                expect(productoCreado).toEqual({"id":1,"vendedor":{"id":1,"nombre":"Juan Perez","email":"juan.perez@example.com","telefono":"1122334455","tipo":"VENDEDOR","fecha_alta":"2025-09-20T13:33:06.458Z"},"titulo":"Camiseta de algodón","descripcion":"Camiseta 100% algodón, color negro","categorias":[{"nombre":"ropa"},{"nombre":"hombre"}],"precio":2500,"moneda":"PESO_ARG","stock":50,"fotos":["foto1.jpg"],"activo":true}
        )
            })

    })
    test("Obtener un producto por id", () => {
       
        

        mockRepoProducto.findById.mockResolvedValue(producto);

        // usamos return para que Jest espere la Promise
        return mockRepoProducto.findById(1)
            .then((productoBuscado) => {
                expect(mockRepoProducto.findById).toHaveBeenCalledWith(1);
                expect(mockRepoProducto.findById).toHaveBeenCalledTimes(1)
                expect(productoBuscado).toEqual({"id":1,"vendedor":{"id":1,"nombre":"Juan Perez","email":"juan.perez@example.com","telefono":"1122334455","tipo":"VENDEDOR","fecha_alta":"2025-09-20T13:33:06.458Z"},"titulo":"Camiseta de algodón","descripcion":"Camiseta 100% algodón, color negro","categorias":[{"nombre":"ropa"},{"nombre":"hombre"}],"precio":2500,"moneda":"PESO_ARG","stock":50,"fotos":["foto1.jpg"],"activo":true});
            });
    });
    
    test("Obtener un producto por id inexistente lanza ProductoDoesNotExist",() => {
        mockRepoProducto.findById.mockImplementation((id) => {
            return Promise.reject( new ProductoDoesNotExist());
        });

        return mockRepoProducto.findById(999)
            .catch((error)=>{      
                    expect(error).toBeInstanceOf(ProductoDoesNotExist);
                    expect(error.message).toBe("No existe un producto con ese ID.")
            })
    
  });
  test("obtenerProductosPaginado", async () => {
    const productosMock = [{"id":1,"vendedor":{"id":1,"nombre":"Juan Perez","email":"juan.perez@example.com","telefono":"1122334455","tipo":"VENDEDOR","fecha_alta":"2025-09-20T13:33:06.458Z"},"titulo":"Camiseta de algodón","descripcion":"Camiseta 100% algodón, color negro","categorias":[{"nombre":"ropa"},{"nombre":"hombre"}],"precio":2500,"moneda":"PESO_ARG","stock":50,"fotos":["foto1.jpg"],"activo":true},
                           {"id":2,"vendedor":{"id":1,"nombre":"Juan Perez","email":"juan.perez@example.com","telefono":"1122334455","tipo":"VENDEDOR","fecha_alta":"2025-09-20T13:33:06.458Z"},"titulo":"Camiseta de algodón","descripcion":"Camiseta 100% algodón, color negro","categorias":[{"nombre":"ropa"},{"nombre":"hombre"}],"precio":2500,"moneda":"PESO_ARG","stock":50,"fotos":["foto1.jpg"],"activo":true},
                           {"id":3,"vendedor":{"id":1,"nombre":"Juan Perez","email":"juan.perez@example.com","telefono":"1122334455","tipo":"VENDEDOR","fecha_alta":"2025-09-20T13:33:06.458Z"},"titulo":"Camiseta de algodón","descripcion":"Camiseta 100% algodón, color negro","categorias":[{"nombre":"ropa"},{"nombre":"hombre"}],"precio":2500,"moneda":"PESO_ARG","stock":50,"fotos":["foto1.jpg"],"activo":true}
                          ];
    mockRepoProducto.findByPage.mockResolvedValue(productosMock);
    return  mockRepoProducto.findByPage(1, {}, {})
        .then((productos)=>{
            expect(mockRepoProducto.findByPage).toHaveBeenCalledWith(1, {}, {});
            expect(mockRepoProducto.findByPage).toHaveBeenCalledTimes(1);
            expect(productos).toEqual(productosMock);
        })
  });

})