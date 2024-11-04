function cargarPagina(pagina) {
    const contenido = document.getElementById('contenido');

    fetch(pagina)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar la página: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            contenido.innerHTML = data;

            if (pagina === 'template/inicio.html') {
              const carousel = new bootstrap.Carousel(document.getElementById('carouselExample'));
            }

            if (pagina === 'template/mis_mascotas.html' && typeof cargarMisMascotas === "function") {
                const usuario = JSON.parse(sessionStorage.getItem("usuario"));
                console.log("ID del usuario:", usuario.id);
                cargarMisMascotas(usuario.id);
            }

            if (pagina === 'template/mascotas_encontradas.html' && typeof cargarMascotasEncontradas === "function") {
                cargarMascotasEncontradas();
            }

            if (pagina === 'template/mascotas_perdidas.html' && typeof cargarMascotasPerdidas === "function") {
                cargarMascotasPerdidas();
            }
        })
        .catch(error => {
            contenido.innerHTML = `<p>Ocurrió un error al cargar la página. Por favor, intenta de nuevo.</p>`;
            console.error(error);
        });
}

document.addEventListener("DOMContentLoaded", function() {
    cargarPagina('template/inicio.html');
});

// Funciones para abrir y cerrar modales
function mostrarModal(titulo = "Agregar Mascota") {
    const modal = document.getElementById('modalMascota');
    const modalTitulo = document.getElementById('modalMascotaLabel');
    modalTitulo.textContent = titulo; // Cambia el título del modal
    modal.classList.add('show');
    modal.style.display = 'block';
    modal.setAttribute('aria-modal', 'true');
    modal.removeAttribute('aria-hidden');
}

function cerrarModal() {
    const modal = document.getElementById('modalMascota');
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
}

function mostrarModalEncontrada() {
    const modal = document.getElementById('modalMascotaEncontrada');
    modal.classList.add('show');
    modal.style.display = 'block';
    modal.setAttribute('aria-modal', 'true');
    modal.removeAttribute('aria-hidden');
}

function cerrarModalEncontrada() {
    const modal = document.getElementById('modalMascotaEncontrada');
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
}

function cerrarModalEncontrada() {
    const modal = document.getElementById('modalMascotaEncontrada');
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
}

function mostrarModalVerMascota() {
    const modal = document.getElementById('modalVerMascota');
    modal.classList.add('show');
    modal.style.display = 'block';
    modal.setAttribute('aria-modal', 'true');
    modal.removeAttribute('aria-hidden');
}

function cerrarModalVerMascota() {
    const modal = document.getElementById('modalVerMascota');
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
}
