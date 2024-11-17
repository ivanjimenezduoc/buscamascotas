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

    const imagenInput = document.getElementById("imagenMascota");
    if (imagenInput.files.length > 0) {
        const imagenArchivo = imagenInput.files[0];
        const nombreImagen = `imagenes_mascotas/${Date.now()}_${imagenArchivo.name}`;
        console.log("Intentando subir imagen:", nombreImagen);


        const { data: imagenData, error: imagenError } = await supabases.storage
            .from("imagenes_mascotas")
            .upload(nombreImagen, imagenArchivo);

        if (imagenError) {
            console.error("Error al subir la imagen:", imagenError);
            alert("Hubo un problema al subir la imagen.");
            return;
        }


        console.log("Imagen subida correctamente:", imagenData);
        imagen = nombreImagen;
    } else {
        imagen = null;
    }

    estado = 0
    const { data, error } = await supabases
        .from("mascota_encontrada")
        .insert([{ raza, color1, color2, color3, especie, tamano, estado, ubicacion, descripcion, imagen }]);

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
        cargarMascotasEncontradas();

    }

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
        card.className = "mascota-card fondo-card-encontrada";

        const imageColumn = document.createElement("div");
        imageColumn.className = "mascota-p-image-column";

        const imageContainer = document.createElement("div");
        if (imagenUrl) {
            imageContainer.innerHTML = `<img src="${imagenUrl}" class="mascota-p-image" alt="Imagen de ${mascota.nombre}">`;
        } else {
            imageContainer.innerHTML = `<img src="../images/logo_gris.png" class="mascota-p-image" alt="Logo Gris" style="opacity: 0.5;">`;
        }

        imageColumn.appendChild(imageContainer);

        const dataColumn = document.createElement("div");
        dataColumn.className = "mascota-data-column";

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
        colorsColumn.className = "mascota-colors-column";

        const button = document.createElement("button");
        button.className = "btn info-button";        
        button.textContent = "Más Info";
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

                // Mostrar el nombre del color al pasar el mouse
                circle.title = colorObj.color;

                circlesContainer.appendChild(circle);
            }
        });

        colorsColumn.appendChild(circlesContainer);

        // Ensamblar columnas en la tarjeta
        card.appendChild(imageColumn);
        card.appendChild(dataColumn);
        card.appendChild(colorsColumn);

        cardCell.appendChild(card);
        row.appendChild(cardCell);
        cardCell.appendChild(card);
        row.appendChild(cardCell);

        table.appendChild(row);
    }

    container.appendChild(table);
}

//FUNCIONES MIS MASCOTAS

