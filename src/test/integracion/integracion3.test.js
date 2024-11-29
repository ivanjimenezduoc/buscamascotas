import { render, screen } from '@testing-library/dom';
import fs from 'fs';
import path from 'path';

describe('Pruebas del HTML de BuscaMascotas', () => {
    let html;
    
    // Leer el archivo HTML antes de cada prueba
    beforeEach(() => {
      const filePath = path.resolve('src/templates/mascota_encontrada.html'); // Ajusta la ruta según la ubicación del archivo HTML
      html = fs.readFileSync(filePath, 'utf-8');
    });
// 1. Prueba del título de la página
test('Debe contener el título correcto', () => {
  document.body.innerHTML = html;  // Asumiendo que tienes el HTML en un archivo index.html
  const title = document.querySelector('title');
  expect(title.textContent).toBe('BuscaMascotas - Mascotas Encontradas');
});

// 2. Prueba de la existencia de la sección "Mascotas reportadas como encontradas"
test('Debe contener la sección Mascotas reportadas como encontradas', () => {
  document.body.innerHTML = html;  // Asumiendo que tienes el HTML en un archivo index.html
  const heading = screen.getByText('Mascotas reportadas como encontradas');
  expect(heading).toBeInTheDocument();
});

// 3. Prueba de que el botón "Agregar Mascota" esté presente
test('Debe contener un botón para agregar mascota', () => {
  document.body.innerHTML = html;  // Asumiendo que tienes el HTML en un archivo index.html
  const button = screen.getByText('Agregar Mascota');
  expect(button).toBeInTheDocument();
});

// 4. Prueba de que el formulario de mascota esté inicialmente oculto
test('El formulario de mascota debe estar oculto inicialmente', () => {
  document.body.innerHTML = html;  // Asumiendo que tienes el HTML en un archivo index.html
  const form = document.getElementById('formularioMascota');
  expect(form).toHaveStyle('display: none');
});

// 5. Prueba de que el mapa tenga la clase correcta
test('Debe contener el contenedor del mapa con la clase correcta', () => {
  document.body.innerHTML = html;  // Asumiendo que tienes el HTML en un archivo index.html
  const mapContainer = document.getElementById('map2');
  expect(mapContainer).toHaveClass('map');
});

// 6. Prueba de la existencia del modal de coincidencias
test('Debe contener el modal de coincidencias', () => {
  document.body.innerHTML = html;  // Asumiendo que tienes el HTML en un archivo index.html
  const modal = document.getElementById('modalCoincidencias');
  expect(modal).toBeInTheDocument();
});
});