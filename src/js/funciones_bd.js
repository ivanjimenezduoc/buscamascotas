const supabaseUrl = 'https://duwjaewngocuzsfpgpiz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1d2phZXduZ29jdXpzZnBncGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwMzYyMDMsImV4cCI6MjA0NDYxMjIwM30.o0_3AiKv5IzhaoD3-aLMefClqLrChrwaI3RAbGqGEBQ';
const supabases = supabase.createClient(supabaseUrl, supabaseAnonKey);


//FUNCIONES USUARIO


async function cargarUsuario() {
    const { data: usuario, error } = await supabases.from('dueno').select(`
        id, 
        nombre, 
        fecha_nacimiento,
        direccion,
        correo,
        telefono1,
        telefono2
    `).eq("id", 1);

    if (error) {
        console.error("Error al cargar usuario:", error);
        return;
    }

    // Guardar en Session Storage con la clave "usuario"
    if (usuario) {
        sessionStorage.setItem("usuario", JSON.stringify(usuario));
        console.log("Datos guardados en Session Storage:", usuario);
    }
}



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

    const imagenInput = document.getElementById("imagenMascota");
    let imagen = null;

    if (imagenInput.files.length > 0) {
        const imagenArchivo = imagenInput.files[0];
        const nombreImagen = `imagenes_mascotas/${Date.now()}_${imagenArchivo.name}`;
        const { data: imagenData, error: imagenError } = await supabases.storage
            .from("imagenes_mascotas")
            .upload(nombreImagen, imagenArchivo);

        if (imagenError) {
            console.error("Error al subir la imagen:", imagenError);
            alert("Hubo un problema al subir la imagen.");
            return;
        }
        imagen = nombreImagen;
    }

    const estado = 0;
    const { data, error } = await supabases
        .from("mascota_encontrada")
        .insert([{ raza, color1, color2, color3, especie, tamano, estado, ubicacion, descripcion, sexo, imagen }]);

    if (error) {
        console.error("Error al guardar la mascota encontrada:", error);
        alert("Hubo un problema al guardar la mascota.");
        return;
    } else {
        cargarMascotasEncontradas();
        ocultarFormulario();
        limpiarFormulario(); // Llamamos la función para limpiar el formulario
    }

    const mascotaGuardada = {
        especie,
        raza,
        color1,
        color2,
        color3,
        tamano
    };
    const coincidencias = await buscarCoincidencias(mascotaGuardada, "mascota", 1);

    // Si hay coincidencias, mostrar el modal
    if (coincidencias.length > 0) {
        const mensaje = `Se encontraron ${coincidencias.length} mascota(s) en la sección de mascotas perdidas que corresponden con los datos ingresados. ¿Quieres ir a verlas?`;
        document.getElementById('mensajeCoincidencias').innerText = mensaje;
        $('#modalCoincidencias').modal('show');
    }
}

// Función para limpiar los campos del formulario
function limpiarFormulario() {
    // Limpiar todos los selectores
    document.getElementById("especie").value = "";
    document.getElementById("raza").value = "";
    document.getElementById("sexo").value = "";as
    document.getElementById("tamano").value = "";
    document.getElementById("color1").value = "";
    document.getElementById("color2").value = "";
    document.getElementById("color3").value = "";
    
    // Limpiar los campos de texto
    document.getElementById("descripcion").value = "";
    document.getElementById("ubicacion").value = "";

    // Limpiar el campo de archivo (imagen)
    document.getElementById("imagenMascota").value = "";

    // Si usas alguna librería para resetear los campos del formulario, puedes usar también:
    // document.getElementById("form-mascota").reset();
}



