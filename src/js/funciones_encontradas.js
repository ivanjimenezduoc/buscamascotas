// Cargar las especies, razas y colores en el formulario
document.addEventListener("DOMContentLoaded", function () {
    cargarSelectEspecies();
    cargarColores(); // Cargar los colores cuando se carga el documento
});

// Cargar las especies en el formulario
async function cargarSelectEspecies() {
    const especieSelect = document.getElementById("especie");
    const especies = ["Perro", "Gato", "Otro"];
    especieSelect.innerHTML = '<option value="" disabled selected>Seleccione Especie</option>';

    especies.forEach(especie => {
        const option = document.createElement("option");
        option.value = especie;
        option.textContent = especie;
        especieSelect.appendChild(option);
    });

    // Manejar el cambio de especie
    especieSelect.addEventListener("change", manejarCambioEspecie);
}

// Cargar razas dependiendo de la especie seleccionada
async function manejarCambioEspecie() {
    const especie = document.getElementById("especie").value;
    const razaSelect = document.getElementById("raza");
    razaSelect.innerHTML = '<option value="" disabled selected>Seleccione Raza</option>'; // Limpiar el select

    let razas = [];
    switch (especie) {
        case "Perro":
            razas = await obtenerRazasPerro();
            break;
        case "Gato":
            razas = await obtenerRazasGato();
            break;
        case "Otro":
            razas = await obtenerTiposOtrasMascotas();
            break;
    }

    razas.forEach(raza => {
        const option = document.createElement("option");
        option.value = raza.nombre || raza.id;
        option.textContent = raza.nombre || raza.nombre;
        razaSelect.appendChild(option);
    });

    // Llamamos a cargar los colores cada vez que se cambia la especie
    cargarColores();
}

// Función para cargar los colores en los tres campos de colores
function cargarColores() {
    const colores = ["Blanco", "Negro", "Marrón", "Gris", "Dorado", "Beige", "Rosa", "Azul", "Verde", "Amarillo"];
    const colorSelects = ["color1", "color2", "color3"];

    // Iteramos sobre los tres selectores de colores
    colorSelects.forEach(id => {
        const select = document.getElementById(id);
        select.innerHTML = '<option value="" disabled selected>Seleccione Color</option>'; // Limpiar el select

        colores.forEach(color => {
            const option = document.createElement("option");
            option.value = color;
            option.textContent = color;
            select.appendChild(option);
        });
    });
}

// Mostrar el formulario de agregar mascota
function mostrarFormulario() {
    const formulario = document.getElementById("formularioMascota");
    formulario.style.display = "block"; // Muestra el formulario
}

// Ocultar el formulario
function ocultarFormulario() {
    const formulario = document.getElementById("formularioMascota");
    formulario.style.display = "none"; // Oculta el formulario
}
