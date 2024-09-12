// NewTransactionModal.test.jsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Swal from 'sweetalert2';
import NewTransactionModal from '../src/components/NewTransactionModal';
import { createComprobante } from '../api/api';

// Mock de SweetAlert2 y createComprobante
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

jest.mock('../api/api', () => ({
  createComprobante: jest.fn(),
}));

describe('NewTransactionModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render the modal when isOpen is true', () => {
    const { getByText } = render(<NewTransactionModal isOpen={true} onClose={() => {}} />);
    expect(getByText('Nueva Transacción')).toBeInTheDocument();
  });

  test('should not render the modal when isOpen is false', () => {
    const { queryByText } = render(<NewTransactionModal isOpen={false} onClose={() => {}} />);
    expect(queryByText('Nueva Transacción')).not.toBeInTheDocument();
  });


  test('should call createComprobante and show success alert on successful submission', async () => {
    createComprobante.mockResolvedValueOnce({});

    const { getByLabelText, getByText } = render(<NewTransactionModal isOpen={true} onClose={() => {}} />);
    
    fireEvent.change(getByLabelText('Cédula'), { target: { value: '00112345678' } });
    fireEvent.change(getByLabelText('Monto'), { target: { value: '100' } });
    fireEvent.click(getByText('Añadir'));

    await waitFor(() => {
      expect(createComprobante).toHaveBeenCalledWith({ rncCedula: '00112345678', monto: 100 });
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'success',
        title: 'Transacción creada',
        text: 'La transacción ha sido creada exitosamente.',
      });
    });
  });

  test('should show error alert if createComprobante fails', async () => {
    createComprobante.mockRejectedValueOnce({ response: { status: 400, data: 'Cédula no válida' } });

    const { getByLabelText, getByText } = render(<NewTransactionModal isOpen={true} onClose={() => {}} />);
    
    fireEvent.change(getByLabelText('Cédula'), { target: { value: '00112345678' } });
    fireEvent.change(getByLabelText('Monto'), { target: { value: '100' } });
    fireEvent.click(getByText('Añadir'));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'error',
        title: 'Error',
        text: 'Cédula no válida',
      });
    });
  });
});
