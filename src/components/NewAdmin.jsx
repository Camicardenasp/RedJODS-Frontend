import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import users from "../apis";


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://redJODS.netlify.app">
                RedJODS
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme=createTheme();

export default function EditAdmin() {

    //Variable for fecthing users
    const [usersList, setUsersList]=useState([]);

    useEffect(() => {
        async function fetchData() {
            const { data }=await users.get("/api/v1/users");
            setUsersList(data);
        }

        fetchData();
    }, []);

    const addUser=async (user) => {
        const { data }=await users.post("/api/v1/users", user);
        setUsersList((oldList) => [...oldList, data]);
    };

    //Variables temporales
    const [name, setName]=useState("");
    const [lastname, setLastName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [is_admin, setIsAdmin]=useState(true);

    //Handling changes in input and submission of the form.
    const handleNameChange=(e) => {
        setName(e.target.value);
    };
    const handleLastNameChange=(e) => {
        setLastName(e.target.value);
    };
    const handleEmailChange=(e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange=(e) => {
        setPassword(e.target.value);
    };


    // It is an event handler that handles the submission of the form. When the user submits the form, this event handler takes the current values of the form fields (name, lastname, duration, password, date, and country) and passes them to the addUser method to add a new element.
    const handleSubmit=(e) => {
        e.preventDefault();

        console.log({
            name: name,
            lastname: lastname,
            email: email,
            password: password,
            is_admin: is_admin,
        });

        addUser({
            name: name,
            lastname: lastname,
            email: email,
            password: password,
            is_admin: true,
        });
        setName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setIsAdmin("");
    };

    // const handleSubmit=(event) => {
    //     event.preventDefault();
    //     const dataForm=new FormData(event.currentTarget);
    //     console.log({
    //         name: name,
    //         lastname: lastname,
    //         email: email,
    //         password: password,
    //         is_admin: is_admin,
    //     });
    // };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Crear Administrador
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Nombre"
                                    autoFocus
                                    onChange={handleNameChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastname"
                                    label="Apellido"
                                    name="lastname"
                                    autoComplete="family-name"
                                    onChange={handleLastNameChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo Electrónico"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleEmailChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handlePasswordChange}
                                />
                            </Grid>
                        </Grid>
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            <Link to="/admins">
                                Crear Administrador
                            </Link>
                        </Button>
                        {/* <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid> */}
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}