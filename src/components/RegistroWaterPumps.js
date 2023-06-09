import React, { useState} from 'react';
import "../styles/Registro.css";
import { postWaterPumps } from '../services/WaterPumps.service';
import { useNavigate } from 'react-router-dom';

const RegistroWaterPumps = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [assignment, setAssignment] = useState('');
  const navigate = useNavigate();


  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handleAssignmentChange = (event) => {
    setAssignment(event.target.value);
  };

  const handleAgregar = async (event) => {
    event.preventDefault();
    const WaterPump = {
      name: name,
      location: location,
      assignment: assignment,
      enabled: "Enabled"
    };

    try {
      const response = await postWaterPumps(WaterPump);
      console.log(response)
      navigate('/');
    } catch (error) {
      console.error(error)
    }

  };

  return (
    <div className="centered-div">
      <div className="content-wrapper">

        <form className="form-container">
          <h2>Datos De Registro</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={handleNameChange}
            required
          />
          <input
            type="text"
            placeholder="Direccion"
            value={location}
            onChange={handleLocationChange}
            required />
          <input
            type="text"
            placeholder="Codigo de empleado asignado"
            value={assignment}
            onChange={handleAssignmentChange}
            required />

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

export default RegistroWaterPumps;




