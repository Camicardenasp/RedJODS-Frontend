import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Decoración from '/Decoración.png'
import users from "../apis";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES } from '@mui/material/locale';
import EditButton from '/EditButton.svg'
import DeleteButton from '/DeleteButton.svg'
import { Link } from 'react-router-dom'


export default function Admins() {
    //Variable for fecthing users
    const [usersList, setUsersList]=useState([]);
    //variables for filtering throughout search
    const [search, setSearch]=useState([]);
    const [usersListSearched, setUsersListSearched]=useState([]);

    useEffect(() => {
        async function fetchData() {
            const { data }=await users.get("/api/v1/users");
            setUsersList(data);
            setUsersListSearched(data);
        }

        fetchData();
    }, []);

    const addFilm=async (user) => {
        const { data }=await users.post("/api/v1/users", user);
        setUsersList((oldList) => [...oldList, data]);
    };

    const removeUser=async (id) => {
        await users.delete(`/api/v1/users/${id}`);
        setUsersList((oldList) => oldList.filter((user) => user._id!==id));
    };

    


    const editFilm=async (id, user) => {
        await users.put(`/api/v1/users/${id}`, user);
    };

    //Code for search bar
    const handleChangeSearch = e => {
        setSearch(e.target.value);
        filtering(e.target.value);
    }

    const filtering=(searchTerm) => {
        var searchResult=usersList.filter((element) => {
            if (element.name.toString().toLowerCase().includes(searchTerm.toLowerCase()) || 
                element.lastname.toString().toLowerCase().includes(searchTerm.toLowerCase()
            )) {
                return element;
            }
        });
        setUsersListSearched(searchResult);
    }

    const handleCellClick = (param, event) => {
        event.stopPropagation();
    };

    const handleRowClick= (param, event) => {
        event.stopPropagation();
    };
    const handleDeleteClick = (param, event) => {
        removeUser(param._id)
    };

    //Array with the field names in the admins table
    const columns=[
        { field: 'name', headerName: 'Nombre', width: 150 },
        { field: 'lastname', headerName: 'Apellido', width: 150 },
        { field: 'email', headerName: 'Correo Electrónico', width: 280 },
        { field: 'password', headerName: 'Contraseña', width: 150 },
        { field: 'is_admin', headerName: 'SúperAdmin', width: 150 },
        { 
            field: 'Acciones', 
            headerName: 'Acciones', 
            renderCell: (cellValues, row) => {
                return (
                    <div>
                        <Button
                            variant="contained"
                            onClick={(event) => {
                                handleEditClick(event, cellValues)
                            }}
                            style={{ backgroundColor: "transparent" }}
                        >
                            <img src={EditButton} alt="" />
                        </Button>
                        <Button
                            variant="contained"
                            onClick={(event) => {
                                handleDeleteClick(cellValues._id)
                            }}
                            style={{ backgroundColor: "transparent" }}
                        >
                            <img src={DeleteButton} alt="" />
                        </Button>
                    </div>             
                )
            },
            width: 140 
        },
    ];

    //Theme to change the DataGrid Language
    const theme=createTheme(
        {
            palette: {
                primary: { main: '#1976d2' },
            },
        },
        esES,
    );

    return (
        <div>
            {/* This elements are displayed when screen is medium or large */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <div>
                        <h1 style={{ padding: "40px 40px 0px 40px" }}>Administradores</h1>
                        <img src={Decoración} alt="" style={{ padding: "0 0 0 40px", Width:"300px", flexGrow: "50%" }} />
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    {/* RNF-03: it is required to have a search in the lists and to be able to search by name. */}
                    <input
                        type="text"
                        value={search}
                        placeholder="¿Qué persona deseas buscar?"
                        onChange={handleChangeSearch}
                        className="ui input circular icon"
                        style={{ backgroundColor: "transparent", border: "2px solid #558AF2", color: "#558AF2", textAlign: "center", padding: "15px", borderRadius: "30px", width: "600px", margin: "0 0 15px 40px" }}
                    />
                    {/* Create User Button */}
                    <Link to="/newadmin">
                        <Button
                            style={{ backgroundColor: "green", color: "white", margin: "40px" }}
                        >
                            Crear Admin
                        </Button>
                    </Link>
                </div>
                

                {/* Table made with the DataGrid Template from MUI */}
                <ThemeProvider theme={theme}>
                    <div style={{ height: 400, width: '95vw', margin: "0 40px 40px 40px" }}>
                        <DataGrid
                            rows={usersListSearched}
                            getRowId={(row) => row._id}
                            columns={columns}
                            initialState={{
                                pagination: { paginationModel: { pageSize: 10 } },
                            }}
                            pageSizeOptions={[5, 10, 25, 50]}
                            onCellClick={handleCellClick}
                            onRowClick={handleRowClick}
                        />
                    </div>
                </ThemeProvider>

            </Box>

            {/* This elements are displayed when screen is small */}
            <Box sx={{ display: { xs: 'block', md: 'none' }, justifyContent: 'center', alignItems: 'center'}}>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <div>
                        <h1 style={{ padding: "40px 10px 0px 10px" }}>Administradores</h1>
                        <img src={Decoración} alt="" style={{ padding: "0 0 10px 10px", maxWidth: "280px" }} />
                    </div>
                    {/* RNF-03: it is required to have a search in the lists and to be able to search by name. */}
                    <input
                        type="text"
                        value={search}
                        placeholder="¿Qué persona deseas buscar?"
                        onChange={handleChangeSearch}
                        className="ui input circular icon"
                        style={{ backgroundColor: "transparent", border: "2px solid #558AF2", color: "#558AF2", textAlign: "center", padding: "15px", borderRadius: "30px", minWidth: "260px", marginBottom: "15px"}}
                    />
                </div>
                
                {/* Table made with the DataGrid Template from MUI */}
                <ThemeProvider theme={theme}>
                    <div style={{ height: 400, width: '100vw' }}>
                        <DataGrid
                            rows={usersListSearched}
                            getRowId={(row) => row._id}
                            columns={columns}
                            initialState={{
                                pagination: { paginationModel: { pageSize: 10 } },
                            }}
                            pageSizeOptions={[5, 10, 15, 20]}
                            onCellClick={handleCellClick}
                            onRowClick={handleRowClick}
                        />
                    </div>
                </ThemeProvider>

                {/* Create User Button */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Link to="/newadmin" >
                        <Button
                            style={{ backgroundColor: "green", color: "white", margin: "15px 0 15px 0" }}
                        >
                            Crear Admin
                        </Button>
                    </Link>
                </div>
                
            </Box>

            
            
                
            {/* <img src={admins} alt="" style={{ maxWidth: "100vw" }} /> */}

            {/* Versión sin MUI DataGrid */}

            {/* <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Contraseña</th>
                        <th>¿Es Admin?</th>
                    </tr>
                </thead>
                <tbody>
                    {usersListSearched.map((user) => (
                        <tr key={user._id}>
                            <td>
                                {user.name}
                            </td>
                            <td>
                                {user.lastname}
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                                {user.password}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}

        </div>
    )
}
