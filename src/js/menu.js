function createNavbar() {
    const navbarHTML = `
        <div class="container-fluid">
            <nav class="navbar navbar-expand-lg custom_nav-container">
                <a class="navbar-brand d-flex align-items-center" href="index.html">
                    <img src="../images/logo.png" alt="Logo" class="logo-img">
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
                                <a class="nav-link" href="/index.html">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/templates/mascota_perdidas.html">Buscan sus mascotas</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/templates/mascota_encontrada.html">Buscan sus Dueños</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/templates/mis_mascotas.html">Mis mascotas</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    `;

    document.getElementById('navbar-container').innerHTML = navbarHTML;
}
