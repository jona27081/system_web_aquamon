import axios from 'axios';
const uri = "https://api-aquamon-v003-service-system-aquamon-jona27081.cloud.okteto.net"

const getPermissions = async (idAccess) => {
  try {
    const response = await axios.get(`${uri}/aquamon/permissions/${idAccess}/`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los permisos', error);
    return [];
  }
};

export default getPermissions;
