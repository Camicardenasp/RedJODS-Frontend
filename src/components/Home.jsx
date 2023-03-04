import React from 'react'
import home from '/Home.png'

export default function Home() {
    return (
        <div>
            <h1 style={{padding: "40px"}}>¡Hola Súper Administrador!</h1>
            <img src={home} alt="" style={{ maxWidth: "100vw" }} />
        </div>
    )
}
