import React, { useState} from 'react';
import "../styles/Actualizar.css";
import { updateWaterPump } from '../services/WaterPumps.service';
import { useNavigate } from 'react-router-dom';

const Actualizar = ({idForUpdate, onCancel }) => {
  const [enabled, setEnabled] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [assignment, setAssignment] = useState('');
  const [seleccionado, setSeleccionado] = useState(false);
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
  const handleCheckboxChange = (event) => {
    setSeleccionado(event.target.checked);
    setEnabled(event.target.value);
  };

  const handleActualizar = async (event) => {
    event.preventDefault();
    if (!seleccionado) {
      console.log('Debe seleccionar al menos un campo');
      return;
    }

    const WaterPump = {
      name: name,
      location: location,
      assignment: assignment,
      enabled: enabled
    };

    try {
      const response = await updateWaterPump(idForUpdate, WaterPump);
      console.log(response)
      alert("Bomba actualizada: ", idForUpdate)
      navigate("/");
    } catch (error) {
      console.error(error)
      alert("Bomba no actualizada", error.message);
    }

  };

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
          <div className="type">
            <input type="checkbox"
              value="Enabled"
              onChange={handleCheckboxChange}
            /> Enabled
            <input type="checkbox"
              value="Not Enabled"
              onChange={handleCheckboxChange}
            /> Not Enabled
          </div>
          <button
            className='updateData'
            onClick={handleActualizar}
          >
            Actualizar
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




