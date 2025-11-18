import { IconButton } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

const PrevArrow = ({ onClick }) => {
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: "absolute",
                left: 5,
                top: "50%",
                zIndex: 2,
                backgroundColor: "grey.400",
                "&:hover": { backgroundColor: "grey.500" }
            }}
        >
            <ChevronLeft />
        </IconButton>
    )
}

export default PrevArrow