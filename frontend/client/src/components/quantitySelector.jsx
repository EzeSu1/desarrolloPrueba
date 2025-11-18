import { Box, IconButton, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";


const QuantitySelector = ({ value, onChange, min = 1, max = 99 }) => {
    const handleDecrease = () => { if (value > min) onChange(value - 1) }
    const handleIncrease = () => { if (value < max) onChange(value + 1) }

    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #ddd", borderRadius: "6px", width: 90, height: 36, backgroundColor: "#f6f8f8", px: 1, }}>
            <IconButton size="small" onClick={handleDecrease} sx={{ color: "#0e3926", p: 0.5 }}>
                <RemoveIcon fontSize="small" />
            </IconButton>

            <Typography sx={{ fontWeight: "bold" }}>{value}</Typography>

            <IconButton size="small" onClick={handleIncrease} sx={{ color: "#0e3926", p: 0.5 }}>
                <AddIcon fontSize="small" />
            </IconButton>
        </Box>
    )
}

export default QuantitySelector;