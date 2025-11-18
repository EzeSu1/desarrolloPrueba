import {PedidoDoesNotExist} from "../errors/PedidoDoesNotExist.js";
import {UserDoesNotExist} from "../errors/UserDoesNotExist.js";
import {ProductoDoesNotExist} from "../errors/ProductoDoesNotExist.js";
import {InvalidPedidoEstadoError} from "../errors/InvalidPedidoEstadoError.js";
import {CompradorDoesNotExist} from "../errors/CompradorDoesNotExist.js";
import {InvalidPedidoItemsError} from "../errors/InvalidPedidoItemsError.js";
import {NotificacionesDoesNotExist} from "../errors/NotificacionesDoesNotExist.js";
import {ProductoSinStockError} from "../errors/ProductoSinStockError.js";
import {InvalidRolError} from "../errors/InvalidRolError.js";
import {CategoriaDoesNotExist} from "../errors/CategoriaDoesNotExist.js";
import {CategoriasRepetidasError} from "../errors/CategoriasRepetidasError.js";


export function errorHandler(err, req, res, next){

    if(err instanceof UserDoesNotExist){
        res.status(404).json({error: err.message})
        return;
    }

    if(err instanceof CompradorDoesNotExist){
        res.status(404).json({error: err.message})
        return;
    }

    if(err instanceof NotificacionesDoesNotExist){
        res.status(404).json({error: err.message})
    }

    if(err instanceof ProductoDoesNotExist){
        res.status(404).json({error: err.message})
        return;
    }

    if(err instanceof InvalidPedidoEstadoError){
        res.status(400).json({error: err.message})
        return;
    }

    if(err instanceof InvalidPedidoItemsError){
        res.status(400).json({error: err.message})
        return;
    }

    if(err instanceof InvalidRolError){
        res.status(400).json({error: err.message})
        return;
    }
    
    if(err instanceof PedidoDoesNotExist){
        res.status(404).json({id: err.id , error: err.message})
        return;
    }

    if(err instanceof ProductoSinStockError){
        res.status(409).json({id: err.id , error: err.message})
        return;
    }

    if(err instanceof CategoriaDoesNotExist){
        res.status(404).json({error: err.message})
        return;
    }

    if(err instanceof CategoriasRepetidasError){
        res.status(400).json({error: err.message})
        return;
    }

    console.log(err);
    res.status(500).json({error:"Ups. Algo sucedio en el servidor."})
}