async function cargarMascotasEncontradas() {
    const { data: mascotas, error } = await supabases.from('mascota_encontrada').select(`
        especie (id, nombre), 
        raza (id, raza), 
        sexo (id, sexo), 
        tamano (id, tamano), 
        color1 (id, codigo, color), 
        color2 (id, codigo, color), 
        color3 (id, codigo, color),  
        descripcion,        
        ubicacion,
        imagen
    `).eq("estado", 0);

    if (error) {
        console.error("Error al cargar las mascotas encontradas:", error);
        return;
    }

    const container = document.getElementById("mascotas-container");
    container.innerHTML = "";

    if (mascotas.length === 0) {
        console.log("No se encontraron mascotas.");
        return;
    }


    mascotas.sort((a, b) => a.id - b.id);

    const table = document.createElement("table");
    table.className = "table table-striped mascota-table";

    for (const mascota of mascotas) {
        const imagenUrl = await obtenerUrlImagen(mascota.imagen);

        const row = document.createElement("tr");

        const cardCell = document.createElement("td");
        cardCell.className = "mascota-p-image-cell";

        const card = document.createElement("div");
        card.className = "mascota-card fondo-card-encontrada card mt-4";

        const cardInner = document.createElement("div");
        cardInner.className = "d-flex flex-column flex-lg-row";

        const imageColumn = document.createElement("div");
        imageColumn.className = "mascota-p-image-column col-12 col-lg-4";

        const imageContainer = document.createElement("div");
        if (imagenUrl) {
            imageContainer.innerHTML = `<img src="${imagenUrl}" class="mascota-p-image" alt="Imagen de ${mascota.nombre}">`;
        } else {
            imageContainer.innerHTML = `<img src="../images/logo_gris.png" class="mascota-p-image" alt="Logo Gris" style="opacity: 0.5;">`;
        }

        imageColumn.appendChild(imageContainer);

        const dataColumn = document.createElement("div");
        dataColumn.className = "mascota-data-column col-12 col-lg-4";

        dataColumn.innerHTML = `
            <div class="form-group">
                <label for="especie-${mascota.id}">Especie:</label>
                <input type="text" id="especie-${mascota.id}" class="form-control" value="${mascota.especie ? mascota.especie.nombre : ""}" readonly>
            </div>
            <div class="form-group">
                <label for="raza-${mascota.id}">Raza:</label>
                <input type="text" id="raza-${mascota.id}" class="form-control" value="${mascota.raza ? mascota.raza.raza : ""}" readonly>
            </div>
            <div class="form-group">
                <label for="sexo-${mascota.id}">Sexo:</label>
                <input type="text" id="sexo-${mascota.id}" class="form-control" value="${mascota.sexo ? mascota.sexo.sexo : ""}" readonly>
            </div>
            <div class="form-group">
                <label for="tamano-${mascota.id}">Tamaño:</label>
                <input type="text" id="tamano-${mascota.id}" class="form-control" value="${mascota.tamano ? mascota.tamano.tamano : ""}" readonly>
            </div>
        `;

        const colorsColumn = document.createElement("div");
        colorsColumn.className = "mascota-colors-column col-12 col-lg-4";



        const button = document.createElement("button");
        button.className = "btn info-button";
        button.textContent = "Más Info";

        
        button.addEventListener("click", function () {
            const ubicacion = mascota.ubicacion; 
            const descripcion = mascota.descripcion; 
            mostrarModal(ubicacion, descripcion); 
        });
        colorsColumn.appendChild(button);

        const colorsTitle = document.createElement("h5");
        colorsTitle.textContent = "Colores";
        colorsColumn.appendChild(colorsTitle);

        const circlesContainer = document.createElement("div");
        circlesContainer.className = "circles-container";

        [mascota.color1, mascota.color2, mascota.color3].forEach(colorObj => {
            if (colorObj) {
                const circle = document.createElement("div");
                circle.className = "color-circle";
                circle.style.backgroundColor = colorObj.codigo;
                circle.title = colorObj.color;
                circlesContainer.appendChild(circle);
            }
        });

        colorsColumn.appendChild(circlesContainer);

        cardInner.appendChild(imageColumn);
        cardInner.appendChild(dataColumn);
        cardInner.appendChild(colorsColumn);

        card.appendChild(cardInner);
        cardCell.appendChild(card);
        row.appendChild(cardCell);

        table.appendChild(row);
    }

    container.appendChild(table);

   
    const geocoder = new google.maps.Geocoder();
    const bounds = new google.maps.LatLngBounds(); 

    for (const mascota of mascotas) {
        if (mascota.ubicacion) {
            console.log(`Procesando ubicación: ${mascota.ubicacion}`);

            geocoder.geocode({ address: mascota.ubicacion }, (results, status) => {
                if (status === "OK") {
                    const location = results[0].geometry.location;

                  
                    console.log(`Ubicación colocada: ${mascota.ubicacion}`);

                   
                    const marker = new google.maps.Marker({
                        position: location,
                        map: mapPrincipal, 
                        title: `Mascota encontrada: ${mascota.especie.nombre}`,
                    });

                  
                    marker.addListener("click", function() {
                        mostrarModalDetalles(mascota);  
                    });

                   
                    bounds.extend(location);

                    
                    mapPrincipal.fitBounds(bounds);
                } else {
                    console.error(`No se pudo geocodificar la ubicación: ${mascota.ubicacion}, Error: ${status}`);
                }
            });
        }
    }
}


// Función para mostrar el modal con la información de la mascota
function mostrarModal(ubicacion, descripcion, mascota) {
    // Rellenamos el contenido del modal con la información de la mascota
    document.getElementById('modal-especie').textContent = mascota.especie.nombre;
    document.getElementById('modal-raza').textContent = mascota.raza.raza;
    document.getElementById('modal-sexo').textContent = mascota.sexo.sexo;
    document.getElementById('modal-tamano').textContent = mascota.tamano.tamano;

    // Colores
    const colores = [mascota.color1, mascota.color2, mascota.color3].filter(Boolean).map(c => c.color).join(", ");
    document.getElementById('modal-colores').textContent = colores;

    document.getElementById('modal-descripcion').textContent = descripcion;
    document.getElementById('modal-ubicacion').textContent = ubicacion;

    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('mascotaModal'));
    modal.show();
}

