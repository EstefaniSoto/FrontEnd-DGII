import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddContribuyenteModal from '../src/components/AddContribuyenteModal';

describe('AddContribuyenteModal Component', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn((e) => e.preventDefault());
  const mockSetContribuyente = jest.fn();
  const mockContribuyente = {
    rncCedula: '',
    nombre: '',
    tipo: true, // true para 'Persona física', false para 'Persona jurídica'
    estatus: true, // true para 'Activo', false para 'Inactivo'
  };

  test('renders the form when isOpen is true', () => {
    render(
      <AddContribuyenteModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        contribuyente={mockContribuyente}
        setContribuyente={mockSetContribuyente}
      />
    );

    // Verifica que el formulario está en el documento
    const form = screen.getByTestId('add-contribuyente-form');
    expect(form).toBeInTheDocument();

    // Verifica la presencia de los campos
    expect(screen.getByLabelText(/cédula/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tipo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/estatus/i)).toBeInTheDocument();
  });

  test('does not render the form when isOpen is false', () => {
    render(
      <AddContribuyenteModal
        isOpen={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        contribuyente={mockContribuyente}
        setContribuyente={mockSetContribuyente}
      />
    );

    // Verifica que el formulario no está en el documento
    expect(screen.queryByTestId('add-contribuyente-form')).not.toBeInTheDocument();
  });

  
  test('calls onSubmit when form is submitted', () => {
    render(
      <AddContribuyenteModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        contribuyente={mockContribuyente}
        setContribuyente={mockSetContribuyente}
      />
    );

    const form = screen.getByTestId('add-contribuyente-form');
    fireEvent.submit(form);

    // Verifica que la función onSubmit fue llamada
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  test('calls onClose when cancel button is clicked', () => {
    render(
      <AddContribuyenteModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        contribuyente={mockContribuyente}
        setContribuyente={mockSetContribuyente}
      />
    );

    const cancelButton = screen.getByText(/cancelar/i);
    fireEvent.click(cancelButton);

    // Verifica que la función onClose fue llamada
    expect(mockOnClose).toHaveBeenCalled();
  });
});
