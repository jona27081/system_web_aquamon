import axios from 'axios';
const uri = "https://api-aquamon-v003-service-system-aquamon-jona27081.cloud.okteto.net"

export const postWaterPumps = async (data) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const idAccess = userData.id;
  
    try {
      const response = await axios.post(`${uri}/aquamon/pumps/${idAccess}/`, data);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error al guardar bomba de agua: ', error);
      throw error;
    }
  };

export const getWaterPumps = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const idAccess = userData.id;
    try {
      const response = await axios.get(`${uri}/aquamon/pumps/${idAccess}/`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error al obtener bombas de agua: ", error);
      throw error;
    }
  };

  export const deleteWaterPumps = async (idForDelete) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const idAccess = userData.id;
    try {
      const response = await axios.delete(`${uri}/aquamon/pumps/${idAccess}/${idForDelete}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error al eliminar bomba de agua:", error);
      throw error;
    }
  };

  export const getLogs = async (idWaterPupm) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const idAccess = userData.id;
    try {
      const response = await axios.get(`${uri}/aquamon/logs/${idAccess}/${idWaterPupm}/`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error al obtener logs bombas de agua: ", error);
      throw error;
    }
  };

  export const updateWaterPump = async (idForUpdate, data) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const idAccess = userData.id;
    try {
      const response = await axios.put(`${uri}/aquamon/pumps/${idAccess}/${idForUpdate}`, data);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error al actualizar bomba de agua: ", error);
      throw error;
    }
  };