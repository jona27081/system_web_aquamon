import React, { useState, useEffect } from 'react';
import "../styles/ListWaterPumps.css";
import ActualizarWaterPump from './ActualizarWaterPump';
import { deleteWaterPumps, getWaterPumps, getLogs } from '../services/WaterPumps.service';

const ListWaterPumps = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupDelete, setShowPopupDelete] = useState(false);
    const [showPopupUpdate, setShowPopupUpdate] = useState(false);
    const [waterPumps, setWaterPumps] = useState([]);
    const [selectedWaterPumpId, setSelectedWaterPumpId] = useState(null);
    const [waterLogs, setWaterLogs] = useState([]);

    const handleShowPopup = async (waterPumpId) => {
        setSelectedWaterPumpId(waterPumpId);
      
        try {
            console.log(waterPumpId);
          const data = await getLogs(waterPumpId);
          console.log(data);
          setWaterLogs(data);
          setShowPopup(true);
        } catch (error) {
          console.error("Error al obtener los logs de las bombas de agua:", error);
        }
      };      

    const handleClosePopup = () => {
        setShowPopup(false);
        setWaterLogs([]);
    };

    const handleShowPopupUpdate = (waterPumpId) => {
        setSelectedWaterPumpId(waterPumpId);
        setShowPopupUpdate(true);
    };

    const handleClosePopupUpdate = () => {
        setShowPopupUpdate(false);
    };

    const handleShowPopupDelete = () => {
        setShowPopupDelete(true);
    };

    const handleConfirmDelete = async (waterPumpId) => {
        try {
            console.log(waterPumpId)
            await deleteWaterPumps(waterPumpId);
            setShowPopupDelete(false);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }

    };

    const handleCancelDelete = () => {
        setShowPopupDelete(false);
    };

    useEffect(() => {
        const fetchWaterPumps = async () => {
            const data = await getWaterPumps();
            setWaterPumps(data);
        };

        fetchWaterPumps();
    }, []);

    return (
        <>
            <h1 className='title'>Bombas de Agua</h1>
            <div className="centered-Div">
                <div className="content-Wrapper">
                    {waterPumps.map((water) => {
                        return (
                            <div className="waterPumps">
                                <div className="top-right">
                                    <p className="employee-code">{water.id}</p>
                                </div>
                                <p className="personal-name">{water.name}</p>
                                <p className="personal-phone">{water.location}</p>
                                <p className="personal-status">{water.enabled}</p>
                                <p className="personal-status">Empleado Asignado: {water.assignment}</p>
                                <div className="bottom-right">
                                    <button className='allPermissions' onClick={() => handleShowPopup(water.id)}>
                                        Logs
                                    </button>
                                    {showPopup && water.id === selectedWaterPumpId && (
                                        <div className="popup-container">
                                            <div className='permissions-container'>
                                                {waterLogs.map((log) => {
                                                    return (
                                                        <div className='permission'>
                                                            <h2>NIVEL DE AGUA: {log.levelwater}</h2>
                                                            <h2>ESTADO: {log.pumpstate}</h2>
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
                                                    <button className="confirmation-modal-btn confirm" onClick={() => handleConfirmDelete(water.id)}>
                                                        Sí, eliminar
                                                    </button>
                                                    <button className="confirmation-modal-btn cancel" onClick={handleCancelDelete}>
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <button className='update' onClick={() => handleShowPopupUpdate(water.id)}>Actualizar</button>
                                    {showPopupUpdate && water.id === selectedWaterPumpId && (
                                        <ActualizarWaterPump
                                        idForUpdate={water.id}
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

export default ListWaterPumps;


