import {Card, CardMedia} from "@mui/material";
import Button from "@mui/material/Button";

const CategoryItem = ({categoria}) => {
    return(
        <Card sx={{ width: "100%", aspectRatio: 25/6, margin: "20px auto", borderRadius: "10px", position: "relative" }}>
            <CardMedia
                component="img"
                src={categoria.imagen}
                alt={categoria.nombre}
                sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "10px"
                }}
            />

            <Button
                variant="contained"
                sx={{
                    position: "absolute",
                    bottom: 16,
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    color: "white",
                    typography: "h5"
                }}
            >
                {categoria.nombre}
            </Button>
        </Card>
    )
}

export default CategoryItem;