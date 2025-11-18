import {useState, useEffect, useCallback} from "react"
import {getProductos, getPaginasTotales} from "../services/ProductosService"

export const useProductos = (initial_filters) => {
    const [productos, setProductos] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = useState(initial_filters)

    const obtenerProductos = useCallback(() => {
        setLoading(true)
        const startTime = Date.now()

        getProductos(filters)
            .then(productos_obtenidos => setProductos(productos_obtenidos))
            .catch((err) => console.error(err))
            .finally(() => {
                const elapsed = Date.now() - startTime
                const min = 800
                const remaining = Math.max(0, min - elapsed)
                setTimeout(() => setLoading(false), remaining)
            })

        getPaginasTotales(filters)
            .then((p) => setTotalPages(p))
            .catch((err) => console.error(err))
    }, [filters])

    useEffect(() => {
        obtenerProductos()
    }, [obtenerProductos])

    return {productos, loading, totalPages, filters, setFilters, obtenerProductos}
}