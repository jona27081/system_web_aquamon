import React, { useState } from 'react';
import "../styles/Login.css";
import login from "../services/Login.service";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [access, setAcess] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const setNone = () => {
    setErrorMessage("")
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const IniciarSesion = async (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await login(data);

      // Guardar la respuesta en el Local Storage si el inicio de sesión es exitoso
      localStorage.setItem("user", JSON.stringify(response));
      setAcess("Iniciando...");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Credenciales incorrectas. Por favor, inténtalo nuevamente.');
      } else {
        setErrorMessage('Error al iniciar sesión. Por favor, inténtalo nuevamente más tarde.');
      }
    }
  };

  return (
    <div className="centeredDiv">
      <div className="contentWrapper">
        <form className="formContainer">
          <h2>Inicio de Sesion</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button onClick={IniciarSesion} onMouseOver={setNone}>
            Iniciar Sesion
          </button>
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          {access && <p className="accessMessage">{access}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;

