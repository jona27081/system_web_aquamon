import React, { useState, useEffect } from 'react';
import "../styles/Actualizar.css";
import getPermissions from "../services/Permissions.service";
import { updatePersonal } from '../services/Personal.service';

const Actualizar = ({ type, idForUpdate, onCancel}) => {
  const [permissions, setPermissions] = useState([]);
  const [phone, setPhone] = useState('');
  const [active, setActive] = useState('');
  const [seleccionado, setSeleccionado] = useState(false);
  const [newPermissionsAssignment, setNewPermissionsAssignment] = useState([]);

  const handleCheckboxChange = (event) => {
    setSeleccionado(event.target.checked);
    setActive(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const addPermissionOfCheck = (event) => {
    const checkedValue = event.target.value;

    if (event.target.checked) {
      if (!newPermissionsAssignment.includes(checkedValue)) {
        console.log(checkedValue)
        setNewPermissionsAssignment([...newPermissionsAssignment, checkedValue]);
      }
    } else {
      const updatedPermissions = newPermissionsAssignment.filter(permission => permission !== checkedValue);
      console.log("Se elimino: ", checkedValue)
      setNewPermissionsAssignment(updatedPermissions);
    }
  }
  const handleActualizar = async (event) => {
    event.preventDefault();
    console.log(idForUpdate)
    if (!seleccionado) {
      console.log('Debe seleccionar al menos un campo');
      return;
    }

    const updateDataPersonal = {
      phone: phone,
      active: active,
      listPermissions: newPermissionsAssignment
    };

    try {
      console.log(idForUpdate)
      const response = await updatePersonal(type, idForUpdate, updateDataPersonal);
      console.log(response)
      window.location.reload()
    } catch (error) {
      console.error(error)
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

  const handleCancel = () => {
    onCancel();
  }

  return (
    <div className="centeredDivActualizar">
      <div className="contentWrapperActualizar">

        <form className="formContainerActualizar">
          <h2>Datos A Actualizar</h2>
          <input
            type="text"
            className='phone'
            placeholder="Telefono"
            value={phone}
            onChange={handlePhoneChange}
            required />

          <div className="type">
            <input type="checkbox"
              value="Active"
              onChange={handleCheckboxChange}
            /> Active
            <input type="checkbox"
              value="Not Active"
              onChange={handleCheckboxChange}
            /> Not Active
          </div>

          <div className="permissionsContainerActualizar">
            <h3>Seleccione los permisos a asignar:</h3>
            <div className="permissionsActualizar">
              {permissions.map((permission) => {
                return (
                  <div key={permission.id} className="permissionActualizar">
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
            className='updateData'
            onClick={handleActualizar}
          >
            Agregar
          </button>
          <button
            type="button"
            className='cancelUpdateData'
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Actualizar;




