import axios from 'axios';
const uri = "https://api-aquamon-v003-service-system-aquamon-jona27081.cloud.okteto.net"

const login = async (data) => {
  try {
    const response = await axios.post(`${uri}/aquamon/login`, data);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesion', error);
    throw error;
  }
};

export default login;