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
                    <Link to={"/personalemps"} style={{ animationDelay: '0.2s' }}>Empleados</Link>
                    <Link to={"/personaladms"} style={{ animationDelay: '0.3s' }}>Administradores</Link>
                    <Link to={"/addpersonal"} style={{ animationDelay: '0.4s' }}>Registrar Personal</Link>
                    <Link to={"/addwaterpump"} style={{ animationDelay: '0.5s' }}>Registrar Bomba</Link>
                    <Link to={"/"} style={{ animationDelay: '0.6s' }}>Bombas</Link>
                </nav>
            </div>
        </span>
    )
}

export default Menu;


