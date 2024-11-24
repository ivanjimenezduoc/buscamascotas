window.onload = function() {
    const params = new URLSearchParams(window.location.search);

    const mascota = {
        id: params.get('id'),
        nombre: params.get('nombre'),
        especie: params.get('especie'),
        edad: params.get('edad'),
        raza: params.get('raza'),
        tamano: params.get('tamano'),
        descripcion: params.get('descripcion'),
        foto_perfil: params.get('foto_perfil'),
        direccion_perdida: params.get('direccion_perdida'),
    };

    const dueno = {
        nombre: params.get('dueno_nombre'),
        telefono1: params.get('dueno_telefono1'),
        telefono2: params.get('dueno_telefono2'),
    };

    console.log("Datos de la mascota:", mascota);
    console.log("Datos del dueño:", dueno);

};
