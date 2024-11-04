const supabaseUrl = 'https://duwjaewngocuzsfpgpiz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1d2phZXduZ29jdXpzZnBncGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwMzYyMDMsImV4cCI6MjA0NDYxMjIwM30.o0_3AiKv5IzhaoD3-aLMefClqLrChrwaI3RAbGqGEBQ';
const supabases = supabase.createClient(supabaseUrl, supabaseAnonKey);


function mostrarModalAgregar() {
    document.getElementById("modalMascotaLabel").textContent = "Agregar Mascota";
    document.getElementById("btnGuardarActualizar").textContent = "Guardar";
    document.getElementById("btnGuardarActualizar").onclick = guardarNuevaMascota;
    document.getElementById("mascotaId").value = ""; // Limpiar ID para nuevo registro
    limpiarFormulario();

    // Configurar el estado inicial como "No perdido"
    const estadoToggle = document.getElementById("estadoToggle");
    estadoToggle.classList.remove("btn-danger");
    estadoToggle.classList.add("btn-secondary");
    estadoToggle.textContent = "No perdido";
    estadoToggle.setAttribute("data-estado", "0"); // 0 representa "No perdido"



    mostrarModal();
}






/*
async function guardarNuevaMascota() {
    const mascota = obtenerDatosFormulario();

    // Verificar si se ha seleccionado una imagen
    const imagenInput = document.getElementById("imagenMascota");
    if (imagenInput.files.length > 0) {
        const imagenArchivo = imagenInput.files[0];
        const nombreImagen = `imagenes_mascotas/${Date.now()}_${imagenArchivo.name}`; // Usar timestamp para nombres únicos
        console.log("Intentando subir imagen:", nombreImagen);

        // Subir la imagen a Supabase Storage
        const { data: imagenData, error: imagenError } = await supabases.storage
            .from("imagenes_mascotas")
            .upload(nombreImagen, imagenArchivo);

        if (imagenError) {
            console.error("Error al subir la imagen:", imagenError);
            alert("Hubo un problema al subir la imagen.");
            return;
        }

        console.log("Imagen subida correctamente:", imagenData);

        // Guardar solo el nombre de la imagen en la columna `foto_perfil`
        mascota.foto_perfil = nombreImagen; // Guardar nombre en lugar de URL
    } else {
        // Si no se seleccionó ninguna imagen, deja la columna `foto_perfil` como `null` o vacío
        mascota.foto_perfil = null;
    }

    console.log("Datos de la mascota a guardar:", mascota); // Mostrar los datos de la mascota

    // Guardar los datos de la mascota en la base de datos
    const { data, error } = await supabases.from("mascota").insert([mascota]);

    if (error) {
        console.error("Error al guardar la mascota:", error);
        alert("Hubo un problema al guardar la mascota.");
        return;
    }

    alert("Mascota guardada exitosamente.");
    cerrarModal();
    cargarMisMascotas(1);
}

async function actualizarMascota() {
    const id = document.getElementById("mascotaId").value;
    const mascota = obtenerDatosFormulario();
    const { data, error } = await supabases.from("mascota").update(mascota).eq("id", id);

    if (error) {
        console.error("Error al actualizar la mascota:", error);
        alert("Hubo un problema al actualizar la mascota.");
        return;
    }

    alert("Mascota actualizada exitosamente.");
    cerrarModal();
    cargarMisMascotas(1);
}
*/

