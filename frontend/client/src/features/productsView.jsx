import {Box, CircularProgress, Pagination, Slider, Typography, Button} from "@mui/material";
import ProductItem from "../components/productItem";
import {useEffect, useState} from "react";
import Splitbutton from "./splitbutton";
import {useProductos} from "../hooks/useProductos";


const ProductsView = ({titulo, filtros}) => {
    const filtrosIniciales = {titulo: filtros.titulo || "", categorias:filtros.categorias|| "", min_price: 0, max_price: 1500000, sort: "precio_asc", page: 1}
    const {productos, loading, totalPages, filters, setFilters} = useProductos(filtrosIniciales)
    const [filtrosInternos, setFiltrosInternos] = useState(filtrosIniciales)

    const handlePageChange = (_, newPage) => { setFilters(filtros_previos => ({ ...filtros_previos, page: newPage })) }
    const handleAplicarFiltros = () => { setFilters(filtros_previos => ({ ...filtros_previos, ...filtrosInternos, page: 1 })) }
    const handleSortChange = (newSortValue) => { setFiltrosInternos(filtros_previos => ({ ...filtros_previos, sort: newSortValue })) }
    const handlePriceChange = (_, [min, max]) => { setFiltrosInternos(filtros_previos => ({ ...filtros_previos, min_price: min, max_price: max })) }

    useEffect(() => {
        const nuevos = {titulo: filtros.titulo || "", categorias:filtros.categorias ||"", min_price: 0, max_price: 1500000, sort: "precio_asc", page: 1}
        setFiltrosInternos(nuevos)
        setFilters(nuevos)
    }, [filtros])

    if (loading) {
        return (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", gap: 2, }}>
                <CircularProgress color="primary" size={60} />
            </Box>
        )
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, p: 3 }}>
                    <Box sx={{ flex: { xs: "1 1 auto", md: "0 0 250px" }, borderRight: { md: "1px solid #ddd" }, p: 2, }}>
                        <Typography variant="h6" fontWeight="bold" mb={2}>Filtros</Typography>

                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", gap: 1, mb: 3 }}>
                            <Typography variant="subtitle2">Precio</Typography>
                            <Slider
                                onChange={handlePriceChange}
                                valueLabelDisplay="auto"
                                step={100000}
                                min={0}
                                max={3000000}
                                value={[filtrosInternos.min_price, filtrosInternos.max_price]}
                                sx={{ mb: 2 }}
                            />
                        </Box>

                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, mb: 3 }}>
                            <Typography variant="subtitle2">Ordenar por</Typography>
                            <Splitbutton onSortChange={handleSortChange} />
                        </Box>

                        <Button variant="contained" sx={{ bgcolor: "button.bg" }} fullWidth onClick={handleAplicarFiltros} disabled={JSON.stringify(filters) === JSON.stringify(filtrosInternos)}>
                            Aplicar Filtros
                        </Button>
                    </Box>

                    {(productos.length === 0) ?
                        <div style={{ padding: '20px', textAlign: 'center', flexGrow: 1 }}>
                            <Typography variant="h5" color="textSecondary">
                                No se encontraron productos para "{filtros.titulo}".
                            </Typography>
                            <p>Intenta ajustar tu búsqueda o revisa nuestros productos destacados.</p>
                        </div> :
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h5" fontWeight="bold" mb={2}>{titulo}</Typography>
                            <Box sx={{ display: "flex", flexDirection: {xs: "column", md: "row"}, alignContent: "space-around", flexWrap: "wrap", }}>
                                {productos.map((producto) => (<ProductItem key={producto.id} producto={producto}/>))}
                            </Box>
                        </Box>
                    }
                </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination count={totalPages} variant="outlined" shape="rounded" page={filters.page} onChange={handlePageChange}/>
            </Box>
        </Box>
    )
}

export default ProductsView;