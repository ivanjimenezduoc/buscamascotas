import { screen } from '@testing-library/dom';
import fs from 'fs';
import path from 'path';

describe('Pruebas del HTML de BuscaMascotas', () => {
  let html;
  
  beforeEach(() => {
    const filePath = path.resolve('src/index.html'); // Ajusta la ruta según la ubicación
    html = fs.readFileSync(filePath, 'utf-8');
  });

  describe('BuscaMascotas HTML Elements', () => {
    beforeEach(() => {
      document.body.innerHTML = html;
    });

    test('Debe contener el título BuscaMascotas', () => {
      const titleElement = document.querySelector('title');
      expect(titleElement).not.toBeNull();
      expect(titleElement.textContent).toBe('BuscaMascotas');
    });

    test('Debe contener indicadores del carrusel', () => {
      const indicators = document.querySelectorAll('.carousel-indicators li');
      expect(indicators.length).toBeGreaterThanOrEqual(1);
    });

    test('Debe contener imágenes dentro del carrusel', () => {
      const images = document.querySelectorAll('.carousel-inner img');
      expect(images.length).toBeGreaterThan(0); // Al menos una imagen.
    });

    test('Debe contener la sección Sobre nosotros', () => {
      expect(screen.getByText('Sobre nosotros')).toBeInTheDocument();
    });

    test('Debe contener un pie de página con el texto correcto', () => {
      expect(screen.getByText(/© 2024 BuscaMascotas/i)).toBeInTheDocument();
    });

    test('Debe contener el carrusel con clase .carousel', () => {
      const carousel = document.querySelector('.carousel');
      expect(carousel).not.toBeNull();
    });
  });
});