async function mostrarModalDetalles(mascota) {
    // Obtener los elementos del modal
    const modalImagen = document.getElementById("modal-imagen");
    const modalEspecie = document.getElementById("modal-especie");
    const modalRaza = document.getElementById("modal-raza");
    const modalSexo = document.getElementById("modal-sexo");
    const modalTamano = document.getElementById("modal-tamano");
    const modalColores = document.getElementById("modal-colores");
    const modalDescripcion = document.getElementById("modal-descripcion");
    const modalUbicacion = document.getElementById("modal-ubicacion");

    // Asignar los datos de la mascota al modal
    modalEspecie.textContent = mascota.especie ? mascota.especie.nombre : "Desconocido";
    modalRaza.textContent = mascota.raza ? mascota.raza.raza : "Desconocida";
    modalSexo.textContent = mascota.sexo ? mascota.sexo.sexo : "Desconocido";
    modalTamano.textContent = mascota.tamano ? mascota.tamano.tamano : "Desconocido";
    
    // Colores (mostramos los colores disponibles)
    const colores = [mascota.color1, mascota.color2, mascota.color3].filter(c => c); // Filtramos los colores disponibles
    modalColores.textContent = colores.length > 0 ? colores.map(c => c.color).join(", ") : "Sin colores definidos";

    modalDescripcion.textContent = mascota.descripcion ? mascota.descripcion : "Sin descripción disponible.";
    modalUbicacion.textContent = mascota.ubicacion ? mascota.ubicacion : "Ubicación no especificada.";

    // Obtener la URL de la imagen
    const imagenUrl = await obtenerUrlImagen(mascota.imagen);  // Usamos la función para obtener la URL

    // Verificar si la URL de la imagen es válida
    if (imagenUrl) {
        modalImagen.src = imagenUrl;
    } else {
        modalImagen.src = '../images/logo_gris.png';  // Imagen predeterminada si no se encuentra la imagen de la mascota
    }

    // Crear una nueva instancia del modal de Bootstrap y abrirlo
    const modal = new bootstrap.Modal(document.getElementById('modalMascotaDetalles'), {
        backdrop: 'static', // Para evitar que se cierre haciendo clic fuera del modal
        keyboard: false     // Para evitar que se cierre con la tecla ESC
    });

    // Abrir el modal
    modal.show();
}





//FUNCIONES MIS MASCOTAS


async function guardarMiMascota(x) {
    const usuarioData = JSON.parse(sessionStorage.getItem("usuario"));
const id_dueno = usuarioData.id;

    console.log("guardando datos para el id " + id_dueno)
    const errorFields = document.querySelectorAll(".error-message");
    errorFields.forEach(error => error.remove());

    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    const especie = document.getElementById("especie").value;
    const raza = document.getElementById("raza").value;
    const tamano = document.getElementById("tamano").value;
    const color1 = document.getElementById("color1").value;
    const color2 = document.getElementById("color2").value || null;
    const color3 = document.getElementById("color3").value || null;
    const sexo = document.getElementById("sexo").value;
    const descripcion = document.getElementById("descripcion").value.trim();
    const estado = document.getElementById("estado").value; // Obtenemos el estado del combo box

    const errores = [];
    if (!nombre) errores.push({ campo: "nombre", mensaje: "Debes ingresar un nombre." });
    if (!edad) errores.push({ campo: "edad", mensaje: "Debes ingresar la edad de tu mascota." });
    if (!especie) errores.push({ campo: "especie", mensaje: "Debes seleccionar una especie." });
    if (!raza) errores.push({ campo: "raza", mensaje: "Debes seleccionar una raza." });
    if (!tamano) errores.push({ campo: "tamano", mensaje: "Debes seleccionar un tamaño." });
    if (!color1) errores.push({ campo: "color1", mensaje: "Debes seleccionar al menos un color." });
    if (!sexo) errores.push({ campo: "sexo", mensaje: "Debes seleccionar el sexo." });
    if (!descripcion) errores.push({ campo: "descripcion", mensaje: "Debes ingresar una descripción." });
    if (!estado) errores.push({ campo: "estado", mensaje: "Debes seleccionar un estado." });

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


    const imagenInput = document.getElementById("imagenMascota");
    let foto_perfil = null;

    if (imagenInput.files.length > 0) {
        const imagenArchivo = imagenInput.files[0];
        const nombreImagen = `imagenes_mascotas/${Date.now()}_${imagenArchivo.name}`;
        const { data: imagenData, error: imagenError } = await supabases.storage
            .from("imagenes_mascotas")
            .upload(nombreImagen, imagenArchivo);

        if (imagenError) {
            console.error("Error al subir la imagen:", imagenError);
            alert("Hubo un problema al subir la imagen.");
            return;
        }

        foto_perfil = nombreImagen;
    }


    const { data, error } = await supabases
        .from("mascota")
        .insert([{ nombre, raza, edad, color1, color2, color3, especie, tamano, estado, descripcion, id_dueno, foto_perfil, sexo }]);

    if (error) {
        console.error("Error al guardar la mascota:", error);
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

        cargarMisMascotas(id_dueno);
        ocultarFormulario();

        // Si el estado es 1, buscar coincidencias
        if (parseInt(estado, 10) === 1) {
            const mascotaGuardada = {
                especie,
                raza,
                color1,
                color2,
                color3,
                tamano
            };

            const coincidencias = await buscarCoincidencias(mascotaGuardada, "mascota_encontrada", 0);

            // Mostrar el modal si hay coincidencias
            if (coincidencias.length > 0) {
                const mensaje = `Se encontraron ${coincidencias.length} mascota(s) en la sección de mascotas encontradas que corresponden con los datos ingresados. ¿Quieres ir a verlas?`;
                document.getElementById('mensajeCoincidencias').innerText = mensaje;
                $('#modalCoincidencias').modal('show');
            }
        }
    }
}



