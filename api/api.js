import axios from 'axios';

// Usa la variable de entorno para definir la URL base
const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5054/api';

// Función para obtener la lista de contribuyentes
// Hace una solicitud GET a la ruta '/contribuyentes' en la API
export const getContribuyentes = () => {
  return axios.get(`${API_URL}/contribuyentes`);
};

// Función para agregar un nuevo contribuyente
// Hace una solicitud POST a la ruta '/contribuyentes' con los datos del contribuyente
export const addContribuyente = (contribuyente) => {
  return axios.post(`${API_URL}/contribuyentes`, contribuyente);
};

// Función para obtener los comprobantes fiscales asociados a una cédula específica
// Hace una solicitud GET a la ruta '/comprobantesFiscales/{rncCedula}' en la API
export const getComprobantesByRncCedula = (rncCedula) => {
  return axios.get(`${API_URL}/comprobantesFiscales/${rncCedula}`);
};

// Función para crear un nuevo comprobante fiscal
// Hace una solicitud POST a la ruta '/ComprobantesFiscales' con los datos del comprobante
export const createComprobante = (comprobante) => {
  return axios.post(`${API_URL}/ComprobantesFiscales`, comprobante);
};
