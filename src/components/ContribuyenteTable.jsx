import React from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ContribuyenteTable = ({
  rows,                   // Lista de filas de datos para la tabla
  rowsPerPage,            // Número de filas que se muestran por página
  currentPage,           // Página actual
  onPageChange,          // Función para cambiar la página
  onRowsPerPageChange,   // Función para cambiar el número de filas por página
  onRowClick             // Función para manejar el clic en una fila
}) => {
  // Calcula el índice de la última y primera fila en la página actual
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  
  // Obtiene las filas que se deben mostrar en la página actual
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);
  
  // Calcula el número total de páginas basado en el número de filas y filas por página
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  // Función para ir a la página siguiente
  const goToNextPage = () => onPageChange(prev => Math.min(prev + 1, totalPages));
  
  // Función para ir a la página anterior
  const goToPreviousPage = () => onPageChange(prev => Math.max(prev - 1, 1));
  
  // Maneja el cambio en el número de filas por página y reinicia la página actual a 1
  const handleRowsPerPageChange = (event) => {
    onRowsPerPageChange(Number(event.target.value));
    onPageChange(1);
  };

  // Crea los botones de paginación basados en el número total de páginas
  const paginationButtons = Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
    <button
      key={page}
      onClick={() => onPageChange(page)}
      className={`px-3 py-1 mx-1 rounded-full ${
        currentPage === page ? 'bg-color text-white' : 'bg-gray-200 text-gray-700'
      } bg-hover hover:text-white`}
      data-testid={`page-button-${page}`}
    >
      {page}
    </button>
  ));

  return (
    <section className="mx-20 my-8 overflow-hidden rounded-lg shadow-md">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left text-gray-700 font-bold tracking-wider">Cédula</th>
            <th className="p-3 text-left text-gray-700 font-bold tracking-wider">Nombre</th>
            <th className="p-3 text-left text-gray-700 font-bold tracking-wider">Tipo</th>
            <th className="p-3 text-left text-gray-700 font-bold tracking-wider">Estatus</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentRows.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-gray-50 hover:bg-gray-100 cursor-pointer' : 'bg-white hover:bg-gray-100 cursor-pointer'}
              onClick={() => onRowClick(row.rncCedula)}
            >
              <td className="p-3 text-gray-700 font-bold">{row.rncCedula}</td>
              <td className="p-3 text-gray-700">{row.nombre}</td>
              <td className="p-3 text-gray-700">
                <span className={`py-1 px-3 rounded-md font-bold ${
                  row.tipo ? 'bg-blue-100 text-blue-400' : 'bg-orange-100 text-orange-400'
                }`}>
                  {row.tipo ? "Persona física" : "Persona jurídica"}
                </span>
              </td>
              <td className="p-3 text-gray-700">
                <span className={`py-1 px-3 rounded-md font-bold ${
                  row.estatus ? 'bg-green-100 text-green-400' : 'bg-gray-200 text-gray-400'
                }`}>
                  {row.estatus ? "Activo" : "Inactivo"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center p-4 bg-white border-t">
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Mostrar</span>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="p-2 border rounded-lg text-gray-700 bg-white focus:outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
          <span className="text-gray-700">registros</span>
        </div>

        <div className="flex items-center">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`p-2 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text_green_chevron text_green_chevron_hover'}`}
            data-testid="prev-button"
          >
            <FaChevronLeft />
          </button>
          {paginationButtons}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`p-2 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text_green_chevron text_green_chevron_hover'}`}
            data-testid="next-button"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContribuyenteTable;
