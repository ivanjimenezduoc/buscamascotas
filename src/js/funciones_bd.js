const supabaseUrl = 'https://duwjaewngocuzsfpgpiz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1d2phZXduZ29jdXpzZnBncGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwMzYyMDMsImV4cCI6MjA0NDYxMjIwM30.o0_3AiKv5IzhaoD3-aLMefClqLrChrwaI3RAbGqGEBQ';
const supabases = supabase.createClient(supabaseUrl, supabaseAnonKey);



//FUNCIONES MASCOTAS ENCONTRADAS

async function guardarMascotaEncontrada() {
    console.log("Guardar mascota encontrada");

    // Obtener los datos del formulario
    const especie = document.getElementById("especie").value;
    const raza = document.getElementById("raza").value;
    const tamano = document.getElementById("tamano").value;
    const color1 = document.getElementById("color1").value;
    const color2 = document.getElementById("color2").value;
    const color3 = document.getElementById("color3").value;
    const descripcion = document.getElementById("descripcion").value;
    const ubicacion = document.getElementById("ubicacion").value;
    const estado = 0; // Estado "no perdido"

    // Buscar mascotas perdidas que coincidan
    const mascotasCoincidentes = await buscarMascotasPerdidas({ especie, raza, tamano, color1, color2, color3 });

    if (mascotasCoincidentes.length > 0) {
        // Si hay mascotas perdidas que coinciden, mostrar alerta
        alert("Existen mascotas perdidas que coinciden con estas características, puede revisar el listado de mascotas perdidas.");
    }

    // Guardar la mascota encontrada en la base de datos
    const { data, error } = await supabases
        .from("mascota_encontrada")
        .insert([{ raza, color1, color2, color3, especie, tamano, estado, ubicacion, descripcion }]);

    if (error) {
        console.error("Error al guardar la mascota encontrada:", error);
        alert("Hubo un problema al guardar la mascota.");
        return;
    }

    cerrarModalEncontrada();
    cargarMascotasEncontradas();
        
}

async function cargarMascotasEncontradas() {
    console.log("Cargando mascotas encontradas");

    const { data: mascotas, error } = await supabases
        .from("mascota_encontrada")
        .select("*")
        .eq("estado", 0);

    if (error) {
        console.error("Error al cargar las mascotas encontradas:", error);
        alert("Hubo un problema al cargar las mascotas.");
        return;
    }

    const tablaCuerpo = document.querySelector("#contenido tbody");
    tablaCuerpo.innerHTML = ""; // Limpiar la tabla antes de rellenarla

    // Rellenar la tabla con los datos de las mascotas
    mascotas.forEach(mascota => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${mascota.especie}</td>
            <td>${mascota.raza}</td>
            <td>${mascota.tamano}</td>
            <td>${mascota.color1}</td>
            <td>${mascota.color2}</td>
            <td>${mascota.color3}</td>
            <td>${mascota.descripcion}</td>
            <td>${mascota.ubicacion}</td>
        `;

        tablaCuerpo.appendChild(fila);
    });
}


// BUSQUEDA DE COINCIDENCIAS

async function buscarMascotasPerdidas(mascota) {
    // Recuperar las mascotas encontradas de la base de datos
    const { data: mascotasPerdidas, error } = await supabases.from("mascota")
        .select("*")
        .eq("estado", 1); // 0 podría representar "encontrada"

    if (error) {
        console.error("Error al buscar mascotas encontradas:", error);
        return [];
    }

    // Filtrar las mascotas encontradas por coincidencias
    const coincidencias = mascotasPerdidas.filter(encontrada => {
        return (
            encontrada.nombre === mascota.nombre ||
            (encontrada.color && mascotasColoresCoinciden(mascota.color, encontrada.color)) ||
            (encontrada.raza && encontrada.raza === mascota.raza) ||
            (encontrada.tamano && encontrada.tamano === mascota.tamano)
        );
    });

    return coincidencias;
}

async function buscarMascotasEncontradas(mascota) {
    // Recuperar las mascotas encontradas de la base de datos
    const { data: mascotasEncontradas, error } = await supabases.from("mascota_encontrada")
        .select("*")
        .eq("estado", 0); // 0 podría representar "encontrada"

    if (error) {
        console.error("Error al buscar mascotas encontradas:", error);
        return [];
    }

    // Filtrar las mascotas encontradas por coincidencias
    const coincidencias = mascotasEncontradas.filter(encontrada => {
        return (
            encontrada.nombre === mascota.nombre ||
            (encontrada.color && mascotasColoresCoinciden(mascota.color, encontrada.color)) ||
            (encontrada.raza && encontrada.raza === mascota.raza) ||
            (encontrada.tamano && encontrada.tamano === mascota.tamano)
        );
    });

    return coincidencias;
}


// DATOS DE FORMULARIOS

async function obtenerRazasPerro() {

    const { data: razasPerro, error } = await supabases
        .from("raza_perro")
        .select("id, nombre");

    if (error) {
        console.error("Error al obtener las razas de perro:", error);
        return [];
    }

    return razasPerro;
}

async function obtenerRazasGato() {

    const { data: razasGato, error } = await supabases
        .from("raza_gato")
        .select("id, nombre");

    if (error) {
        console.error("Error al obtener las razas de gato:", error);
        return [];
    }

    return razasGato;
}

async function obtenerColoresMascota() {

    const { data: coloresMascota, error } = await supabases
        .from("color_mascota")
        .select("id, color");

    if (error) {
        console.error("Error al obtener los colores de mascota:", error);
        return [];
    }

    return coloresMascota;
}

async function obtenerTiposOtrasMascotas() {

    const { data: tiposOtrasMascotas, error } = await supabases
        .from("otra_raza")
        .select("id, nombre");

    if (error) {
        console.error("Error al obtener los tipos de otras mascotas:", error);
        return [];
    }

    return tiposOtrasMascotas;
}
