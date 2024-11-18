const supabaseUrl = 'https://duwjaewngocuzsfpgpiz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1d2phZXduZ29jdXpzZnBncGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwMzYyMDMsImV4cCI6MjA0NDYxMjIwM30.o0_3AiKv5IzhaoD3-aLMefClqLrChrwaI3RAbGqGEBQ';
const supabases = supabase.createClient(supabaseUrl, supabaseAnonKey);



//FUNCIONES MASCOTAS ENCONTRADAS

async function guardarMascotaEncontrada() {
    const errorFields = document.querySelectorAll(".error-message");
    errorFields.forEach(error => error.remove());

  
    const especie = document.getElementById("especie").value;
    const raza = document.getElementById("raza").value;
    const tamano = document.getElementById("tamano").value;
    const color1 = document.getElementById("color1").value;
    const color2 = document.getElementById("color2").value || null; 
    const color3 = document.getElementById("color3").value || null;
    const sexo = document.getElementById("sexo").value;
    const ubicacion = document.getElementById("ubicacion").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();

    const errores = [];
    if (!especie) errores.push({ campo: "especie", mensaje: "Debes seleccionar una especie." });
    if (!raza) errores.push({ campo: "raza", mensaje: "Debes seleccionar una raza." });
    if (!tamano) errores.push({ campo: "tamano", mensaje: "Debes seleccionar un tamaño." });
    if (!color1) errores.push({ campo: "color1", mensaje: "Debes seleccionar al menos un color." });
    if (!sexo) errores.push({ campo: "sexo", mensaje: "Debes seleccionar el sexo." });
    if (!ubicacion) errores.push({ campo: "ubicacion", mensaje: "Debes ingresar la ubicación." });
    if (!descripcion) errores.push({ campo: "descripcion", mensaje: "Debes ingresar una descripción." });

    if (errores.length > 0) {
        errores.forEach(error => {
            const campo = document.getElementById(error.campo);
            const mensajeError = document.createElement("div");
            mensajeError.className = "error-message";
            mensajeError.style.color = "red";
            mensajeError.style.fontSize = "0.9em";
            mensajeError.textContent = error.mensaje;
            campo.parentElement.appendChild(mensajeError);
        });
        return;
    }

    console.log("Valores que se van a guardar:");
    console.log("Especie (ID):", especie);
    console.log("Raza (ID):", raza);
    console.log("Tamaño:", tamano);
    console.log("Color 1 (ID):", color1);
    console.log("Color 2 (ID):", color2);
    console.log("Color 3 (ID):", color3);
    console.log("Sexo (ID):", sexo);
    console.log("Ubicación:", ubicacion);
    console.log("Descripción:", descripcion);
    estado = 0


    const { data, error } = await supabases
        .from("mascota_encontrada")
        .insert([{ raza, color1, color2, color3, especie, tamano, estado, ubicacion, descripcion, sexo }]);

    if (error) {
        console.error("Error al guardar la mascota encontrada:", error);
        alert("Hubo un problema al guardar la mascota.");
        return;
    } else {

        const formulario = document.getElementById("formularioMascota");
        const botonAgregar = document.querySelector("button[onclick='mostrarFormulario()']");
    
        formulario.style.display = "none";
        if (botonAgregar) {
            botonAgregar.style.marginLeft = "auto";
            botonAgregar.style.marginRight = "auto";
            botonAgregar.style.display = "block";
            
        }
    
        }

    }




async function cargarMascotasEncontradas() {
    console.log("Cargando mascotas encontradas");

    const { data: mascotas, error } = await supabases.from('mascota_encontrada').select(`
        especie (id, nombre), 
        raza (id, raza), 
        tamano (id, tamano), 
        color1 (id, color), 
        color2 (id, color), 
        color3 (id, color), 
        descripcion,
        ubicacion
    `).eq("estado", 0);

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
            <td>${mascota.especie ? mascota.especie.nombre : "Sin definir"}</td>
            <td>${mascota.raza ? mascota.raza.raza : "Sin definir"}</td>
            <td>${mascota.tamano ? mascota.tamano.tamano : "Sin definir"}</td>
            <td>${mascota.color1 ? mascota.color1.color : "Sin definir"}</td>
            <td>${mascota.color2 ? mascota.color2.color : "Sin definir"}</td>
            <td>${mascota.color3 ? mascota.color3.color : "Sin definir"}</td>
            <td>${mascota.descripcion}</td>
            <td><button class="btn btn-link ubicacion-btn">${mascota.ubicacion}</button></td>
        `;

        tablaCuerpo.appendChild(fila);
    });

        // Agregar eventos dinámicos a los botones de ubicación
        agregarEventosUbicacion();
}

// Función para agregar eventos de clic a las columnas de ubicación
function agregarEventosUbicacion() {
    const ubicacionBotones = document.querySelectorAll(".ubicacion-btn");

    ubicacionBotones.forEach(boton => {
        boton.addEventListener("click", function () {
            const ubicacion = boton.textContent.trim(); // Obtener la ubicación de la celda clickeada
            if (ubicacion) {
                actualizarMapa1(ubicacion); // Actualiza el mapa con la ubicación seleccionada
            }
        });
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

async function obtenerRazas(id_especie) {



    const { data: razasPerro, error } = await supabases
        .from("razas")
        .select("id, raza")
        .eq("id_especie", id_especie);;

    if (error) {
        console.error("Error al obtener las razas", error);
        return [];
    }

    return razasPerro;
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

async function obtenerTamano() {

    const { data: tamanos, error } = await supabases
        .from("tamano")
        .select("id, tamano");

    if (error) {
        console.error("Error al obtener los tamaños:", error);
        return [];
    }

    return tamanos;
}

async function guardarUsuario() {
    // Obtén los valores del formulario de registro
    const nombre = document.querySelector("input[name='nombre']").value.trim();
    const fecha_nacimiento = document.querySelector("input[name='fecha_nacimiento']").value.trim();
    const direccion = document.querySelector("input[name='direccion']").value.trim();
    const email = document.querySelector("input[name='email']").value.trim();
    const telefono = document.querySelector("input[name='telefono']").value.trim();

    // Validación básica
    if (!nombre || !fecha_nacimiento || !direccion || !email || !telefono) {
        alert("Por favor, completa todos los campos.");
        return;
    }
console.log("nombre del won: "+nombre)
    try {
        // Insertar los datos en la tabla `dueño`
        const { data, error } = await supabases
            .from("dueño") 
            .insert([{ nombre, fecha_nacimiento, Direccion, correo, telefono1 }]);

        if (error) {
            console.error("Error al registrar el usuario:", error);
            alert("Hubo un error al registrar el usuario. Por favor, intenta de nuevo.");
            return;
        }

        alert("Usuario registrado exitosamente.");
        showSignIn(); // Cambia al formulario de inicio de sesión después de registrarse
    } catch (error) {
        console.error("Error inesperado:", error);
        alert("Hubo un problema al registrar el usuario.");
    }
}