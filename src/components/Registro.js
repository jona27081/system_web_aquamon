import React, { useState, useEffect } from 'react';
import "../styles/Registro.css";
import getPermissions from "../services/Permissions.service";
import {postPersonal} from '../services/Personal.service';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const [permissions, setPermissions] = useState([]);
  const [name, setName] = useState('');
  const [lastname, setLastame] = useState('');
  const [phone, setPhone] = useState('');
  const [seleccionado, setSeleccionado] = useState(false);
  const [is, setIs] = useState("");
  const [permissionsAssignment, setPermissionsAssignment] = useState([]);
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    setSeleccionado(event.target.checked);
    setIs(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleLastnameChange = (event) => {
    setLastame(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const addPermissionOfCheck = (event) => {
    const checkedValue = event.target.value;

    if (event.target.checked) {
      if (!permissionsAssignment.includes(checkedValue)) {
        console.log(checkedValue)
        setPermissionsAssignment([...permissionsAssignment, checkedValue]);
      }
    } else {
      const updatedPermissions = permissionsAssignment.filter(permission => permission !== checkedValue);
      console.log("Se elimino: ", checkedValue)
      setPermissionsAssignment(updatedPermissions);
    }
  }
  const handleAgregar = async (event) => {
    event.preventDefault();
    if (!seleccionado) {
      console.log('Debe seleccionar al menos un campo');
      return;
    }

    const Personal = {
      name: name,
      lastname: lastname,
      phone: phone,
      active: "Active",
      listPermissions: permissionsAssignment
    };

    try {
      const response = await postPersonal(is, Personal);
      console.log(response)
      alert("Personal agregado: ", Personal.name);
      navigate("/");
    } catch (error) {
      console.error(error)
      alert("Personal no pudo ser agregado: ", error.message);
    }

    

  };

  useEffect(() => {
    const idAccess = "AADAL07";
    const fetchPermissions = async () => {
      const data = await getPermissions(idAccess);
      setPermissions(data);
    };

    fetchPermissions();
  }, []);

  return (
    <div className="centered-div">
      <div className="content-wrapper">

        <form className="form-container">
          <h2>Datos De Registro</h2>
          <input
            type="text"
            placeholder="Nombres"
            value={name}
            onChange={handleNameChange}
            required
          />
          <input
            type="text"
            placeholder="Apellidos"
            value={lastname}
            onChange={handleLastnameChange}
            required />
          <input
            type="text"
            placeholder="Telefono"
            value={phone}
            onChange={handlePhoneChange}
            required />

          <div className="type">
            <input type="checkbox"
              value="employees"
              onChange={handleCheckboxChange}
            /> Empleado
            <input type="checkbox"
              value="admins"
              onChange={handleCheckboxChange}
            /> Administrador
          </div>

          <div className="permissions-container-registro">
            <h3>Seleccione los permisos a asignar:</h3>
            <div className="permissions-registro">
              {permissions.map((permission) => {
                return (
                  <div key={permission.id} className="permission-registro">
                    <input
                      type="checkbox"
                      id={permission.id}
                      value={permission.id}
                      onChange={addPermissionOfCheck}
                    />
                    <label htmlFor={permission.id}>{permission.permission}</label>
                  </div>
                );
              })}
            </div>
          </div>


          <button
            onClick={handleAgregar}
          >
            Agregar
          </button>
          <p className="l">Hola</p>

        </form>
      </div>
    </div>
  );
};

export default Registro;




