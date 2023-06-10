import React, { useState, useEffect } from 'react';
import "../styles/ListWaterPumps.css";
import { getPersonal, deletePersonal } from "../services/Personal.service"
import Actualizar from './Actualizar';
import { useNavigate } from 'react-router-dom';


const ListPersonalAdmins = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupDelete, setShowPopupDelete] = useState(false);
    const [showPopupUpdate, setShowPopupUpdate] = useState(false);
    const [personal, setPersonal] = useState([]);
    const [selectedAdminId, setSelectedAdminId] = useState(null);
    const navigate = useNavigate();

    const handleShowPopup = (adminId) => {
        setSelectedAdminId(adminId);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleShowPopupUpdate = (adminId) => {
        setSelectedAdminId(adminId);
        setShowPopupUpdate(true);
    };

    const handleClosePopupUpdate = () => {
        setShowPopupUpdate(false);
    };

    const handleShowPopupDelete = () => {
        setShowPopupDelete(true);
    };

    const handleConfirmDelete = async (adminId) => {
        setSelectedAdminId(adminId);

        try {
            console.log(adminId)
            await deletePersonal("admins", adminId);
            setShowPopupDelete(false);
            alert("Personal eliminado: ", adminId)
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
            const data = await getPersonal("admins");
            setPersonal(data);
        };

        fetchPersonal();
    }, []);

    return (
        <>
            <h1 className='title'>Administradores</h1>
            <div className="centered-Div">
                <div className="content-Wrapper">
                    {personal.map((admin) => {
                        return (
                            <div className="waterPumps">
                                <div className="top-right">
                                    <p className="employee-code">{admin.id}</p>
                                </div>
                                <p className="personal-name">{admin.name}</p>
                                <p className="personal-phone">{admin.phone}</p>
                                <p className="personal-status">{admin.active}</p>
                                <p className="personal-status">{admin.username}</p>
                                <p className="personal-status">{admin.password}</p>
                                <div className="bottom-right">
                                    <button className='allPermissions' onClick={() => handleShowPopup(admin.id)}>
                                        Ver Permisos
                                    </button>
                                    {showPopup && admin.id === selectedAdminId && (
                                        <div className="popup-container">
                                            <div className='permissions-container'>
                                                {admin.listPermissions.map((permissions) => {
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
                                                    <button className="confirmation-modal-btn confirm" onClick={() => handleConfirmDelete(admin.id)}>
                                                        Sí, eliminar
                                                    </button>
                                                    <button className="confirmation-modal-btn cancel" onClick={handleCancelDelete}>
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <button className='update' onClick={() => handleShowPopupUpdate(admin.id)}>Actualizar</button>
                                    {showPopupUpdate && admin.id === selectedAdminId && (
                                        <Actualizar
                                        type={"admins"}
                                        idForUpdate={admin.id}
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

export default ListPersonalAdmins;


