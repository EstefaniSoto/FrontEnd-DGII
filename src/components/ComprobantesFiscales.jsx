import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getComprobantesByRncCedula } from '../../api/api';

const ComprobantesFiscales = () => {
  // Obtiene el rncCedula de la URL de los parámetros
  const { rncCedula } = useParams();
  
  // Estado para almacenar los comprobantes fiscales
  const [comprobantes, setComprobantes] = useState([]);
  
  // Estado para controlar la carga de datos
  const [loading, setLoading] = useState(true);
  
  // Estado para manejar errores
  const [error, setError] = useState(null);

  // Efecto que se ejecuta cuando el componente se monta o cambia rncCedula
  useEffect(() => {
    // Si no hay rncCedula, no hace nada
    if (!rncCedula) return;
  
    // Llama a la API para obtener los comprobantes fiscales
    getComprobantesByRncCedula(rncCedula)
      .then(response => {
        // En caso de éxito, actualiza el estado con los datos recibidos
        console.log('Datos recibidos:', response.data); 
        setComprobantes(response.data);
        setLoading(false);
      })
      .catch(err => {
        // En caso de error, actualiza el estado con el mensaje de error
        console.error('Error al obtener comprobantes:', err);
        if (err.response && err.response.status === 404) {
          setError('No se encontraron comprobantes fiscales para esta cédula.');
        } else {
          setError('Error de red');
        }
        setLoading(false);
      });
  }, [rncCedula]); // Dependencia para que el efecto se ejecute cada vez que rncCedula cambia
  
  // Renderiza un mensaje de carga mientras los datos se están obteniendo
  if (loading) return <p className="text-center text-gray-600 mt-20">Cargando...</p>;
  
  // Renderiza un mensaje de error si ocurre algún problema
  if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      {/* Título de la página */}
      <h1 className="text-2xl font-bold mt-20 mb-10 text-gray-700">Comprobantes Fiscales</h1>
      {comprobantes.length === 0 ? (
        // Mensaje cuando no hay comprobantes fiscales
        <div className="flex items-center justify-center p-6 bg-gray-100 rounded-lg shadow-lg">
          <p className="text-gray-600 text-center font-semibold">
            No posee comprobantes fiscales para esta cédula.
          </p>
        </div>
      ) : (
        // Tabla que muestra los comprobantes fiscales
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              {/* Encabezados de la tabla */}
              <th className="p-3 text-left text-gray-700">Cédula</th>
              <th className="p-3 text-left text-gray-700">NCF</th>
              <th className="p-3 text-left text-gray-700">Monto</th>
              <th className="p-3 text-left text-gray-700">ITBIS 18%</th>
            </tr>
          </thead>
          <tbody>
            {/* Filas de la tabla con los datos de los comprobantes */}
            {comprobantes.map((comprobante, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="p-3 text-gray-700">{comprobante.rncCedula}</td>
                <td className="p-3 text-gray-700">{comprobante.ncf}</td>
                <td className="p-3 text-gray-700">${comprobante.monto}</td>
                <td className="p-3 text-gray-700">${comprobante.itbis18}</td>
              </tr>
            ))}
            {/* Fila con el total del ITBIS 18% */}
            <tr className="bg-gray-100">
              <td className="p-3 text-white font-bold  bg-color" colSpan="3">Total ITBIS 18%</td>
              <td className="p-3 text-white font-bold bg-color">${comprobantes.reduce((total, comprobante) => total + comprobante.itbis18, 0)}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ComprobantesFiscales;
