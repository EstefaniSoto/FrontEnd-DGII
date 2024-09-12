import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContribuyenteTable from '../src/components/ContribuyenteTable';

describe('ContribuyenteTable Component', () => {
  const mockRows = [
    { rncCedula: '00112345678', nombre: 'Juan Perez', tipo: true, estatus: true },
    { rncCedula: '00112345679', nombre: 'Maria Lopez', tipo: false, estatus: false },
    { rncCedula: '00112345680', nombre: 'Carlos Martinez', tipo: true, estatus: false },
  ];

  const mockOnPageChange = jest.fn();
  const mockOnRowsPerPageChange = jest.fn();
  const mockOnRowClick = jest.fn();

  const defaultProps = {
    rows: mockRows,
    rowsPerPage: 2,
    currentPage: 1,
    onPageChange: mockOnPageChange,
    onRowsPerPageChange: mockOnRowsPerPageChange,
    onRowClick: mockOnRowClick,
  };

  test('renders the table with correct rows', () => {
    render(<ContribuyenteTable {...defaultProps} />);

    // Verifica que las filas correctas se renderizan
    expect(screen.getByText('00112345678')).toBeInTheDocument();
    expect(screen.getByText('Juan Perez')).toBeInTheDocument();
    expect(screen.getByText('00112345679')).toBeInTheDocument();
    expect(screen.getByText('Maria Lopez')).toBeInTheDocument();
  });

  test('calls onPageChange when pagination buttons are clicked', () => {
    render(<ContribuyenteTable {...defaultProps} />);

    const nextPageButton = screen.getByTestId('page-button-2'); // Botón para la página 2
    fireEvent.click(nextPageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2); // Verifica que la página cambió a 2
  });

  test('calls onRowsPerPageChange when rows per page is changed', () => {
    render(<ContribuyenteTable {...defaultProps} />);

    const selectRowsPerPage = screen.getByRole('combobox');
    fireEvent.change(selectRowsPerPage, { target: { value: '10' } });

    expect(mockOnRowsPerPageChange).toHaveBeenCalledWith(10); // Verifica el cambio de filas por página
    expect(mockOnPageChange).toHaveBeenCalledWith(1); // La página debería resetearse a la 1
  });

  test('calls onRowClick when a row is clicked', () => {
    render(<ContribuyenteTable {...defaultProps} />);

    const row = screen.getByText('00112345678');
    fireEvent.click(row);

    expect(mockOnRowClick).toHaveBeenCalledWith('00112345678'); // Verifica que el click en la fila funciona
  });

  test('disables previous button on the first page', () => {
    render(<ContribuyenteTable {...defaultProps} />);

    const prevButton = screen.getByTestId('prev-button');
    expect(prevButton).toBeDisabled(); // Botón deshabilitado en la primera página
  });

  test('disables next button on the last page', () => {
    render(<ContribuyenteTable {...defaultProps} currentPage={2} />);

    const nextButton = screen.getByTestId('next-button');
    expect(nextButton).toBeDisabled(); // Botón deshabilitado en la última página
  });
});
