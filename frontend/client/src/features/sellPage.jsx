import React, {useState, useEffect} from "react"
import {Box, Button, Chip, TextField, Typography} from "@mui/material"
import {postProducto} from "../services/ProductosService"
import {getUserIdFromLocalStorage} from "../localStorage"
import {getCategorias} from "../services/CategoriasService"
import {useCategorias} from "../hooks/useCategorias";
const MAX_VISIBLES = 5


const SellPage = () => {
    const { data: categorias, isLoading, error } = useCategorias();
    const [titulo, setTitulo] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [precio, setPrecio] = useState(0)
    const [moneda, setMoneda] = useState("PESO_ARG")
    const [stock, setStock] = useState(0)
    const [fotos, setFotos] = useState("")
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([])
    const [mostrarTodas, setMostrarTodas] = useState(false)

    if(isLoading) {
        return
    }

    const seleccionarCategoria = (nombre) => {
        if (!categoriasSeleccionadas.includes(nombre)) {
            setCategoriasSeleccionadas([...categoriasSeleccionadas, nombre])
        }
    }
    
    const eliminarCategoria = (nombre) => {
        setCategoriasSeleccionadas(prev =>
            prev.filter(cat => cat !== nombre)
        )
    }

    const handleSell = (e) => {
        e.preventDefault()
        const vendedorId = getUserIdFromLocalStorage()
        const categoriasPayload = categoriasSeleccionadas.map(c => ({ nombre: c }))
        const producto = {titulo, descripcion, cat: categoriasPayload, precio, moneda, stock, fot: [fotos]}

        return postProducto(vendedorId, producto)
            .then(productoCreado =>
                console.log("Producto creado exitosamente:", productoCreado.id))
            .catch(error =>
                console.error("Fallo durante la creación del producto:", error))
    }

    const categoriasVisibles = mostrarTodas ? categorias : categorias.slice(0, MAX_VISIBLES);


    return (
        <Box
            sx={{ maxWidth: 700, mx: "auto", mt: 5, p: 4, boxShadow: 3, borderRadius: 3, display: "flex", flexDirection: "column", gap: 2, background: "#fff", }}>
            <Typography variant="h5" fontWeight="bold" textAlign="center">Vender producto</Typography>

            <TextField label="Título" fullWidth onChange={(e) => setTitulo(e.target.value)} />
            <TextField label="Descripción" fullWidth multiline minRows={3} onChange={(e) => setDescripcion(e.target.value)} />
            <TextField label="Precio" type="number" fullWidth onChange={(e) => setPrecio(e.target.value)} />
            <TextField label="Stock" type="number" fullWidth onChange={(e) => setStock(e.target.value)} />
            <TextField label="Foto (URL)" fullWidth value={fotos} onChange={(e) => setFotos(e.target.value)}/>

            <Typography fontWeight="bold" mt={1}>Categorías</Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {categoriasVisibles.map((cat) => (<Chip key={cat.id} label={cat.nombre} clickable onClick={() => seleccionarCategoria(cat.nombre)} color="logo" sx={{ px: 1.5, py: 0.5 }}/>))}
                {!mostrarTodas && categorias.length > MAX_VISIBLES && (<Chip label="+ Más" clickable onClick={() => setMostrarTodas(true)} variant="outlined" sx={{ borderColor: "button.bg", color: "button.bg", "&:hover": {backgroundColor: "button.bg", color: "white"} }}/>)}
            </Box>

            {categoriasSeleccionadas.length > 0 && (
                <Box>
                    <Typography fontWeight="bold">Seleccionadas:</Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {categoriasSeleccionadas.map((nombre) => (<Chip key={nombre} label={nombre} onDelete={() => eliminarCategoria(nombre)} sx={{ backgroundColor: "button.bg", color: "white", "& .MuiChip-deleteIcon": {color: "#ffffff"}, "& .MuiChip-deleteIcon:hover": {color: "#ffffff"}}}/>))}
                    </Box>
                </Box>
            )}

            <Button variant="contained" fullWidth onClick={handleSell} sx={{ mt: 2, bgcolor: "button.bg", borderRadius: 2, py: 1.2 }}>
                PUBLICAR
            </Button>
        </Box>
    )
}

export default SellPage;