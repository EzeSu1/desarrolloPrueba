export function obtenerRango(min,max){
    const rango ={}
    if (!min || !max ){
        return rango
    }
    return {precio: { $gte: min, $lte: max }}


}