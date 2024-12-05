import { screen } from '@testing-library/dom';
import fs from 'fs';
import path from 'path';

describe('Pruebas del HTML de BuscaMascotas', () => {
  let html;

  // Leer el archivo HTML antes de cada prueba
  beforeEach(() => {
    const filePath = path.resolve('src/templates/mis_mascotas.html'); // Ajusta la ruta según la ubicación del archivo HTML
    html = fs.readFileSync(filePath, 'utf-8');
  });

  describe('BuscaMascotas HTML Elements', () => {
    beforeEach(() => {
      document.body.innerHTML = html;
    });

    test('Debe contener el título BuscaMascotas - Mis Mascotas', () => {
      const titleElement = document.querySelector('title');
      expect(titleElement).not.toBeNull();
      expect(titleElement.textContent).toBe('BuscaMascotas - Mis Mascotas');
    });

    test('Debe contener un navbar dinámico', () => {
      const navbarContainer = document.querySelector('#navbar-container');
      expect(navbarContainer).not.toBeNull();
    });

    test('Debe contener los grupos del formulario', () => {
      const navbarContainer = document.querySelector('.form-group');
      expect(navbarContainer).not.toBeNull();
    });

    test('Debe contener una sección de perfil de usuario con campos adecuados', () => {
      const perfilCard = document.querySelector('.card.mt-4');
      expect(perfilCard).not.toBeNull();

      const nombreInput = document.querySelector('#nombreUsuario');
      expect(nombreInput).not.toBeNull();

      const fechaNacimientoInput = document.querySelector('#fechaNacimiento');
      expect(fechaNacimientoInput).not.toBeNull();

      const direccionInput = document.querySelector('#direccion');
      expect(direccionInput).not.toBeNull();

      const correoInput = document.querySelector('#correo');
      expect(correoInput).not.toBeNull();
      expect(correoInput.type).toBe('email');

      const telefono1Input = document.querySelector('#telefono1');
      expect(telefono1Input).not.toBeNull();
      expect(telefono1Input.type).toBe('tel');

      const telefono2Input = document.querySelector('#telefono2');
      expect(telefono2Input).not.toBeNull();
      expect(telefono2Input.type).toBe('tel');
    });

    test('Debe contener un botón para agregar mascotas', () => {
      const agregarMascotaButton = document.querySelector('button.btn.btn-primary');
      expect(agregarMascotaButton).not.toBeNull();
      expect(agregarMascotaButton.textContent).toBe('Agregar Mascota');
    });
    

    test('Debe contener un estilo de fondo correctamente definido', () => {
      const bodyStyle = window.getComputedStyle(document.body);
      expect(bodyStyle.backgroundImage).toContain('url(../images/fondo.jpg)');
      expect(bodyStyle.backgroundSize).toBe('cover');
    });

    test('Debe cargar los scripts necesarios para el funcionamiento de la página', () => {
      const menuScript = Array.from(document.querySelectorAll('script')).find(script =>
        script.src.includes('../js/menu.js')
      );
      expect(menuScript).not.toBeNull();

      const funcionesBdScript = Array.from(document.querySelectorAll('script')).find(script =>
        script.src.includes('../js/funciones_bd.js')
      );
      expect(funcionesBdScript).not.toBeNull();
    });

    test('Debe contener un pie de página con el texto esperado', () => {
      const footer = document.querySelector('.footer_section');
      expect(footer).not.toBeNull();
      expect(footer.textContent).toContain('© 2024 BuscaMascotas');
    });

    test('Debe contener una sección para mostrar mascotas', () => {
      const mascotasSection = document.querySelector('#contenido');
      expect(mascotasSection).not.toBeNull();

      const misMascotasTitle = document.querySelector('h2.text-center');
      expect(misMascotasTitle).not.toBeNull();
      expect(misMascotasTitle.textContent).toBe('Mis Mascotas');
    });

    test('Debe contener enlaces a recursos externos de CSS y JavaScript', () => {
      const bootstrapCSS = Array.from(document.querySelectorAll('link')).find(link =>
        link.href.includes('bootstrap.min.css')
      );
      expect(bootstrapCSS).not.toBeNull();

      const fontAwesomeCSS = Array.from(document.querySelectorAll('link')).find(link =>
        link.href.includes('font-awesome')
      );
      expect(fontAwesomeCSS).not.toBeNull();
    });
  });
});