async function guardarNuevaMascota() {
    const mascota = obtenerDatosFormulario();

    // Verificar si se ha seleccionado una imagen
    const imagenInput = document.getElementById("imagenMascota");
    if (imagenInput.files.length > 0) {
        const imagenArchivo = imagenInput.files[0];
        const nombreImagen = `imagenes_mascotas/${Date.now()}_${imagenArchivo.name}`; // Usar timestamp para nombres únicos
        console.log("Intentando subir imagen:", nombreImagen);

        // Subir la imagen a Supabase Storage
        const { data: imagenData, error: imagenError } = await supabases.storage
            .from("imagenes_mascotas")
            .upload(nombreImagen, imagenArchivo);

        if (imagenError) {
            console.error("Error al subir la imagen:", imagenError);
            alert("Hubo un problema al subir la imagen.");
            return;
        }
        const usuario = JSON.parse(sessionStorage.getItem("usuario"));
        mascota.id_dueno = usuario.id ;

        console.log("Imagen subida correctamente:", imagenData);
        mascota.foto_perfil = nombreImagen; // Guardar nombre en lugar de URL
    } else {
        mascota.foto_perfil = null;
    }

    console.log("Datos de la mascota a guardar:", mascota); // Mostrar los datos de la mascota

    // Verificar si el estado es "perdido"
    if (mascota.estado === 1) { // Si la mascota es "perdida"
        const coincidencias = await buscarMascotasEncontradas(mascota);
        if (coincidencias.length > 0) {
            alert("Existen mascotas encontradas que coinciden con estas características, puede revisar el listado de mascotas encontradas.");
        }
    }

    // Guardar los datos de la mascota en la base de datos
    const { data, error } = await supabases.from("mascota").insert([mascota]);

    if (error) {
        console.error("Error al guardar la mascota:", error);
        alert("Hubo un problema al guardar la mascota.");
        return;
    }

    //alert("Mascota guardada exitosamente.");
    cerrarModal();
    cargarMisMascotas(1);
}

async function actualizarMascota() {
    const id = document.getElementById("mascotaId").value;
    const mascota = obtenerDatosFormulario();

    // Verificar si el estado es "perdido"
    if (mascota.estado === 1) { // Si la mascota es "perdida"
        const coincidencias = await buscarMascotasEncontradas(mascota);
        if (coincidencias.length > 0) {
            alert("Existen mascotas encontradas que coinciden con estas características, puede revisar el listado de mascotas encontradas.");
        }
    }

    const { data, error } = await supabases.from("mascota").update(mascota).eq("id", id);

    if (error) {
        console.error("Error al actualizar la mascota:", error);
        alert("Hubo un problema al actualizar la mascota.");
        return;
    }

    alert("Mascota actualizada exitosamente.");
    cerrarModal();
    cargarMisMascotas(1);
}

function obtenerDatosFormulario() {
    return {
        nombre: document.getElementById("nombre").value,
        especie: document.getElementById("especie").value,
        edad: parseInt(document.getElementById("edad").value),
        raza: document.getElementById("raza").value,
        tamano: document.getElementById("tamano").value,
        color1: document.getElementById("color1").value,
        color2: document.getElementById("color2").value,
        color3: document.getElementById("color3").value,
        descripcion: document.getElementById("descripcion").value,
        estado: parseInt(document.getElementById("estadoToggle").getAttribute("data-estado"))
    };
}

async function cargarMisMascotas(dueno_index) {
    console.log("Cargando mascotas para el dueño con id " + dueno_index + "...");

    const { data: mascotas, error } = await supabases
        .from("mascota")
        .select("*")
        .eq("id_dueno", dueno_index);

    if (error) {
        console.error("Error al cargar las mascotas:", error);
        alert("Hubo un problema al cargar las mascotas.");
        return;
    }

    const container = document.getElementById("mascotas-container");
    container.innerHTML = ""; // Limpiar el contenedor antes de rellenarlo

    // Generar tarjetas para cada mascota y añadirlas al contenedor
    for (const mascota of mascotas) {
        // Obtener la URL de la imagen usando la función obtenerUrlImagen
        const imagenUrl = await obtenerUrlImagen(mascota.foto_perfil); // Aquí se asume que `foto_perfil` contiene el nombre de la imagen

        const card = document.createElement("div");
        card.className = "col-md-4";
        let estado_m = "No perdido"
        if (mascota.estado == 1){
            estado_m = "Perdido";

        }

        card.innerHTML = `
            <div class="card mb-4">
                ${imagenUrl ? `<img src="${imagenUrl}" class="card-img-top" alt="Imagen de ${mascota.nombre}">` : ""}
                <div class="card-body">
                    <h5 class="card-title">${mascota.nombre}</h5>
                    <p class="card-text"><strong>ID:</strong> ${mascota.id}</p>
                    <p class="card-text"><strong>Especie:</strong> ${mascota.especie}</p>
                    <p class="card-text"><strong>Edad:</strong> ${mascota.edad}</p>
                    <p class="card-text"><strong>Raza:</strong> ${mascota.raza}</p>
                    <p class="card-text"><strong>Tamaño:</strong> ${mascota.tamano}</p>
                    <p class="card-text"><strong>Color 1:</strong> ${mascota.color1}</p>
                    <p class="card-text"><strong>Color 2:</strong> ${mascota.color2}</p>
                    <p class="card-text"><strong>Color 3:</strong> ${mascota.color3}</p>
                    <p class="card-text"><strong>Descripción:</strong> ${mascota.descripcion}</p>
                    <p class="card-text"><strong>Estado:</strong> ${estado_m}</p>
                    <button class="btn btn-primary" onclick="mostrarModalEditar(${mascota.id})">Editar</button>
                </div>
            </div>
        `;

        container.appendChild(card);
    }
}
/*
async function guardarMascotaEncontrada() {
    console.log("Guardar mascota encontrada");

    const especie = document.getElementById("especie").value;
    const raza = document.getElementById("raza").value;
    const tamano = document.getElementById("tamano").value;
    const color1 = document.getElementById("color1").value;
    const color2 = document.getElementById("color2").value;
    const color3 = document.getElementById("color3").value;
    const descripcion = document.getElementById("descripcion").value;
    const ubicacion = document.getElementById("ubicacion").value;
    const estado = 0;

    const { data, error } = await supabases
        .from("mascota_encontrada")
        .insert([{ raza, color1, color2, color3, especie, tamano, estado, ubicacion, descripcion }]);

    if (error) {
        console.error("Error al guardar la mascota encontrada:", error);
        alert("Hubo un problema al guardar la mascota.");
        return;
    }

    alert("Mascota guardada exitosamente.");
}*/

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

