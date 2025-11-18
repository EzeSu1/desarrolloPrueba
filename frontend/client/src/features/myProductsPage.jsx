import {useEffect, useState} from "react"
import {Box, Table, TableBody, TableCell, Tooltip, TableContainer, TableHead, TableRow, Paper, Chip, IconButton, Typography, Backdrop, Modal, Fade} from "@mui/material"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import { useTheme } from "@mui/material/styles"
import {getUserIdFromLocalStorage} from "../localStorage"
import {agregarStock, getProductosVendedor} from "../services/ProductosService"
import QuantitySelector from "../components/quantitySelector"
import SyncIcon from "@mui/icons-material/Sync"

const MyProductsPage = () => {
    const [productos, setProductos] = useState([])
    const [selectProduct, setselectProduct] = useState(null)
    const [quantity, setQuantity] = useState(0)
    const theme = useTheme()
    const vendedorId = getUserIdFromLocalStorage()
    const filtros = {}

    useEffect(() => {
        if (!vendedorId) return

        getProductosVendedor(vendedorId, filtros)
            .then(productos_obtenidos => { setProductos(productos_obtenidos) })
            .catch(err => console.error(err))
    }, [vendedorId])

    const handleOpen = (order) => setselectProduct(order)
    const handleClose = () => setselectProduct(null)
    const handleStockChange = (stock) => { setQuantity(stock) }

    const handleAgregarStock = (productId, cantidad) => {
        return agregarStock(productId, cantidad)
            .then((producto_actualizado) => {setProductos((prev) =>
                prev.map((p) => p.id === producto_actualizado.id ? { ...p, stock: producto_actualizado.stock } : p)
            )})
    }


    return (
        <Box p={3}>
            <Typography variant="h5" mb={2}>Mis productos</Typography>

            <TableContainer component={Paper} elevation={2}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Producto ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Detalle</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {productos.map((product) => (
                            <TableRow key={product.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.titulo}</TableCell>
                                <TableCell><Chip label={product.activo ? "Activo" : "Inactivo"} color={product.activo ? "success" : "error"} variant="outlined" size="small"/></TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell><IconButton color="primary" onClick={() => handleOpen(product)}><InfoOutlinedIcon /></IconButton></TableCell>

                                <TableCell align="center" sx={{ minWidth: 160 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, }}>
                                        <QuantitySelector value={quantity} onChange={(newStock) => handleStockChange(newStock)} min={0} max={999}/>
                                        <Tooltip title="Agregar stock" arrow>
                                            <IconButton color="success" size="small" onClick={() => handleAgregarStock(product.id, quantity)} sx={{ bgcolor: "success.main", color: "white", "&:hover": { bgcolor: "success.dark" }, width: 32, height: 32,}}>
                                                <SyncIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={!!selectProduct} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 300 } }}>
                <Fade in={!!selectProduct}>
                    <Box
                        sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", borderRadius: 2, boxShadow: 24, p: 4, width: "400px", backdropFilter: "blur(6px)",}}>
                        {selectProduct && (
                            <Box>
                                <Typography variant="h6" mb={2}>Detalle del Pedido {selectProduct.id}</Typography>
                                <img
                                    src={selectProduct.fotos[0]}
                                    alt={`Producto ${selectProduct.nombre}`}
                                    style={{ maxWidth: '100%', height: 'auto', borderRadius: 4 }}
                                />
                                <Typography variant="body2" mb={1}>Titulo: {selectProduct.titulo}</Typography>
                                <Typography variant="body2" mb={1}>Moneda: {selectProduct.moneda}</Typography>
                                <Typography variant="body2" mb={1}>Precio: {selectProduct.precio}</Typography>
                                <Typography variant="body2" mb={1}>Stock: {selectProduct.stock}</Typography>
                            </Box>
                        )}
                    </Box>
                </Fade>
            </Modal>
        </Box>
    )
}

export default MyProductsPage;