import React from 'react';

// Componente para el modal de añadir un contribuyente
const AddContribuyenteModal = ({ isOpen, onClose, onSubmit, contribuyente, setContribuyente }) => {
  // Si el modal no está abierto, no renderiza nada
  if (!isOpen) return null;

  // Maneja los cambios en los campos del formulario
  const handleInputChange = (e) => {
    // Extrae el id y el valor del evento
    const { id, value } = e.target;

    // Actualiza el estado del contribuyente con el nuevo valor
    setContribuyente(prev => ({
      ...prev,
      [id]: id === 'tipo' ? value === 'Persona física' : id === 'estatus' ? value === 'Activo' : value
    }));
  };

  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Contenedor del modal con estilo */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 transform transition-transform duration-300 ease-out scale-100">
        {/* Título del modal */}
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-">Añadir Usuario</h2>
        {/* Formulario del modal */}
        <form className="space-y-4" onSubmit={onSubmit} data-testid="add-contribuyente-form">

          {/* Campo para la cédula */}
          <div>
            <label htmlFor="rncCedula" className="block text-sm font-medium text-gray-700">
              Cédula
            </label>
            <input
              type="text"
              id="rncCedula"
              value={contribuyente.rncCedula}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Ingrese la cédula"
              required
            />
          </div>
          
          {/* Campo para el nombre */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              value={contribuyente.nombre}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Ingrese el nombre"
              required
            />
          </div>
          
          {/* Selección de tipo */}
          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
              Tipo
            </label>
            <select
              id="tipo"
              value={contribuyente.tipo ? 'Persona física' : 'Persona jurídica'}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Persona física">Persona física</option>
              <option value="Persona jurídica">Persona jurídica</option>
            </select>
          </div>
          
          {/* Selección de estatus */}
          <div>
            <label htmlFor="estatus" className="block text-sm font-medium text-gray-700">
              Estatus
            </label>
            <select
              id="estatus"
              value={contribuyente.estatus ? 'Activo' : 'Inactivo'}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          
          {/* Botones para cancelar o añadir */}
          <div className="flex justify-end space-x-4">
            {/* Botón para cancelar */}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </button>
            {/* Botón para añadir */}
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

export default AddContribuyenteModal;