async function guardarMiMascota() {


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

    const errores = [];
    if (!nombre) errores.push({ campo: "nombre", mensaje: "Debes ingresar un nombre." });
    if (!edad) errores.push({ campo: "edad", mensaje: "Debes ingresar la edad de tu mascota ." });
    if (!especie) errores.push({ campo: "especie", mensaje: "Debes seleccionar una especie." });
    if (!raza) errores.push({ campo: "raza", mensaje: "Debes seleccionar una raza." });
    if (!tamano) errores.push({ campo: "tamano", mensaje: "Debes seleccionar un tamaño." });
    if (!color1) errores.push({ campo: "color1", mensaje: "Debes seleccionar al menos un color." });
    if (!sexo) errores.push({ campo: "sexo", mensaje: "Debes seleccionar el sexo." });
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

    /*const usuario = JSON.parse(sessionStorage.getItem("usuario"));
        mascota.id_dueno = usuario.id ;*/
    let id_dueno = 1;



    const imagenInput = document.getElementById("imagenMascota");
    if (imagenInput.files.length > 0) {
        const imagenArchivo = imagenInput.files[0];
        const nombreImagen = `imagenes_mascotas/${Date.now()}_${imagenArchivo.name}`;
        console.log("Intentando subir imagen:", nombreImagen);


        const { data: imagenData, error: imagenError } = await supabases.storage
            .from("imagenes_mascotas")
            .upload(nombreImagen, imagenArchivo);

        if (imagenError) {
            console.error("Error al subir la imagen:", imagenError);
            alert("Hubo un problema al subir la imagen.");
            return;
        }


        console.log("Imagen subida correctamente:", imagenData);
        foto_perfil = nombreImagen;
    } else {
        foto_perfil = null;
    }


    const { data, error } = await supabases
        .from("mascota")
        .insert([{ nombre, raza, edad, color1, color2, color3, especie, tamano, estado, descripcion, id_dueno, foto_perfil, sexo, foto_perfil }]);

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
    cargarMisMascotas();

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
        sexo
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
        card.className = "mascota-card fondo-card-mis";

        const imageColumn = document.createElement("div");
        imageColumn.className = "mascota-image-column";

        const nameElement = document.createElement("div");
        nameElement.className = "mascota-name";
        nameElement.textContent = mascota.nombre;

        const imageContainer = document.createElement("div");
        imageContainer.innerHTML = imagenUrl
            ? `<img src="${imagenUrl}" class="mascota-image" alt="Imagen de ${mascota.nombre}">`
            : "";

        imageColumn.appendChild(imageContainer);
        imageColumn.appendChild(nameElement);

        const dataColumn = document.createElement("div");
        dataColumn.className = "mascota-data-column aligned-data-column";

        dataColumn.innerHTML = `
            <div class="form-group">
                <label for="especie-${mascota.id}" class="aligned-label">Especie:</label>
                <input type="text" id="especie-${mascota.id}" class="form-control aligned-input" value="${mascota.especie ? mascota.especie.nombre : ""}" readonly>
            </div>
            <div class="form-group">
                <label for="edad-${mascota.id}" class="aligned-label">Edad:</label>
                <input type="text" id="edad-${mascota.id}" class="form-control aligned-input" value="${mascota.edad} años" readonly>
            </div>
            <div class="form-group">
                <label for="raza-${mascota.id}" class="aligned-label">Raza:</label>
                <input type="text" id="raza-${mascota.id}" class="form-control aligned-input" value="${mascota.raza ? mascota.raza.raza : ""}" readonly>
            </div>
            <div class="form-group">
                <label for="tamano-${mascota.id}" class="aligned-label">Tamaño:</label>
                <input type="text" id="tamano-${mascota.id}" class="form-control aligned-input" value="${mascota.tamano ? mascota.tamano.tamano : ""}" readonly>
            </div>
        `;

        // Agregar los colores
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
                circle.title = colorObj.color; // Mostrar nombre al pasar el mouse
                colorsCircles.appendChild(circle);
            }
        });

        colorsContainer.appendChild(colorsCircles);
        dataColumn.appendChild(colorsContainer);

        // Descripción
        const descriptionContainer = document.createElement("div");
        descriptionContainer.className = "form-group";

        const descriptionLabel = document.createElement("label");
        descriptionLabel.setAttribute("for", `descripcion-${mascota.id}`);
        descriptionLabel.className = "aligned-label";
        descriptionLabel.textContent = "Descripción:";
        descriptionContainer.appendChild(descriptionLabel);

        const descriptionTextarea = document.createElement("textarea");
        descriptionTextarea.id = `descripcion-${mascota.id}`;
        descriptionTextarea.className = "form-control aligned-input aligned-textarea";
        descriptionTextarea.rows = 3; // Mantiene el tamaño fijo de 3 líneas
        descriptionTextarea.readOnly = true;
        descriptionTextarea.textContent = mascota.descripcion;
        descriptionContainer.appendChild(descriptionTextarea);
        
        dataColumn.appendChild(descriptionContainer);

        // Estado de la mascota
        const estadoSelectHTML = `
            <div class="form-group">
                <label for="estado-${mascota.id}" class="aligned-label">Estado:</label>
                <select id="estado-${mascota.id}" class="form-control aligned-select">
                    <option value="0" ${mascota.estado === 0 ? 'selected' : ''}>No Perdido</option>
                    <option value="1" ${mascota.estado === 1 ? 'selected' : ''}>Perdido</option>
                    <option value="2" ${mascota.estado === 2 ? 'selected' : ''}>Fallecido</option>
                </select>
            </div>
        `;

        dataColumn.innerHTML += estadoSelectHTML;

        const btnActualizar = document.createElement("button");
        btnActualizar.className = "btn btn-success btn-sm ml-2";
        btnActualizar.innerHTML = `<i class="fas fa-save"></i>`;

        btnActualizar.addEventListener("click", () => {
            const estadoSeleccionado = document.getElementById(`estado-${mascota.id}`).value;
            actualizarMascota(mascota.id, estadoSeleccionado);
        });

        dataColumn.querySelector('.form-group:last-child').appendChild(btnActualizar);

        card.appendChild(imageColumn);
        card.appendChild(dataColumn);

        cardCell.appendChild(card);

        row.appendChild(cardCell);

        table.appendChild(row);
    }

    container.appendChild(table);
}


