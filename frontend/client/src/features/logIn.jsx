import React, { useState } from 'react'; // Assuming React and useState are imported
import {Link, useNavigate} from "react-router-dom";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import PasswordField from "../components/passwordField";
import {useUserContext} from "../contexts/userContext";
const API_BASE_URL ="https://mi-tienda-sol.onrender.com" //process.env.BACKEND_PRODUCTION_URI //process.env.REACT_APP_API_URL
function parseJwt (token) {
    if (!token) { return null; }
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const LogIn = () => {
    const {setIsLoggedIn} = useUserContext()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        const data = { user: username, password: password }
        fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(text || 'Error de conexión desconocido.');
                    });
                }

                return response.json();
            })
            .then((result) => {
                console.log(result.token);

                if (result.token) {
                    const decodedPayload = parseJwt(result.token);

                    //  Obtener el objeto de usuario desde el token decodificado
                    const userDataToStore = decodedPayload ? decodedPayload.user : null;
                    if (userDataToStore) {
                        console.log("Usuario decodificado:", userDataToStore);
                        localStorage.setItem('token', result.token);
                        localStorage.setItem('user_data', JSON.stringify(userDataToStore));

                        setIsLoggedIn(true)

                        navigate("/");
                    } else {
                        console.error('Token válido, pero no se encontró la data del usuario.');
                    }

                } else {
                    console.error('Credenciales inválidas (respuesta JSON sin token).');
                }
            })
            .catch((error) => {

                console.error('Fallo en el inicio de sesión:', error.message);

                alert('Error: ' + error.message);
            });
    };

    return (
        <Box sx={{ maxWidth: 700, mx: "auto", mt: 5, p: 4, boxShadow: 2, borderRadius: 2, display: "flex", flexDirection: "column", gap: 2, }}>
            <Typography variant="h5" fontWeight="bold" textAlign="center">Iniciar sesión</Typography>

            <TextField label="Usuario" variant="outlined" fullWidth onChange={(e) => setUsername(e.target.value)}/>
            <PasswordField onChange={(e) => setPassword(e.target.value)} />

            <Button variant="contained" color="primary" fullWidth onClick={handleLogin} sx={{ mt: 2, bgcolor: "button.bg", }}>INGRESAR</Button>

            <Stack direction="row" spacing={1}   sx={{ justifyContent: "center", alignItems: "center", }}>
                <Typography variant="subtitle2">¿No tienes cuenta aún?</Typography>
                <Button variant="text" component={Link} to="/signIn">Crear cuenta</Button>
            </Stack>
        </Box>
    )
}

export default LogIn;