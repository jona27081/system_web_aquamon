import React, { useState, useEffect } from 'react';
import "../styles/ListWaterPumps.css";
import { getPersonal, deletePersonal } from "../services/Personal.service"
import Actualizar from './Actualizar';
import { useNavigate } from 'react-router-dom';

const ListPersonalEmpleados = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupDelete, setShowPopupDelete] = useState(false);
    const [showPopupUpdate, setShowPopupUpdate] = useState(false);
    const [personal, setPersonal] = useState([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const navigate = useNavigate();

    const handleShowPopup = (employeeId) => {
        setSelectedEmployeeId(employeeId);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleShowPopupUpdate = (employeeId) => {
        setSelectedEmployeeId(employeeId);
        setShowPopupUpdate(true);
    };

    const handleClosePopupUpdate = () => {
        setShowPopupUpdate(false);
    };

    const handleShowPopupDelete = () => {
        setShowPopupDelete(true);
    };

    const handleConfirmDelete = async (employeeId) => {
        setSelectedEmployeeId(employeeId);

        try {
            console.log(employeeId)
            await deletePersonal("employees", employeeId);
            setShowPopupDelete(false);
            alert("Personal eliminado: ", employeeId)
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Personal no pudo ser eliminado: ", error.message)
        }

    };

    const handleCancelDelete = () => {
        setShowPopupDelete(false);
    };

    useEffect(() => {
        const fetchPersonal = async () => {
            const data = await getPersonal("employees");
            setPersonal(data);
        };

        fetchPersonal();
    }, []);

    return (
        <>
            <h1 className='title'>Empleados</h1>
            <div className="centered-Div">
                <div className="content-Wrapper">
                    {personal.map((emp) => {
                        return (
                            <div className="waterPumps">
                                <div className="top-right">
                                    <p className="employee-code">{emp.id}</p>
                                </div>
                                <p className="personal-name">{emp.name}</p>
                                <p className="personal-phone">{emp.phone}</p>
                                <p className="personal-status">{emp.active}</p>
                                <p className="personal-status">{emp.username}</p>
                                <p className="personal-status">{emp.password}</p>
                                <div className="bottom-right">
                                    <button className='allPermissions' onClick={() => handleShowPopup(emp.id)}>
                                        Ver Permisos
                                    </button>
                                    {showPopup && emp.id === selectedEmployeeId && (
                                        <div className="popup-container">
                                            <div className='permissions-container'>
                                                {emp.listPermissions.map((permissions) => {
                                                    return (
                                                        <div className='permission'>
                                                            <h2>{permissions}</h2>
                                                        </div>
                                                    );
                                                })}
                                                <button className="close-button" onClick={handleClosePopup}>
                                                    Cerrar
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    <button className='delete' onClick={handleShowPopupDelete}>Eliminar</button>
                                    {showPopupDelete && (
                                        <div className="confirmation-modal">
                                            <div className="confirmation-modal-content">
                                                <h2>Confirmar eliminación</h2>
                                                <p className='question'>¿Estás seguro de que deseas eliminar esto?</p>
                                                <div className="confirmation-modal-actions">
                                                    <button className="confirmation-modal-btn confirm" onClick={() => handleConfirmDelete(emp.id)}>
                                                        Sí, eliminar
                                                    </button>
                                                    <button className="confirmation-modal-btn cancel" onClick={handleCancelDelete}>
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <button className='update' onClick={() => handleShowPopupUpdate(emp.id)}>Actualizar</button>
                                    {showPopupUpdate && emp.id === selectedEmployeeId && (
                                        <Actualizar
                                        type={"employees"}
                                        idForUpdate={emp.id}
                                        onCancel={handleClosePopupUpdate}
                                      />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div></>
    );
};

export default ListPersonalEmpleados;


