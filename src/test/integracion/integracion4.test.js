import { screen } from '@testing-library/dom';
import { waitFor } from '@testing-library/dom';
const fs = require('fs');
const path = require('path');

// Mock de google.maps.places.Autocomplete
global.google = {
    maps: {
      places: {
        Autocomplete: jest.fn().mockImplementation(() => ({
          setComponentRestrictions: jest.fn(),
          addListener: jest.fn(),
          getPlace: jest.fn().mockReturnValue({ geometry: { location: { lat: jest.fn(), lng: jest.fn() } } }),
        })),
      },
    },
  };

describe('Pruebas del HTML de BuscaMascotas', () => {
  let html;
  
  // Leer el archivo HTML antes de cada prueba
  beforeEach(() => {
    const filePath = path.resolve('src/templates/mascota_perdidas.html'); // Ajusta la ruta según la ubicación del archivo HTML
    html = fs.readFileSync(filePath, 'utf-8');
  });

  describe('BuscaMascotas HTML Elements', () => {
    beforeEach(() => {
      document.body.innerHTML = html;
      global.initMap = jest.fn();
    });

    test('Debe contener el título BuscaMascotas', () => {
      const titleElement = document.querySelector('title');
      expect(titleElement).not.toBeNull();
      expect(titleElement.textContent).toBe('BuscaMascotas - Mascotas Perdidas');
    });

    test('Debe contener el contenedor de mascotas perdidas', () => {
      const mascotasContainer = document.querySelector('#mascotas-container');
      expect(mascotasContainer).not.toBeNull();
    });

    test('Debe contener el mapa en el modal', () => {
      const mapElement = document.querySelector('#mapaMascota');
      expect(mapElement).not.toBeNull();
      expect(mapElement.style.width).toBe('100%');
      expect(mapElement.style.height).toBe('300px');
    });

    test('Debe mostrar correctamente el título del modal', () => {
      const modalTitle = document.querySelector('#modalMascotaLabel');
      expect(modalTitle).not.toBeNull();
      expect(modalTitle.textContent).toBe('Información de la Mascota');
    });

    test('Debe contener la descripción de la mascota en el modal', () => {
      const descripcionElement = document.querySelector('#descripcionMascota');
      expect(descripcionElement).not.toBeNull();
      expect(descripcionElement.textContent).toBe(''); // Al principio, no debe haber texto
    });

    test('Debe tener el botón de cerrar el modal', () => {
      const closeButton = document.querySelector('.modal-footer .btn-secondary');
      expect(closeButton).not.toBeNull();
      expect(closeButton.textContent).toBe('Close');
    });

    test('Debe inicializar correctamente el mapa de Google', () => {
        // Llamamos la función que debería llamar initMap
        initMap();
        
        // Comprobamos que la función initMap fue llamada
        expect(global.initMap).toHaveBeenCalled();
      });
  });
});
