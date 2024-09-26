import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Habilitar los matchers de Jest DOM
import Index from './index'; // Componente que vamos a probar

test('verifica si el componente tiene la clase correcta y está en el DOM', () => {
  render(<Index />); // Renderiza el componente en un entorno de prueba DOM

  const myElement = screen.getByText('BuscaMascotas'); // Busca un elemento por texto
  expect(myElement).toBeInTheDocument(); // Verifica si está en el DOM
  //expect(myElement).toHaveClass('mi-clase-css'); // Verifica si tiene una clase CSS
});
