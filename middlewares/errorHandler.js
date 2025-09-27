import {PedidoDoesNotExist} from "../errors/PedidoDoesNotExist.js";
import {UserDoesNotExist} from "../errors/UserDoesNotExist.js";
import {ProductoDoesNotExist} from "../errors/ProductoDoesNotExist.js";
import {InvalidPedidoEstadoError} from "../errors/InvalidPedidoEstadoError.js";
import {CompradorDoesNotExist} from "../errors/CompradorDoesNotExist.js";
import {InvalidPedidoItemsError} from "../errors/InvalidPedidoItemsError.js";
import {InvalidProductRolError} from "../errors/InvalidProductRolError.js";
import {NotificacionesDoesNotExist} from "../errors/NotificacionesDoesNotExist.js";
import {InvalidPedidoRolError} from "../errors/InvalidPedidoRolError.js";
import {ProductoSinStockError} from "../errors/ProductoSinStockError.js";

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
    if(err instanceof InvalidProductRolError){
        res.status(400).json({error: err.message})
        return;
    }

    if(err instanceof InvalidPedidoRolError){
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

    console.log(err.message)
    res.status(500).json({error:"Ups. Algo sucedio en el servidor."})

}


