import { Link } from "react-router-dom";
import {Card, CardContent, CardMedia, Typography, Box} from "@mui/material";


const ProductItem = ({ producto }) => {
    return (
        <Link to={`/productos/${producto.id}`} style={{ textDecoration: "none", color: "inherit"}}>
            <Card sx={{width: "17rem", height: "23rem", marginY: 1, borderRadius: 3, boxShadow: 3, transition: "0.3s", "&:hover": { boxShadow: 6, transform: "scale(1.02)" }}}>
                <CardMedia component="img" image={producto.fotos[0]} alt={producto.titulo} sx={{height: "45%", backgroundColor: "#e3e1e1", objectFit: "contain", borderTopLeftRadius: 12, borderTopRightRadius: 12,}}/>
                <CardContent sx={{height: "55%", display: "flex", flexDirection: "column", justifyContent: "space-between", boxSizing: "border-box"}}>
                    <Typography sx={{ fontWeight: "bold", display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                        {producto.titulo}
                    </Typography>
                    <Box sx={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                        <Box>
                            <Typography variant="h6" sx={{textAlign: "left", color: "#055d1d", fontWeight: "bold"}}>
                                AR${producto.precio.toLocaleString("es-AR")}
                            </Typography>
                            <Typography sx={{color: "#0a8a1f", fontWeight: "bold", fontSize: ".9rem",}}>
                                {producto.stock} disponibles
                            </Typography>
                        </Box>
                        <Box sx={{display: "flex", gap: "3px", overflow: "hidden"}}>
                            {producto.categorias.map(categoria =>
                                <Typography key={categoria.nombre}  sx={{bgcolor: "#e8f1ff", px: 2, py: 0.5, borderRadius: 5, fontSize: ".8rem"}}>
                                    {categoria.nombre}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Link>
    );
};

export default ProductItem;