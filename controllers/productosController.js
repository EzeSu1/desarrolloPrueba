import ProductosService from "../services/productosService.js";
import { showBodyErrors, validarIdParam } from "./validadores.js"
import { productoSchema } from "./schemas/productoSchema.js";
import { ProductoDoesNotExist } from "../errors/ProductoDoesNotExist.js";
import ProductosDTOs from "../DTOs/productosDTO.js";



 class ProductosController {

    obtenerProducto(req, res, next) {
        const producto_id = validarIdParam(req, res)

        ProductosService.obtenerProducto(producto_id)
            .then(productoBuscado => {res.status(200).json(ProductosDTOs.productoToDTO(productoBuscado))})
            .catch(next)
    }

     mostrarProductos(req, res, next) {
        const filtros = req.query

         ProductosService.mostrarProductos(filtros)
             .then(productos => {res.status(200).json(ProductosDTOs.productosToDTO(productos))})
             .catch(next)
     }



    crearProducto(req, res, next) {
        const body = req.body
        const result_body = productoSchema.safeParse(body)

        if (!result_body.success) {
            return showBodyErrors(req, res, result_body)
        }

        ProductosService.crearProducto(result_body.data)
            .then(producto_creado => res.status(201).json(ProductosDTOs.productoToDTO(producto_creado)))
            .catch(next)
    }
}


export default new ProductosController();