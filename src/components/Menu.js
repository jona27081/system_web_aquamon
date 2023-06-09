import React from "react"
import "../styles/Menu.css"

const Menu = () => {
    const toggleMenu = () => {
        document.querySelector(".contenedor").classList.toggle("open");
      };
      
    return (
        <span className="contenedor">
            <button className="burger transparent-button transparent-hover" onClick={toggleMenu}></button>
            <div className="background"></div>
            <div className="menu">
                <nav>
                    <a href="/personalemps" style={{ animationDelay: '0.2s' }}>Empleados</a>
                    <a href="/personaladms" style={{ animationDelay: '0.3s' }}>Administradores</a>
                    <a href="/addpersonal" style={{ animationDelay: '0.4s' }}>Registrar Personal</a>
                    <a href="/addwaterpump" style={{ animationDelay: '0.5s' }}>Registrar Bomba</a>
                    <a href="/" style={{ animationDelay: '0.6s' }}>Bombas</a>
                </nav>
            </div>
        </span>
    )
}

export default Menu;


