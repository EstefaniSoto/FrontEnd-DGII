import React, { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";

const SearchAndFilter = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onFilterChange({ searchTerm: e.target.value, statusFilter, typeFilter });
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    onFilterChange({ searchTerm, statusFilter: e.target.value, typeFilter });
  };

  const handleTypeChange = (e) => {
    setTypeFilter(e.target.value);
    onFilterChange({ searchTerm, statusFilter, typeFilter: e.target.value });
  };

  return (
    <div className='flex flex-wrap gap-4 justify-end px-4 sm:px-0'>
      <div className="relative flex-grow max-w-xs sm:max-w-md">
        <input
          type="search"
          id="default-search"
          value={searchTerm}
          onChange={handleSearch}
          className="block w-full p-4 pl-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-transparent"
          placeholder="Buscar por nombre o RNC/Cédula..."
          required
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <IoSearchSharp className='h-6 w-6 text-gray-500' />
        </div>
      </div>
      <select
        aria-label="Filtro de estatus"
        value={statusFilter}
        onChange={handleStatusChange}
        className="block w-full sm:w-52 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-transparent"
      >
        <option value="">Todos los Estatus</option>
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>
      <select
        aria-label="Filtro de tipo"
        value={typeFilter}
        onChange={handleTypeChange}
        className="block w-full sm:w-52 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-transparent"
      >
        <option value="">Todos los Tipos</option>
        <option value="Persona física">Persona física</option>
        <option value="Persona jurídica">Persona jurídica</option>
      </select>
    </div>
  );
};

export default SearchAndFilter;
