import React, {useEffect, useState} from 'react'
import admins from '/Admins.png'
import Box from '@mui/material/Box';
import Decoración from '/Decoración.png'
import users from "../apis";


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

    const removeFilm=async (id) => {
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

    return (
        <div>
            {/* This elements are displayed when screen is medium or large */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <h1 style={{ padding: "40px 40px 0px 40px" }}>Administradores</h1>
                <img src={Decoración} alt="" style={{ padding: "0 0 40px 40px" }} />
            </Box>

            {/* This elements are displayed when screen is small */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <h1 style={{ padding: "10px 10px 0px 10px" }}>Administradores</h1>
                <img src={Decoración} alt="" style={{ padding: "0 0 10px 10px", maxWidth: "280px" }} />
            </Box>

            {/* RNF-03: it is required to have a search in the lists and to be able to search by name. */}
            <input
                type="text"
                value={search}
                placeholder="¿Qué persona deseas buscar?"
                onChange={handleChangeSearch}
                className="ui input circular icon"
                style={{ backgroundColor: "transparent", border: "2px solid #558AF2", color: "#558AF2", textAlign: "center", padding: "17px", borderRadius: "30px" }}
            />

            <table>
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
            </table>

            <img src={admins} alt="" style={{ maxWidth: "100vw" }} />
        </div>
    )
}
