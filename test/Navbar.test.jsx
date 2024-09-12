import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../src/components/Navbar'; 

describe('Navbar', () => {
  test('debería renderizar el componente correctamente', () => {
    // Renderizar el componente Navbar
    const { getByAltText } = render(<Navbar />);

    // Verificar que la imagen con el logotipo se muestre en el DOM
    const logo = getByAltText('');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/img/dgii_logo.png');
  });
});
