// primertest.test.js
import { screen, render} from '@testing-library/dom';
import fs from 'fs';
import path from 'path';

describe('Pruebas del HTML de BuscaMascotas', () => {
  let html;
  beforeEach(() => {
    // Lee el archivo HTML y almacénalo en una variable
    const filePath = path.resolve('src/index.html'); // Ajusta la ruta según la ubicación de tu archivo HTML
    html = fs.readFileSync(filePath, 'utf-8');
  });

  describe('BuscaMascotas HTML Elements', () => {
    beforeEach(() => {
      document.body.innerHTML = html;
    });
  
    test('Debe contener el título BuscaMascotas', () => {
       // Verifica que el título sea el esperado
      expect(document.title).toBe('BuscaMascotas');
    });
  
    test('Debe contener un enlace Registrarme', () => {
      const registerLink = screen.getByText('Registrarme');
      expect(registerLink).toBeInTheDocument();
      expect(registerLink).toHaveAttribute('href');
    });
  
    test('Debe contener un botón Buscar mascota', () => {
      expect(screen.getByText('Buscar mascota')).toBeInTheDocument();
    });
  
    test('Verifica la presencia de imágenes del carrusel', () => {
      const images = document.querySelectorAll('.carousel-inner img');
      expect(images.length).toBeGreaterThanOrEqual(1); // Asegura que al menos 1 imagen esté presente.
    });
  
    test('Debe contener la sección Sobre Nosotros', () => {
      expect(screen.getByText('Sobre nosotros')).toBeInTheDocument();
    });
  
    test('Debe contener la sección Nuestros Servicios', () => {
      expect(screen.getByText('Nuestros')).toBeInTheDocument();
      expect(screen.getByText('Servicios')).toBeInTheDocument();
    });
  
    test('Verifica la presencia de elementos en la sección Info', () => {
      const cityText = screen.getByText('Santiago de Chile');
      const phoneText = screen.getByText('+562 600 600 3282');
      const emailText = screen.getByText('buscaMascotaOrg@gmail.com');
  
      expect(cityText).toBeInTheDocument();
      expect(phoneText).toBeInTheDocument();
      expect(emailText).toBeInTheDocument();
    });
  
    test('Verifica que el pie de página contenga el texto © 2024 BuscaMascotas', () => {
      expect(screen.getByText('© 2024 BuscaMascotas')).toBeInTheDocument();
    });
  
    test('Verifica la presencia de botones en la sección slider', () => {
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThanOrEqual(1); // Al menos un botón en el slider.
    });
  });
});


