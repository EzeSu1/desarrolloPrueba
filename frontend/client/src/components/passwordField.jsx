import { useState } from "react";
import {TextField, InputAdornment, IconButton} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const PasswordField = ({ label = "Contraseña", onChange, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField
            {...props}
            label={label}
            variant="outlined"
            fullWidth
            type={showPassword ? "text" : "password"}
            onChange={onChange}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default PasswordField;