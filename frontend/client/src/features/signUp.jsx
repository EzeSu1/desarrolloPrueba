import React, {useState} from "react";
import {Box, Button, FormControl, InputLabel, Select, Stack, TextField, Typography} from "@mui/material";
import PasswordField from "../components/passwordField";
import {Link} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";


const SignUp = () => {
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [telefono, setTelefono] = useState("")
    const [tipo, setTipo] = useState("")
    const [password, setPassword] = useState("")

    const handleSignin = (e) => {
        e.preventDefault()

        const data = { nombre, email, telefono, tipo, password };
    }

    return (
        <Box sx={{ maxWidth: 700, mx: "auto", mt: 5, p: 4, boxShadow: 2, borderRadius: 2, display: "flex", flexDirection: "column", gap: 2, }}>
            <Typography variant="h5" fontWeight="bold" textAlign="center">Crear cuenta</Typography>

            <TextField label="Nombre" variant="outlined" fullWidth onChange={(e) => setNombre(e.target.value)}/>
            <TextField label="Email" variant="outlined" fullWidth onChange={(e) => setEmail(e.target.value)}/>
            <TextField label="Teléfono" variant="outlined" fullWidth onChange={(e) => setTelefono(e.target.value)}/>
            <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                <Select value={tipo} label="Tipo" onChange={(e) => setTipo(e.target.value)} variant="outlined">
                    <MenuItem value="CLIENTE">Cliente</MenuItem>
                    <MenuItem value="VENDEDOR">Vendedor</MenuItem>
                </Select>
            </FormControl>
            <PasswordField onChange={(e) => setPassword(e.target.value)} />

            <Button variant="contained" fullWidth onClick={handleSignin} sx={{ mt: 2, bgcolor: "button.bg", }}>CREAR CUENTA</Button>

            <Stack direction="row" spacing={1}   sx={{ justifyContent: "center", alignItems: "center", }}>
                <Typography variant="subtitle2">¿Ya tienes una cuenta?</Typography>
                <Button variant="text" component={Link} to="/logIn">Iniciar sesión</Button>
            </Stack>
        </Box>
    )
}

export default SignUp;