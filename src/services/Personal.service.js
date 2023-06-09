import axios from 'axios';
const uri = "https://api-aquamon-v003-service-system-aquamon-jona27081.cloud.okteto.net"

export const postPersonal = async (type, data) => {

  const userData = JSON.parse(localStorage.getItem("user"));
  const idAccess = userData.id;

  try {
    const response = await axios.post(`${uri}/aquamon/${type}/${idAccess}/`, data);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error al guardar personal: ', error);
    throw error;
  }
};

export const getPersonal = async (type) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const idAccess = userData.id;
  try {
    const response = await axios.get(`${uri}/aquamon/${type}/${idAccess}/`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error al obtener personal:", error);
    throw error;
  }
};

export const deletePersonal = async (type, idForDelete) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const idAccess = userData.id;
  try {
    const response = await axios.delete(`${uri}/aquamon/${type}/${idAccess}/${idForDelete}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error al eliminar personal:", error);
    throw error;
  }
};

export const updatePersonal = async (type, idForUpdate, data) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const idAccess = userData.id;
  try {
    const response = await axios.put(`${uri}/aquamon/${type}/${idAccess}/${idForUpdate}`, data);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error al actualizar personal: ", error);
    throw error;
  }
};