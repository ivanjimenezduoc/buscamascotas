
document.addEventListener("DOMContentLoaded", function () {
    cargarSelectEspecies();
    cargarColores();
    cargarTamano();

});


async function cargarSelectEspecies() {
    const especieSelect = document.getElementById("especie");
    const especies = [
        { id: 1, nombre: "Perro" },
        { id: 2, nombre: "Gato" },
        { id: 3, nombre: "Otro" }
    ];
    especieSelect.innerHTML = '<option value="" disabled selected>Seleccione Especie</option>';

    especies.forEach(especie => {
        const option = document.createElement("option");
        option.value = especie.id;  // Asignamos el id de la especie como el value
        option.textContent = especie.nombre;  // El texto visible será el nombre de la especie
        especieSelect.appendChild(option);
    });

    // Manejar el cambio de especie (si es necesario)
}

async function cargarColores() {
    try {

        const colores = await obtenerColoresMascota();

        if (!colores || colores.length === 0) {
            console.error("No se encontraron colores en la base de datos.");
            return;
        }

        const colorSelects = ["color1", "color2", "color3"];
        colorSelects.forEach(id => {
            const select = document.getElementById(id);


            select.innerHTML = '<option value="" disabled selected>Seleccione Color</option>';
            colores.forEach(color => {
                const option = document.createElement("option");
                option.value = color.id;
                option.textContent = color.color;
                select.appendChild(option);
            });
        });
    } catch (error) {
        console.error("Error al cargar los colores:", error);
    }
}

async function cargarTamano() {
    try {

        const tamanos = await obtenerTamano();

        if (!tamanos || tamanos.length === 0) {
            console.error("No se encontraron tamaños.");
            return;
        }
        const select = document.getElementById("tamano");
        select.innerHTML = '<option value="" disabled selected>Seleccione Tamaño</option>';
        tamanos.forEach(tamano => {
            const option = document.createElement("option");
            option.value = tamano.id;
            option.textContent = tamano.tamano;
            select.appendChild(option);
        });

    } catch (error) {
        console.error("Error al cargar los tamaños:", error);
    }
}

async function manejarCambioEspecie() {

    const especieString = document.getElementById("especie").value;
    const especie = parseInt(especieString, 10); 
   
    const razaSelect = document.getElementById("raza");
    razaSelect.innerHTML = '<option value="" disabled selected>Seleccione Raza</option>';


    let razas = [];
    razas = await obtenerRazas(especie)


    razas.forEach(raza => {
        const option = document.createElement("option");
        option.value = raza.id;
        option.textContent = raza.raza;
        razaSelect.appendChild(option);
    });

}

function mostrarFormulario() {
    const formulario = document.getElementById("formularioMascota");
    const botonAgregar = document.querySelector("button[onclick='mostrarFormulario()']");

    formulario.style.display = "block";
    if (botonAgregar) {
        botonAgregar.style.display = "none";
    }
}


function ocultarFormulario() {
    const formulario = document.getElementById("formularioMascota");
    const botonAgregar = document.querySelector("button[onclick='mostrarFormulario()']");

    formulario.style.display = "none";
    if (botonAgregar) {
        botonAgregar.style.marginLeft = "auto";
            botonAgregar.style.marginRight = "auto";
        botonAgregar.style.display = "block";
    }
}

function initMap2() {
    if (isMap2Initialized) return; // Salir si ya se inicializó el mapa

    const defaultLocation = { lat: -33.4489, lng: -70.6693 }; // Santiago, Chile

    map2 = new google.maps.Map(document.getElementById("map2"), {
        center: defaultLocation,
        zoom: 13,
    });

    marker2 = new google.maps.Marker({
        position: defaultLocation,
        map: map2,
        draggable: true, // Permite mover el marcador manualmente
    });

    geocoder2 = new google.maps.Geocoder();

    // Autocompletado del input de ubicación
    const ubicacionInput = document.getElementById("ubicacion");
    autocomplete = new google.maps.places.Autocomplete(ubicacionInput, {
        types: ["geocode"],
    });

    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
            const location = place.geometry.location;
            map2.setCenter(location); // Centrar el mapa
            marker2.setPosition(location); // Mover el marcador
        } else {
            alert("No se pudo encontrar el lugar seleccionado.");
        }
    });

    // Actualizar el input cuando el marcador se mueva
    marker2.addListener("dragend", () => {
        const position = marker2.getPosition();
        geocodeLatLng2(position.lat(), position.lng());
    });

    isMap2Initialized = true; // Marcar como inicializado

}



