import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { createComprobante } from '../../api/api'; 
const NewTransactionModal = ({ isOpen, onClose }) => {
  const [newTransaction, setNewTransaction] = useState({
    rncCedula: '',
    monto: 0,
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar los campos antes de enviar la solicitud
    if (!newTransaction.rncCedula || newTransaction.monto <= 0) {
      setError('Todos los campos son obligatorios y el monto debe ser mayor a 0.');
      return;
    }

    createComprobante(newTransaction)
      .then(() => {
        // Mostrar alerta de éxito
        Swal.fire({
          icon: 'success',
          title: 'Transacción creada',
          text: 'La transacción ha sido creada exitosamente.',
        });
        onClose(); // Cerrar el modal después de agregar la transacción
      })
      .catch((error) => {
        // Verificar el error específico y mostrar la alerta adecuada
        if (error.response && error.response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data || 'La cédula no existe en la lista de contribuyentes.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al crear la transacción.',
          });
        }
       
      });
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 transform transition-transform duration-300 ease-out scale-100">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-700">Nueva Transacción</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="rncCedula" className="block text-sm font-bold text-gray-700">
              Cédula
            </label>
            <input
              type="text"
              id="rncCedula"
              value={newTransaction.rncCedula}
              onChange={(e) => setNewTransaction({ ...newTransaction, rncCedula: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Ingrese la cédula"
              required
            />
          </div>
          <div>
            <label htmlFor="monto" className="block text-sm font-bold text-gray-700">
              Monto
            </label>
            <input
              type="number"
              id="monto"
              value={newTransaction.monto}
              onChange={(e) => setNewTransaction({ ...newTransaction, monto: parseFloat(e.target.value) })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Ingrese el monto"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-color text-white rounded-md bg-hover"
            >
              Añadir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTransactionModal;
