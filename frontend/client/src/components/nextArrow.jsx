import { IconButton } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";

const NextArrow = ({ onClick }) => {
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: "absolute",
                right: 5,
                top: "50%",
                zIndex: 2,
                backgroundColor: "grey.400",
                "&:hover": { backgroundColor: "grey.500" },
            }}
        >
            <ChevronRight />
        </IconButton>
    )
}

export default NextArrow