async function cargarMisMascotas(dueno_index) {
    console.log("Cargando mascotas para el dueño con id " + dueno_index + "...");

    const { data: mascotas, error } = await supabases.from('mascota').select(`
        id,
        nombre,
        raza (id, raza), 
        edad,
        color1 (id, codigo, color), 
        color2 (id, codigo, color), 
        color3 (id, codigo, color),  
        especie (id, nombre),                 
        tamano (id, tamano), 
        estado,
        descripcion,
        foto_perfil,
        sexo,
        direccion_perdida
    `).eq("id_dueno", dueno_index);

    if (error) {
        console.error("Error al cargar las mascotas:", error);
        return;
    }

    const container = document.getElementById("mascotas-container");
    container.innerHTML = "";

    mascotas.sort((a, b) => a.id - b.id);

    const table = document.createElement("table");
    table.className = "table table-striped mascota-table";

    for (const mascota of mascotas) {
        const imagenUrl = await obtenerUrlImagen(mascota.foto_perfil);

        const row = document.createElement("tr");

        const cardCell = document.createElement("td");
        cardCell.className = "mascota-image-cell";

        const card = document.createElement("div");
        card.className = "mascota-card fondo-card-mis card mt-4";

        const cardInner = document.createElement("div");
        cardInner.className = "d-flex flex-column flex-lg-row";

        const imageColumn = document.createElement("div");
        imageColumn.className = "mascota-image-column col-12 col-lg-4";

        const imageContainer = document.createElement("div");
        imageContainer.innerHTML = imagenUrl
            ? `<img src="${imagenUrl}" class="mascota-image" alt="Imagen de ${mascota.nombre}">`
            : `<img src="../images/logo_gris.png" class="mascota-image" alt="Logo Gris" style="opacity: 0.5;">`;

        imageColumn.appendChild(imageContainer);

        const dataColumn = document.createElement("div");
        dataColumn.className = "mascota-data-column col-12 col-lg-8";

        dataColumn.innerHTML = `
            <div class="form-group">
                <label for="especie-${mascota.id}">Especie:</label>
                <input type="text" id="especie-${mascota.id}" class="form-control" value="${mascota.especie ? mascota.especie.nombre : ""}" readonly>
            </div>
            <div class="form-group">
                <label for="edad-${mascota.id}">Edad:</label>
                <input type="text" id="edad-${mascota.id}" class="form-control" value="${mascota.edad} años" readonly>
            </div>
            <div class="form-group">
                <label for="raza-${mascota.id}">Raza:</label>
                <input type="text" id="raza-${mascota.id}" class="form-control" value="${mascota.raza ? mascota.raza.raza : ""}" readonly>
            </div>
            <div class="form-group">
                <label for="tamano-${mascota.id}">Tamaño:</label>
                <input type="text" id="tamano-${mascota.id}" class="form-control" value="${mascota.tamano ? mascota.tamano.tamano : ""}" readonly>
            </div>
        `;

        const colorsContainer = document.createElement("div");
        colorsContainer.className = "form-group";

        const colorsLabel = document.createElement("label");
        colorsLabel.textContent = "Colores:";
        colorsLabel.className = "aligned-label";
        colorsContainer.appendChild(colorsLabel);

        const colorsCircles = document.createElement("div");
        colorsCircles.style.display = "inline-flex";
        colorsCircles.style.gap = "10px";
        colorsCircles.style.marginLeft = "10px";

        [mascota.color1, mascota.color2, mascota.color3].forEach((colorObj) => {
            if (colorObj) {
                const circle = document.createElement("div");
                circle.className = "color-circle";
                circle.style.backgroundColor = colorObj.codigo;
                circle.style.width = "20px";
                circle.style.height = "20px";
                circle.style.borderRadius = "50%";
                circle.style.border = "1px solid #000";
                circle.title = colorObj.color;
                colorsCircles.appendChild(circle);
            }
        });

        colorsContainer.appendChild(colorsCircles);
        dataColumn.appendChild(colorsContainer);

        const descriptionContainer = document.createElement("div");
        descriptionContainer.className = "form-group";

        const descriptionLabel = document.createElement("label");
        descriptionLabel.setAttribute("for", `descripcion-${mascota.id}`);
        descriptionLabel.textContent = "Descripción:";
        descriptionContainer.appendChild(descriptionLabel);

        const descriptionTextarea = document.createElement("textarea");
        descriptionTextarea.id = `descripcion-${mascota.id}`;
        descriptionTextarea.className = "form-control";
        descriptionTextarea.rows = 3;
        descriptionTextarea.readOnly = true;
        descriptionTextarea.textContent = mascota.descripcion;
        descriptionContainer.appendChild(descriptionTextarea);

        dataColumn.appendChild(descriptionContainer);

        // Estado de la mascota (Label y Combobox)
        const estadoContainer = document.createElement("div");
        estadoContainer.className = "form-group d-flex align-items-center"; // Alineamos los elementos

        const estadoLabel = document.createElement("label");
        estadoLabel.setAttribute("for", `estado-${mascota.id}`);
        estadoLabel.textContent = "Estado:";
        estadoContainer.appendChild(estadoLabel);

        const estadoSelect = document.createElement("select");
        estadoSelect.id = `estado-${mascota.id}`;
        estadoSelect.className = "form-control";
        estadoSelect.innerHTML = `
            <option value="0" ${mascota.estado === 0 ? 'selected' : ''}>No perdido</option>
            <option value="1" ${mascota.estado === 1 ? 'selected' : ''}>Perdido</option>
            <option value="2" ${mascota.estado === 2 ? 'selected' : ''}>Fallecido</option>
        `;

        // Botón Guardar al lado del combobox
        const btnActualizar = document.createElement("button");
        btnActualizar.className = "btn btn-success btn-sm ml-2";
        btnActualizar.innerHTML = `<i class="fas fa-save"></i>`;
        btnActualizar.addEventListener("click", () => {
            const estadoSeleccionado = estadoSelect.value;
            const direccion = document.getElementById(`ubicacion-${mascota.id}`).value;
            actualizarMascota(mascota.id, estadoSeleccionado, direccion);
        });

        // Insertar el botón junto al combobox
        estadoContainer.appendChild(estadoSelect);
        estadoContainer.appendChild(btnActualizar);
        dataColumn.appendChild(estadoContainer);

        // Ubicación (Solo visible cuando el estado es "Perdido")
        const ubicacionContainer = document.createElement("div");
        ubicacionContainer.id = `ubicacion-container-${mascota.id}`;
        ubicacionContainer.className = "form-group"; // Aseguramos que el contenedor tenga la misma clase

        const ubicacionLabel = document.createElement("label");
        ubicacionLabel.setAttribute("for", `ubicacion-${mascota.id}`);
        ubicacionLabel.textContent = "Última Ubicación:";
        ubicacionContainer.appendChild(ubicacionLabel);

        const ubicacionInput = document.createElement("input");
        ubicacionInput.type = "text";
        ubicacionInput.id = `ubicacion-${mascota.id}`;
        ubicacionInput.className = "form-control";
        ubicacionInput.value = mascota.direccion_perdida || "";
        ubicacionContainer.appendChild(ubicacionInput);

        // Botón "Generar cartel" debajo de la ubicación
        const btnGenerarCartel = document.createElement("button");
        btnGenerarCartel.className = "btn btn-primary btn-sm mt-2 pl";
        btnGenerarCartel.textContent = "Generar Cartel";

        // Llamar a cargarDatosMascotaYDueno al hacer clic en el botón
        btnGenerarCartel.addEventListener("click", () => {
            // Llamamos a cargar los datos de la mascota y dueño
            generarCartel(dueno_index, mascota.id);
        });

        // Agregar el botón debajo de la ubicación
        ubicacionContainer.appendChild(btnGenerarCartel);

        estadoSelect.addEventListener("change", () => {
            if (estadoSelect.value === "1") {
                ubicacionContainer.style.display = "flex";  // Mostrar ubicación
                btnGenerarCartel.style.display = "flex";   // Mostrar botón
                btnGenerarCartel.style.marginTop = "10px"; // Separar el botón de la ubicación
            } else {
                ubicacionContainer.style.display = "none";  // Ocultar ubicación
                btnGenerarCartel.style.display = "none";    // Ocultar botón
            }
        });

        dataColumn.appendChild(ubicacionContainer);

        cardInner.appendChild(imageColumn);
        cardInner.appendChild(dataColumn);

        card.appendChild(cardInner);
        cardCell.appendChild(card);

        row.appendChild(cardCell);

        table.appendChild(row);
    }

    container.appendChild(table);
}