async function mostrarModalEditar(id) {
    document.getElementById("modalMascotaLabel").textContent = "Editar Mascota";
    document.getElementById("btnGuardarActualizar").textContent = "Actualizar";
    document.getElementById("btnGuardarActualizar").onclick = actualizarMascota;

    const { data: mascota, error } = await supabases
        .from("mascota")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error al cargar los datos de la mascota:", error);
        alert("No se pudieron cargar los datos de la mascota.");
        return;
    }

    document.getElementById("mascotaId").value = mascota.id;
    document.getElementById("nombre").value = mascota.nombre;
    document.getElementById("especie").value = mascota.especie;
    document.getElementById("edad").value = mascota.edad;
    document.getElementById("raza").value = mascota.raza;
    document.getElementById("tamano").value = mascota.tamano;
    document.getElementById("color1").value = mascota.color1;
    document.getElementById("color2").value = mascota.color2;
    document.getElementById("color3").value = mascota.color3;
    document.getElementById("descripcion").value = mascota.descripcion;

    // Configurar el estado del toggle según el estado de la mascota
    const estadoToggle = document.getElementById("estadoToggle");
    if (mascota.estado === 1) { // Perdido
        estadoToggle.classList.remove("btn-secondary");
        estadoToggle.classList.add("btn-danger");
        estadoToggle.textContent = "Perdido";
        estadoToggle.setAttribute("data-estado", "1");
    } else { // No perdido
        estadoToggle.classList.remove("btn-danger");
        estadoToggle.classList.add("btn-secondary");
        estadoToggle.textContent = "No perdido";
        estadoToggle.setAttribute("data-estado", "0");
    }

    mostrarModal();
}

function limpiarFormulario() {
    document.getElementById("form-mascota").reset();
}

function toggleEstado() {
    const estadoToggle = document.getElementById("estadoToggle");

    if (estadoToggle.classList.contains("btn-secondary")) {
        // Cambiar a "Perdido"
        estadoToggle.classList.remove("btn-secondary");
        estadoToggle.classList.add("btn-danger");
        estadoToggle.textContent = "Perdido";
        estadoToggle.setAttribute("data-estado", "1");
    } else {
        // Cambiar a "No perdido"
        estadoToggle.classList.remove("btn-danger");
        estadoToggle.classList.add("btn-secondary");
        estadoToggle.textContent = "No perdido";
        estadoToggle.setAttribute("data-estado", "0"); // 0 representa "No perdido"
    }
}

