import { screen } from '@testing-library/dom';
import fs from 'fs';
import path from 'path';

describe('Pruebas del HTML de BuscaMascotas', () => {
  let html;
  
  // Leer el archivo HTML antes de cada prueba
  beforeEach(() => {
    const filePath = path.resolve('src/templates/mascota_encontrada_old.html'); // Ajusta la ruta según la ubicación del archivo HTML
    html = fs.readFileSync(filePath, 'utf-8');
  });

  describe('BuscaMascotas HTML Elements', () => {
    beforeEach(() => {
      document.body.innerHTML = html;
    });

    test('Debe contener el título BuscaMascotas', () => {
      const titleElement = document.querySelector('title');
      expect(titleElement).not.toBeNull();
      expect(titleElement.textContent).toBe('BuscaMascotas - Mascotas encontradas');
    });

    test('Debe contener la sección para agregar mascotas', () => {
      const button = document.querySelector('button.btn.btn-primary');
      expect(button).not.toBeNull();
      expect(button.textContent).toBe('Agregar Mascota');
    });

    test('Debe contener el formulario para agregar mascota', () => {
      const formulario = document.querySelector('#formularioMascota');
      expect(formulario).not.toBeNull();
      expect(formulario.style.display).toBe('none'); // El formulario está inicialmente oculto
    });

    test('Debe tener campos para especie, raza, sexo, tamaño y color', () => {
      const especieSelect = document.querySelector('#especie');
      expect(especieSelect).not.toBeNull();
      
      const razaSelect = document.querySelector('#raza');
      expect(razaSelect).not.toBeNull();
      
      const sexoSelect = document.querySelector('#sexo');
      expect(sexoSelect).not.toBeNull();
      
      const tamanoSelect = document.querySelector('#tamano');
      expect(tamanoSelect).not.toBeNull();
      
      const color1Select = document.querySelector('#color1');
      expect(color1Select).not.toBeNull();
    });

    test('Debe contener una sección para mostrar las mascotas encontradas', () => {
      const mascotasContainer = document.querySelector('#mascotas-container');
      expect(mascotasContainer).not.toBeNull();
    });

    test('Debe contener el pie de página con el texto correcto', () => {
      const footer = document.querySelector('.footer_section');
      expect(footer).toBeInTheDocument();
      expect(footer.textContent).toContain('© 2024 BuscaMascotas');
    });

    test('Debe contener un script para cargar el navbar', () => {
        const scriptElement = document.querySelectorAll('script'); // Obtener todos los elementos <script>
        
        // Buscar el script que contiene '../js/menu.js'
        const menuScript = Array.from(scriptElement).find(script => script.src.includes('../js/menu.js'));
        
        expect(menuScript).not.toBeNull();  // Verifica que el script esté presente
      });

    test('Debe tener un formulario que permite la selección de imagen', () => {
      const inputImagen = document.querySelector('#imagenMascota');
      expect(inputImagen).not.toBeNull();
      expect(inputImagen.type).toBe('file');
    });

    test('Debe contener un botón para guardar la mascota', () => {
      const guardarButton = document.querySelector('button.btn.btn-success');
      expect(guardarButton).not.toBeNull();
      expect(guardarButton.textContent).toBe('Guardar');
    });

    test('Debe contener un botón para cancelar el formulario', () => {
      const cancelarButton = document.querySelector('button.btn.btn-secondary');
      expect(cancelarButton).not.toBeNull();
      expect(cancelarButton.textContent).toBe('Cancelar');
    });

    test('Debe tener un contenedor de mascotas encontrado que sea un div', () => {
      const mascotasDiv = document.querySelector('#mascotas-container');
      expect(mascotasDiv).toBeInstanceOf(HTMLDivElement);
    });
  });
});