async function actualizarMascota(id, estado, direccion) {
    const updateData = { estado };

    // Si la dirección de la ubicación está presente y la mascota está perdida
    if (estado === "1" && direccion) {
        updateData.direccion_perdida = direccion;
    }

    const { data, error } = await supabases
        .from('mascota')
        .update(updateData)
        .eq('id', id);

    if (error) {
        console.error("Error al actualizar mascota:", error);
    } else {
        console.log("Mascota actualizada:");
    }
}

async function generarCartel(idDueno, idMascota) {
    try {
        // Realizamos una consulta unida para traer los datos del dueño y la mascota
        const { data, error } = await supabases
            .from('mascota')
            .select(`
                id,
                nombre,
                raza (id, raza), 
                edad,
                color1 (id, codigo, color), 
                color2 (id, codigo, color), 
                color3 (id, codigo, color),  
                especie (id, nombre),                 
                tamano (id, tamano), 
                estado,
                descripcion,
                foto_perfil,
                sexo,
                direccion_perdida,
                dueno:dueno (id, nombre, telefono1, telefono2)
            `)
            .eq('id', idMascota)
            .eq('id_dueno', idDueno);

        // Verificamos si hubo errores en la consulta
        if (error) {
            console.error("Error al cargar datos:", error);
            return;
        }

        // Si encontramos los datos, los pasamos a la nueva página
        if (data && data.length > 0) {
            const mascota = data[0];

            // Generamos la URL con los parámetros
            const url = new URL('cartel_mascota.html', window.location.href); 
            const params = new URLSearchParams();
            
            params.append('id', mascota.id);
            params.append('nombre', mascota.nombre);
            params.append('especie', mascota.especie ? mascota.especie.nombre : '');
            params.append('edad', mascota.edad);
            params.append('raza', mascota.raza ? mascota.raza.raza : '');
            params.append('tamano', mascota.tamano ? mascota.tamano.tamano : '');
            params.append('descripcion', mascota.descripcion);
            params.append('foto_perfil', mascota.foto_perfil);
            params.append('direccion_perdida', mascota.direccion_perdida || '');

            // Datos del dueño
            if (mascota.dueno) {
                params.append('dueno_nombre', mascota.dueno.nombre);
                params.append('dueno_telefono1', mascota.dueno.telefono1);
                params.append('dueno_telefono2', mascota.dueno.telefono2);
            }

            // Se agregan los parámetros a la URL
            url.search = params.toString();
            
            // Abrimos la página en una nueva pestaña con los parámetros
            window.open(url, '_blank');
        } else {
            console.log("No se encontraron datos para los IDs proporcionados.");
        }
    } catch (error) {
        console.error("Error en la función:", error);
    }
}



