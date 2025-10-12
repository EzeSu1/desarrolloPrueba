import {Repository} from "./repository.js";
import {ProductModel} from "../models/entities/producto.js";
import {obtenerRango} from "./functions/obtenerRango.js";


class ProductosRepository  extends Repository {
    constructor() {
        super(ProductModel);
    }

    findbyPage(pagina, filtros, ordenamiento) {
        const limit = 3
        if(ordenamiento.mostSold) {
            return this.findbyMostSold(pagina,limit, filtros)
        }
        return this.model.find(filtros)
            .limit(limit)
            .skip((pagina - 1) * limit)
            .sort(ordenamiento)
    }

    findbyMostSold(page, limitPerPage, filtros){
        const skip = (page-1)*(limitPerPage)
        return this.model.aggregate([
            { $lookup:{
                    from: "Pedidos",
                    let: { productoId: "$_id" },
                    pipeline: [
                        {$match : {estado: "ENVIADO"}},
                        {$unwind: "$items"},
                        {$match : {$expr:{$eq: ["$items.producto", "$$productoId"]}}},
                        {$group: {
                                _id: "$items.producto",
                                cantidadVendida: {$sum: "$items.cantidad"}
                            }}
                    ],
                    as : "productosVendidos" }},
            { $unwind: { path: "$productosVendidos", preserveNullAndEmptyArrays: true } }, // mantiene productos sin ventas
            { $match: filtros },
            { $sort: {"productosVendidos.cantidadVendida": -1}},
            { $skip: skip },
            { $limit: limitPerPage },
            {$project:{
                    vendedor: 1,
                    titulo: 1,
                    descripcion: 1,
                    categorias: 1,
                    precio: 1,
                    moneda: 1,
                    fotos: 1
                }
            }
        ])
    }


}

export default ProductosRepository