async function actualizarMascota(id, estado) {

    const { data, error } = await supabases.from("mascota")
        .update({ estado })
        .eq("id", id);

    if (error) {
        console.error("Error al actualizar la mascota:", error);
        alert("Hubo un problema al actualizar el estado de la mascota.");
        return;
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
        descripcion
    `).eq("estado", 1);


    if (error) {
        console.error("Error al cargar las mascotas perdidas:", error);
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
        cardCell.className = "mascota-p-image-cell";

        const card = document.createElement("div");
        card.className = "mascota-card fondo-card-perdida";

        const imageColumn = document.createElement("div");
        imageColumn.className = "mascota-p-image-column";

        const imageContainer = document.createElement("div");
        if (imagenUrl) {
            imageContainer.innerHTML = `<img src="${imagenUrl}" class="mascota-p-image" alt="Imagen de ${mascota.nombre}">`;
        } else {
            imageContainer.innerHTML = `<img src="../images/logo_gris.png" class="mascota-p-image" alt="Logo Gris" style="opacity: 0.5;">`;
        }


        imageColumn.appendChild(imageContainer);


        const dataColumn = document.createElement("div");
        dataColumn.className = "mascota-data-column";

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
                        </div>
                   <div class="form-group">
                <label for="sexo-${mascota.id}">Sexo:</label>
                <input type="text" id="sexo-${mascota.id}" class="form-control" value="${mascota.sexo ? mascota.sexo.sexo : ""}" readonly>
            </div>
            <div class="form-group">
                <label for="tamano-${mascota.id}">Tamaño:</label>
                <input type="text" id="tamano-${mascota.id}" class="form-control" value="${mascota.tamano ? mascota.tamano.tamano : ""}" readonly>
        `;

        const colorsColumn = document.createElement("div");
        colorsColumn.className = "mascota-colors-column";

        const button = document.createElement("button");
        button.className = "btn info-button";        
        button.textContent = "Más Info";
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

                // Mostrar el nombre del color al pasar el mouse
                circle.title = colorObj.color;

                circlesContainer.appendChild(circle);
            }
        });

        colorsColumn.appendChild(circlesContainer);

        // Ensamblar columnas en la tarjeta
        card.appendChild(imageColumn);
        card.appendChild(dataColumn);
        card.appendChild(colorsColumn);

        cardCell.appendChild(card);
        row.appendChild(cardCell);
        cardCell.appendChild(card);
        row.appendChild(cardCell);

        table.appendChild(row);
    }

    container.appendChild(table);
}
// BUSQUEDA DE COINCIDENCIAS

async function buscarMascotasPerdidas(mascota) {

    const { data: mascotasPerdidas, error } = await supabases.from("mascota")
        .select("*")
        .eq("estado", 1);

    if (error) {
        console.error("Error al buscar mascotas encontradas:", error);
        return [];
    }


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

    const { data: mascotasEncontradas, error } = await supabases.from("mascota_encontrada")
        .select("*")
        .eq("estado", 0);

    if (error) {
        console.error("Error al buscar mascotas encontradas:", error);
        return [];
    }

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

async function obtenerUrlImagen(nombreImagen) {
    if (!nombreImagen) {
        return null;
    }

    const publicUrl = `https://duwjaewngocuzsfpgpiz.supabase.co/storage/v1/object/public/imagenes_mascotas/${nombreImagen}`;
    return publicUrl;
}