//FUNCIONES MASCOTAS PERDIDAS

async function cargarMascotasPerdidas() {
    const { data: mascotas, error } = await supabases.from('mascota').select(`
        nombre,
        edad,
        especie (id, nombre), 
        raza (id, raza), 
        sexo (id, sexo), 
        tamano (id, tamano), 
        color1 (id, codigo, color), 
        color2 (id, codigo, color), 
        color3 (id, codigo, color), 
        foto_perfil,
        direccion_perdida,
        descripcion
    `).eq("estado", 1);

    if (error) {
        console.error("Error al cargar las mascotas encontradas:", error);
        return;
    }

    const container = document.getElementById("mascotas-container");
    container.innerHTML = "";

    if (mascotas.length === 0) {
        console.log("No se encontraron mascotas.");
        return;
    }

    mascotas.sort((a, b) => a.id - b.id);

    const table = document.createElement("table");
    table.className = "table table-striped mascota-table";

    for (const mascota of mascotas) {
        const imagenUrl = await obtenerUrlImagen(mascota.foto_perfil);

        const row = document.createElement("tr");

        const cardCell = document.createElement("td");
        cardCell.className = "mascota-p-image-cell";

        const card = document.createElement("div");
        card.className = "mascota-card fondo-card-perdida card mt-4";
        const cardInner = document.createElement("div");
        cardInner.className = "d-flex flex-column flex-lg-row";
        const imageColumn = document.createElement("div");
        imageColumn.className = "mascota-p-image-column col-12 col-lg-4";
        const imageContainer = document.createElement("div");
        if (imagenUrl) {
            imageContainer.innerHTML = `<img src="${imagenUrl}" class="mascota-p-image" alt="Imagen de ${mascota.nombre}">`;
        } else {
            imageContainer.innerHTML = `<img src="../images/logo_gris.png" class="mascota-p-image" alt="Logo Gris" style="opacity: 0.5;">`;
        }

        imageColumn.appendChild(imageContainer);


        const dataColumn = document.createElement("div");
        dataColumn.className = "mascota-data-column col-12 col-lg-4";
        dataColumn.innerHTML = `
              <div class="form-group">
                <label for="nombre-${mascota.id}">Nombre:</label>
                <input type="text" id="nombre-${mascota.id}" class="form-control" value="${mascota.nombre}" readonly>
            </div>
            <div class="form-group">
                <label for="especie-${mascota.id}">Especie:</label>
                <input type="text" id="especie-${mascota.id}" class="form-control" value="${mascota.especie ? mascota.especie.nombre : ""}" readonly>
            </div>
            <div class="form-group">
                <label for="raza-${mascota.id}">Raza:</label>
                <input type="text" id="raza-${mascota.id}" class="form-control" value="${mascota.raza ? mascota.raza.raza : ""}" readonly>
            </div>
            <div class="form-group">
                <label for="sexo-${mascota.id}">Sexo:</label>
                <input type="text" id="sexo-${mascota.id}" class="form-control" value="${mascota.sexo ? mascota.sexo.sexo : ""}" readonly>
            </div>
            <div class="form-group">
                <label for="tamano-${mascota.id}">Tamaño:</label>
                <input type="text" id="tamano-${mascota.id}" class="form-control" value="${mascota.tamano ? mascota.tamano.tamano : ""}" readonly>
            </div>
        `;


        const colorsColumn = document.createElement("div");
        colorsColumn.className = "mascota-colors-column col-12 col-lg-4";
        const button = document.createElement("button");
        button.className = "btn info-button";
        button.textContent = "Más Info";


        button.addEventListener("click", function () {
            const ubicacion = mascota.direccion_perdida
            const descripcion = mascota.descripcion;
            mostrarModal(ubicacion, descripcion);
        });

        colorsColumn.appendChild(button);

        const colorsTitle = document.createElement("h5");
        colorsTitle.textContent = "Colores";
        colorsColumn.appendChild(colorsTitle);

        const circlesContainer = document.createElement("div");
        circlesContainer.className = "circles-container";

        [mascota.color1, mascota.color2, mascota.color3].forEach(colorObj => {
            if (colorObj) {
                const circle = document.createElement("div");
                circle.className = "color-circle";
                circle.style.backgroundColor = colorObj.codigo;
                circle.title = colorObj.color;
                circlesContainer.appendChild(circle);
            }
        });

        colorsColumn.appendChild(circlesContainer);


        cardInner.appendChild(imageColumn);
        cardInner.appendChild(dataColumn);
        cardInner.appendChild(colorsColumn);

        card.appendChild(cardInner);
        cardCell.appendChild(card);
        row.appendChild(cardCell);

        table.appendChild(row);
    }

    container.appendChild(table);
}

