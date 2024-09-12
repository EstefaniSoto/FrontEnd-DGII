import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; 
import { RiUserAddLine } from "react-icons/ri"; 
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom'; 
import NewTransactionModal from '../components/NewTransactionModal'; 
import ContribuyenteTable from '../components/ContribuyenteTable'; 
import { getContribuyentes, addContribuyente } from '../../api/api'; 
import SearchAndFilter from './SearchAndFilter'; 
import AddContribuyenteModal from './AddContribuyenteModal'; 

const ContribuyenteList = () => {
  // Estados para manejar los datos de contribuyentes, filtrado, paginación y modales
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [newContribuyente, setNewContribuyente] = useState({
    rncCedula: '',
    nombre: '',
    tipo: true,
    estatus: false
  });
  const navigate = useNavigate(); // Hook para la navegación

  // Efecto para cargar los contribuyentes cuando el componente se monta
  useEffect(() => {
    getContribuyentes()
      .then(response => {
        setData(response.data); // Guarda los datos recibidos
        setFilteredData(response.data); // Establece los datos filtrados iniciales
      })
      .catch(error => console.error('Error fetching data:', error)); // Maneja errores de la API
  }, []);

  // Función para manejar cambios en los filtros de búsqueda
  const handleFilterChange = (filters) => {
    let filtered = data;

    // Filtra los datos según el término de búsqueda
    if (filters.searchTerm) {
      filtered = filtered.filter(contribuyente =>
        contribuyente.nombre.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        contribuyente.rncCedula.includes(filters.searchTerm)
      );
    }

    // Filtra por estatus (Activo/Inactivo)
    if (filters.statusFilter) {
      filtered = filtered.filter(contribuyente =>
        contribuyente.estatus === (filters.statusFilter === 'Activo')
      );
    }

    // Filtra por tipo (Persona física/Persona jurídica)
    if (filters.typeFilter) {
      filtered = filtered.filter(contribuyente =>
        contribuyente.tipo === (filters.typeFilter === 'Persona física')
      );
    }

    setFilteredData(filtered); // Actualiza los datos filtrados
    setCurrentPage(1); // Reinicia la página actual a 1
  };

  // Función para manejar el clic en una fila de la tabla
  const handleRowClick = (rncCedula) => {
    navigate(`/comprobantes/${rncCedula}`); // Navega a la página de comprobantes del contribuyente
  };

  // Función para cerrar el modal de añadir contribuyente y reiniciar el estado
  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewContribuyente({
      rncCedula: '',
      nombre: '',
      tipo: true,
      estatus: false
    });
  };

  // Función para manejar el envío del formulario en el modal de añadir contribuyente
  const handleModalSubmit = (e) => {
    e.preventDefault();

    // Valida que la cédula tenga exactamente 11 dígitos
    if (newContribuyente.rncCedula.length < 11 || newContribuyente.rncCedula.length > 11) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La cédula debe tener exactamente 11 números.',
      });
      return;
    }

    // Envía los datos del nuevo contribuyente a la API
    addContribuyente(newContribuyente)
      .then(() => {
        getContribuyentes() // Vuelve a obtener la lista actualizada de contribuyentes
          .then(response => {
            setData(response.data); // Actualiza los datos
            setFilteredData(response.data); // Actualiza los datos filtrados
          })
          .catch(error => console.error('Error fetching data:', error));
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Contribuyente añadido exitosamente.',
        });
        handleModalClose(); // Cierra el modal después de añadir el contribuyente
      })
      .catch(error => {
        console.error('Error adding contribuyente:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al añadir el contribuyente.',
        });
      });
  };

  return (
    <>
      <h1 className='pl-20 text-3xl font-bold text-gray-600 mt-14'>Listado de contribuyentes</h1>
      <section className='bg-white flex p-4 mt-5 mx-20 rounded-md'>
        <div className='flex gap-5'>
          {/* Botón para abrir el modal de añadir contribuyente */}
          <button
            onClick={() => setIsModalOpen(true)}
            className='text-white bg-color bg-hover transition-colors duration-300 focus:ring-4 focus:outline-none focus:ring-green-600 font-medium rounded-lg text-sm px-4 flex items-center gap-2 whitespace-nowrap'
          >
            <RiUserAddLine className="w-6 h-6" />
            Añadir usuario
          </button>
          {/* Botón para abrir el modal de nueva transacción */}
          <button
            onClick={() => setIsTransactionModalOpen(true)}
            className='text-white bg-color bg-hover transition-colors duration-300 focus:ring-4 focus:outline-none focus:ring-green-600 font-medium rounded-lg text-sm px-4 flex items-center gap-2 whitespace-nowrap'
          >
            <IoMdAdd className="w-6 h-6" />
            Nueva transacción
          </button>
          {/* Modal para nuevas transacciones */}
          <NewTransactionModal
            isOpen={isTransactionModalOpen}
            onClose={() => setIsTransactionModalOpen(false)}
          />
        </div>
        <div className='w-full'>
          {/* Componente de búsqueda y filtrado */}
          <SearchAndFilter
            onFilterChange={handleFilterChange}
          />
        </div>
      </section>

      {/* Modal para añadir contribuyente */}
      {isModalOpen && (
        <AddContribuyenteModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          contribuyente={newContribuyente}
          setContribuyente={setNewContribuyente}
        />
      )}

      {/* Tabla de contribuyentes */}
      <ContribuyenteTable
        rows={filteredData}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={setRowsPerPage}
        onRowClick={handleRowClick}
      />
    </>
  );
};

export default ContribuyenteList;