async function cargarMascotasPerdidas() {
    console.log("Cargando mascotas perdidas");

    const { data: mascotas, error } = await supabases
        .from("mascota")
        .select("*")
        .eq("estado", 1);

    if (error) {
        console.error("Error al cargar las mascotas perdidas:", error);
        alert("Hubo un problema al cargar las mascotas.");
        return;
    }

    const tablaCuerpo = document.querySelector("#contenido tbody");
    tablaCuerpo.innerHTML = ""; // Limpiar la tabla antes de rellenarla

    // Rellenar la tabla con los datos de las mascotas
    mascotas.forEach(mascota => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${mascota.nombre}</td>
            <td>${mascota.especie}</td>
            <td>${mascota.edad}</td>
            <td>${mascota.raza}</td>
            <td>${mascota.tamano}</td>
            <td>${mascota.color1}</td>
            <td>${mascota.color2}</td>
            <td>${mascota.color3}</td>
            <td>
                <button class="btn btn-info btn-sm" onclick="verMascota(${mascota.id})">
                    <i class="fas fa-eye"></i> Ver
                </button>
            </td>
        `;

        tablaCuerpo.appendChild(fila);
    });
}

async function verMascota(id) {
    console.log("Cargando detalles de la mascota con ID:", id);

    const { data: mascota, error } = await supabases
        .from("mascota")
        .select("*")
        .eq("id", id)
        .single(); 

    if (error) {
        console.error("Error al cargar los datos de la mascota:", error);
        alert("Hubo un problema al cargar los detalles de la mascota.");
        return;
    }

    
    document.getElementById("mascotaNombre").textContent = mascota.nombre;
    document.getElementById("mascotaEspecie").textContent = mascota.especie;
    document.getElementById("mascotaEdad").textContent = mascota.edad;
    document.getElementById("mascotaRaza").textContent = mascota.raza;
    document.getElementById("mascotaTamano").textContent = mascota.tamano;
    document.getElementById("mascotaColor1").textContent = mascota.color1;
    document.getElementById("mascotaColor2").textContent = mascota.color2 || "N/A";
    document.getElementById("mascotaColor3").textContent = mascota.color3 || "N/A";
    document.getElementById("mascotaDescripcion").textContent = mascota.descripcion || "Sin descripción";
    document.getElementById("mascotaEstado").textContent = mascota.estado === 1 ? "Perdido" : "No perdido";

    
    const imagenUrl = await obtenerUrlImagen(mascota.foto_perfil);

    
    if (imagenUrl) {
        const imagenElemento = document.getElementById("mascotaImagen"); 
        imagenElemento.src = imagenUrl; 
        imagenElemento.alt = `Imagen de ${mascota.nombre}`;
    } else {
        console.log("No se pudo obtener la URL de la imagen.");
    }    
    mostrarModalVerMascota();
}


async function obtenerUrlImagen(nombreImagen) {
    // Verificar que el nombre de la imagen se ha pasado como parámetro
    if (!nombreImagen) {
        console.error("Debe proporcionar el nombre de la imagen.");
        return;
    }

    // Construir la URL pública completa de la imagen
    const publicUrl = `https://duwjaewngocuzsfpgpiz.supabase.co/storage/v1/object/public/imagenes_mascotas/${nombreImagen}`;

    // Imprimir la URL de la imagen en la consola
    console.log('URL pública de la imagen:', publicUrl);

    // Retornar la URL para su uso posterior
    return publicUrl;
}

/*
async function buscarMascotasPerdidas(datos) {
    console.log("Buscando mascotas perdidas con datos:", datos);

    // Realizar la consulta en la base de datos
    const { data: mascotas, error } = await supabases
        .from("mascota")
        .select("*")
        .eq("estado", 1) // Solo buscar mascotas perdidas
        .or(`especie.eq.${datos.especie},raza.eq.${datos.raza},tamano.eq.${datos.tamano}`);

    if (error) {
        console.error("Error al buscar mascotas perdidas:", error);
        return [];
    }

    // Filtrar las mascotas perdidas para verificar coincidencias de colores
    const mascotasCoincidentes = mascotas.filter(mascota => {
        const coloresMascotaEncontrada = [datos.color1, datos.color2, datos.color3].sort();
        const coloresMascotaPerdida = [mascota.color1, mascota.color2, mascota.color3].sort();

        // Comparar los colores de ambas mascotas (sin importar el orden)
        return coloresMascotaEncontrada.every(color => coloresMascotaPerdida.includes(color));
    });

    return mascotasCoincidentes; // Retornar las mascotas encontradas que coinciden con los criterios
}*/

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