// BUSQUEDA DE COINCIDENCIAS

async function buscarCoincidencias(mascota, tabla, estado) {
    const { data: mascotas, error } = await supabases.from(tabla)
        .select("*")
        .eq("estado", estado);
console.log(mascotas);
    if (error) {
        console.error("Error al buscar mascotas perdidas:", error);
        return [];
    }

    const coincidencias = [];
    for (let i = 0; i < mascotas.length; i++) {
        const encontrada = mascotas[i];


        const especieEncontrada = parseInt(encontrada.especie, 10);
        const especieMascota = parseInt(mascota.especie, 10);
        const razaEncontrada = parseInt(encontrada.raza, 10);
        const razaMascota = parseInt(mascota.raza, 10);
        const coloresEncontrados = [encontrada.color1, encontrada.color2, encontrada.color3].filter(c => c).map(c => parseInt(c, 10)).sort();
        const coloresMascota = [mascota.color1, mascota.color2, mascota.color3].filter(c => c).map(c => parseInt(c, 10)).sort();


        if (
            especieEncontrada === especieMascota &&
            razaEncontrada === razaMascota &&
            coloresEncontrados.join(",") === coloresMascota.join(",")
        ) {
            coincidencias.push(encontrada);
        }
    }

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
async function obtenerUrlImagen(nombreImagen) {
    if (!nombreImagen) {
        return null;
    }

    const publicUrl = `https://duwjaewngocuzsfpgpiz.supabase.co/storage/v1/object/public/imagenes_mascotas/${nombreImagen}`;
    return publicUrl;
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

async function cargarDatosMascotaYDueno(idDueno, idMascota) {
    try {
        // Realizamos una consulta unida para traer los datos del dueño y la mascota
        const { data, error } = await supabases
            .from('mascota')
            .select(`
                id,
                nombre,
                raza (id, raza), 
                edad,
                color1 (id, codigo, color), 
                color2 (id, codigo, color), 
                color3 (id, codigo, color),  
                especie (id, nombre),                 
                tamano (id, tamano), 
                estado,
                descripcion,
                foto_perfil,
                sexo,
                direccion_perdida,
                dueno:dueno (id, nombre, telefono1, telefono2)
            `)
            .eq('id', idMascota)
            .eq('id_dueno', idDueno);

        // Verificamos si hubo errores en la consulta
        if (error) {
            console.error("Error al cargar datos:", error);
            return;
        }

        // Mostramos los datos en consola si existen
        if (data && data.length > 0) {
            console.log("Datos de la mascota y su dueño:", data[0]);
        } else {
            console.log("No se encontraron datos para los IDs proporcionados.");
        }
    } catch (error) {
        console.error("Error en la función:", error);
    }
}

// REGISTRO USUARIOS


async function registrarUsuario() {
    const nombre = document.getElementById("signupNombre").value.trim();
    const fechaNacimiento = document.getElementById("signupFechaNacimiento").value;
    const direccion = document.getElementById("signupDireccion").value.trim();
    const correo = document.getElementById("signupEmailModal").value.trim(); // Correcto ID
    const telefono1 = document.getElementById("signupTelefono").value.trim();
    const password = document.getElementById("signupPasswordModal").value.trim(); // Correcto ID
    const password2 = document.getElementById("signupPassword2").value.trim();

    // Verificar si todos los campos están completos
    if (!nombre || !fechaNacimiento || !direccion || !correo || !telefono1 || !password || !password2) {
        mostrarMensajeError("Por favor, completa todos los campos.", "signupEmailModal");
        return;
    }

    // Validar que las contraseñas coincidan
    if (password !== password2) {
        mostrarMensajeError("Las contraseñas no coinciden.", "signupPassword2");
        return;
    }

    try {
        // Verificar si el correo ya existe
        const { data: usuariosExistentes, error: errorConsulta } = await supabases
            .from("dueno")
            .select("correo")
            .eq("correo", correo);

        if (errorConsulta) {
            console.error("Error al verificar la existencia del usuario:", errorConsulta);
            mostrarMensajeError("Ocurrió un error al verificar el correo.", "signupEmailModal");
            return;
        }

        if (usuariosExistentes.length > 0) {
            mostrarMensajeError("Este correo ya está registrado.", "signupEmailModal");
            return;
        }

        // Insertar datos en la tabla 'dueno'
        const { data, error } = await supabases.from("dueno").insert([{
            nombre: nombre,
            fecha_nacimiento: fechaNacimiento,
            direccion: direccion,
            correo: correo,
            telefono1: telefono1,
            telefono2: null,
            foto_perfil: null,
            password: password
        }]);

        if (error) {
            console.error("Error al registrar el usuario:", error);
            mostrarMensajeError("Hubo un error al registrar el usuario. Intenta nuevamente.", "signupEmailModal");
        } else {
            //alert("Usuario registrado exitosamente.");
            document.querySelector("#signupForm form").reset(); // Resetear el formulario
            showSignIn(); // Mostrar el formulario de inicio de sesión
        }
    } catch (error) {
        console.error("Error en la inserción:", error);
        mostrarMensajeError("Ocurrió un error inesperado.", "signupEmailModal");
    }
}
// Función para mostrar un mensaje de error debajo de un campo específico
function mostrarMensajeError(mensaje, inputId) {
    const inputElement = document.getElementById(inputId);
    if (!inputElement) return;

    // Eliminar mensajes previos si existen
    const existingError = inputElement.parentElement.querySelector(".error-message");
    if (existingError) existingError.remove();

    // Crear el mensaje de error
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.style.color = "red";
    errorDiv.style.fontSize = "0.9em";
    errorDiv.textContent = mensaje;

    // Insertar el mensaje debajo del input
    inputElement.parentElement.appendChild(errorDiv);
}

window.registrarUsuario = registrarUsuario;

async function iniciarSesion(event) {
    event.preventDefault(); // Previene el comportamiento predeterminado del botón

    const emailInput = document.getElementById("loginEmailModal");
    const passwordInput = document.getElementById("loginPasswordModal");

    // Verifica que los elementos existan
    if (!emailInput || !passwordInput) {
        console.error("No se encontraron los elementos necesarios para iniciar sesión.");
        return;
    }

    const correo = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const loginForm = document.getElementById("loginFormModal");

    // Eliminar mensajes de error previos
    const errorMessage = loginForm.querySelector(".error-message");
    if (errorMessage) errorMessage.remove();

    if (!correo || !password) {
        mostrarMensajeError(loginForm, "Por favor, completa ambos campos.");
        return;
    }

    try {
        const { data: usuario, error } = await supabases
            .from("dueno")
            .select("*")
            .eq("correo", correo)
            .eq("password", password);

        if (error) {
            console.error("Error al buscar usuario:", error);
            mostrarMensajeError(loginForm, "Ocurrió un error al iniciar sesión. Intenta más tarde.");
            return;
        }

        if (!usuario || usuario.length === 0) {
            mostrarMensajeError(passwordInput, "Credenciales inválidas. Inténtalo de nuevo.");
            return;
        }        


        sessionStorage.setItem("usuario", JSON.stringify(usuario[0]));

       const botonperfil = document.getElementById("miPerfil");
botonperfil.style.display = "inline-block";

        actualizarNavbarConUsuario(usuario[0]);
        closeLoginModal();
        //alert("Inicio de sesión exitoso.");
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        mostrarMensajeError(loginForm, "Ocurrió un error al iniciar sesión. Intenta más tarde.");
    }
}


function cerrarSesion() {
    sessionStorage.removeItem("usuario");



    const signOutButton = document.getElementById("signOutButton");
    const botonperfil = document.getElementById("miPerfil");
    if (signOutButton) {
        signOutButton.remove();
       // botonperfil.remove();
       botonperfil.style.display = "none";
    }

    const navbarContainer = document.getElementById("navbarSupportedContent");
    if (navbarContainer) {
        const signInButton = document.createElement("button");
        signInButton.className = "btn  btn-outline-success";
        signInButton.id = "signInButton";
        signInButton.textContent = "Ingresar";
        signInButton.addEventListener("click", openLoginModal);
        navbarContainer.appendChild(signInButton);
    }
}