// primertest.test.js
import { screen, render } from '@testing-library/dom';
import fs from 'fs';
import path from 'path';

describe('Pruebas del HTML de BuscaMascotas', () => {
  let html;

  beforeEach(() => {
    // Lee el archivo HTML y almacénalo en una variable
    const filePath = path.resolve('index.html'); // Ajusta la ruta según la ubicación de tu archivo HTML
    html = fs.readFileSync(filePath, 'utf-8');
  });

  test('verifica que el título sea BuscaMascotas', () => {
    document.body.innerHTML = html; // Inyecta el HTML en el DOM
    const title = document.querySelector('title').innerHTML; // Obtiene el título
    expect(title).toBe('BuscaMascotas'); // Verifica el título
  });

  test('verifica que el encabezado contenga el texto correcto', () => {
    document.body.innerHTML = html; // Inyecta el HTML en el DOM
    const headerText = screen.getByRole('heading', { name: /BuscaMascotas/i });
    expect(headerText).toBeInTheDocument(); // Verifica que el encabezado esté en el documento
  });

  test('verifica que haya un enlace a "Inicio"', () => {
    document.body.innerHTML = html; // Inyecta el HTML en el DOM
    const homeLink = screen.getByText(/Inicio/i); // Busca el enlace
    expect(homeLink).toBeInTheDocument(); // Verifica que el enlace esté en el documento
  });


});
