
document.addEventListener("DOMContentLoaded", function () {
    cargarSelectEspecies();
    cargarColores();
    cargarTamano();
    initMap1(); // Inicializar Mapa 1 al cargar la página
    cargarMascotasEncontradas(); // Cargar las mascotas con sus ubicaciones
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
    console.log(razas)
    /*
    let razas = [];
    switch (especie) {
        case "1":
            razas = await obtenerRazasPerro();
            break;
        case "2":
            razas = await obtenerRazasGato();
            break;
        case "3":
            razas = await obtenerTiposOtrasMascotas();
            break;
    }*/

    razas.forEach(raza => {
        const option = document.createElement("option");
        option.value = raza.id;
        option.textContent = raza.raza;
        razaSelect.appendChild(option);
    });


    //cargarColores();
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

// --- Código para el primer mapa (tabla) ---
let map1;
let marker1;

document.addEventListener('DOMContentLoaded', function () {
    initMap1();

    // Selecciona todas las filas de la tabla y agrega el evento de clic
    const filas = document.querySelectorAll("table tbody tr");
    filas.forEach(fila => {
        fila.addEventListener("click", function () {
            const ubicacion = fila.querySelector("td:last-child").textContent.trim();
            if (ubicacion) {
                actualizarMapa1(ubicacion); // Llama a la función para actualizar el Mapa 1
            }
        });
    });
});


// Inicializa el primer mapa en una ubicación predeterminada
function initMap1() {
    const centroInicial = { lat: -33.4489, lng: -70.6693 }; // Santiago, Chile
    map1 = new google.maps.Map(document.getElementById("map"), {
        center: centroInicial,
        zoom: 8,
    });

    marker1 = new google.maps.Marker({
        position: centroInicial,
        map: map1,
    });
}


// Actualiza el primer mapa según la ubicación seleccionada
function actualizarMapa1(ubicacion) {
    const geocoder = new google.maps.Geocoder();

    // Geocodifica la dirección seleccionada
    geocoder.geocode({ address: ubicacion }, function (results, status) {
        if (status === "OK" && results[0]) {
            const nuevaPosicion = results[0].geometry.location;

            // Mover el marcador y centrar el mapa
            marker1.setPosition(nuevaPosicion);
            map1.setCenter(nuevaPosicion);
            map1.setZoom(12); // Ajustar el nivel de zoom si es necesario
        } else {
            console.error("No se pudo encontrar la ubicación: " + status);
            alert("No se pudo mostrar la ubicación seleccionada.");
        }
    });
}


// --- Código para el segundo mapa (formulario) ---
let map2;
let marker2;
let geocoder2;
let isMap2Initialized = false; // Bandera para evitar inicialización múltiple
let autocomplete; // Autocompletado para el input de ubicación

// Inicializa el segundo mapa
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

// Convertir coordenadas a dirección (segundo mapa)
function geocodeLatLng2(lat, lng) {
    const latlng = { lat: lat, lng: lng };
    geocoder2.geocode({ location: latlng }, (results, status) => {
        if (status === "OK" && results[0]) {
            const address = results[0].formatted_address;
            document.getElementById("ubicacion").value = address; // Actualizar el input
        } else {
            alert("No se pudo determinar la ubicación.");
        }
    });
}

// Inicializar el segundo mapa al cargar el formulario
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formularioMascota");
    formulario.addEventListener("transitionend", () => {
        if (formulario.style.display !== "none") {
            initMap2();
        }
    });
});
