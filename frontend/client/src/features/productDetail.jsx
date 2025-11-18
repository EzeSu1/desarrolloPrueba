import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import {getProductoById, getProductosVendedor} from "../services/ProductosService";
import {useCartContext} from "../contexts/cartContext";
import ProductsCarousel from "../components/productsCarousel";
import {Box, Button, Stack, Typography} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import QuantitySelector from "../components/quantitySelector";

const ProductDetail = () => {
    const { id } = useParams()
    const [producto, setProducto] = useState(null)
    const [productosVendedor, setProductos] = useState([])
    const {addToCart} = useCartContext()
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        getProductoById(id)
            .then(producto_buscado => {
                console.log(producto_buscado.vendedor)
                setProducto(producto_buscado)
                return getProductosVendedor(producto_buscado.vendedor)
            })
            .then(productos_vendedor => {
                console.log(productos_vendedor)
                setProductos(productos_vendedor)
            })
            .catch(err => console.error(err))
    }, [id])

    if (!producto) {
        return (
            <div className="producto-item">
                <div className="producto-header">
                    <h1>Producto no encontrado</h1>
                    <p>No pudimos encontrar el producto deseado</p>
                </div>
            </div>
        )
    }

    const clicComprarProducto = () => { addToCart(producto, quantity) }


    return (
        <Box>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "flex-start", alignItems: "center", gap: 6, p: 4, }}>
                <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", }}>
                    <Box
                        component="img"
                        src={producto.fotos[0]}
                        alt={producto.titulo}
                        sx={{   width: 400,
                            height: 400,
                            objectFit: "contain",
                            borderRadius: 2,
                            border: "1px solid #eee",
                            backgroundColor: "#fafafa", }}
                    />
                </Box>

                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 2, }}>
                    <Typography variant="h6" fontWeight="bold">
                        {producto.titulo}
                    </Typography>

                    <Typography variant="h6" fontWeight="bold">
                        ${producto.precio}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Stack direction="row" spacing={2}>
                            <QuantitySelector value={quantity} onChange={setQuantity} min={1} max={10}/>
                            <Button variant="contained" size="large" sx={{ bgcolor: "button.bg" }} startIcon={<AddShoppingCartIcon /> } onClick={clicComprarProducto}>Agregar al carrito</Button>
                        </Stack>
                    </Box>
                </Box>
            </Box>
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <ProductsCarousel title="Más productos del mismo vendedor" viewMoreLink={`${producto.vendedor}/productos`} productos={productosVendedor} />
            </Box>
        </Box>
    )
}

export default ProductDetail;