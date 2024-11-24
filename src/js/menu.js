function createNavbar(valor = 0) {
    //agregar a las rutas la raiz buscamascota al subirlo
     ruta="templates"
     ruta_logo = "src/"
    if (valor == 1) {
        ruta = "../templates"
        ruta_logo = ""
    }
    //console.log("href="+ruta+"/mascota_perdidas.html")
    const navbarHTML = `
        <div class="container-fluid">
            <nav class="navbar navbar-expand-lg custom_nav-container">
                <a class="navbar-brand d-flex align-items-center" href="/buscamascotas/src/index.html">
                    <img src="../`+ruta_logo+`images/logo_verde.png" alt="Logo" class="logo-img">
                    <span class="brand-name ml-2">BuscaMascotas</span>
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <div class="d-flex mx-auto flex-column flex-lg-row align-items-center">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <a class="nav-link" href="/buscamascotas/src/index.html">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="`+ruta+`/mascota_perdidas.html">Mascotas perdidas</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="`+ruta+`/mascota_encontrada.html">Mascotas encontradas</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="`+ruta+`/mis_mascotas.html">Mi Perfil</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    `;

    document.getElementById('navbar-container').innerHTML = navbarHTML;
    
}
