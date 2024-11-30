function createNavbar() {
    const navbarHTML = `
<div class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-light custom_nav-container">
        <a class="navbar-brand d-flex align-items-center" href="../templates/index.html">
            <img src="../images/logo_verde.png" alt="Logo" class="logo-img me-2">
            <span class="brand-name">BuscaMascotas</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0 justify-content-center">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="../templates/index.html">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../templates/mascota_perdidas.html">Mascotas perdidas</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../templates/mascota_encontrada.html">Mascotas encontradas</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../templates/mis_mascotas.html" id="miPerfil" style="display:none;">Mis mascotas</a>
                </li>
            </ul>
            <button class="btn btn-outline-success" id="signInButton">Ingresar</button>
        </div>
    </nav>
</div>

<!-- Offcanvas Menu -->
<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">Menú</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="../templates/index.html">Inicio</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../templates/mascota_perdidas.html">Mascotas perdidas</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../templates/mascota_encontrada.html">Mascotas encontradas</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../templates/mis_mascotas.html" id="miPerfil" style="display:none;">Mis mascotas</a>
            </li>
        </ul>
        <button class="btn btn-outline-success" id="signInButtonOffcanvas">Ingresar</button>
    </div>
</div>





<!-- Bootstrap JS y dependencias -->
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"></script>

`;


    document.getElementById('navbar-container').innerHTML = navbarHTML;

    if (!document.getElementById('loginModal')) {
        document.body.insertAdjacentHTML('beforeend', loginHTML);
    }

    // Manejar el clic en el botón "Ingresar"
    document.getElementById('signInButton').addEventListener('click', () => {
        // Contraer el menú si está abierto (para el menú normal)
        const navbarCollapse = document.getElementById('navbarSupportedContent');
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse); // Obtener la instancia de Bootstrap Collapse
        if (bsCollapse) {
            bsCollapse.hide(); // Contraer el menú
        }
    
        // Esperar a que el menú termine de contraerse antes de abrir el modal
        setTimeout(openLoginModal, 300);
    });
    
    document.getElementById('signInButtonOffcanvas').addEventListener('click', () => {
        // Contraer el menú offcanvas si está abierto
        const offcanvasElement = document.getElementById('offcanvasExample');
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement); // Obtener la instancia de Bootstrap Offcanvas
        if (offcanvasInstance) {
            offcanvasInstance.hide(); // Contraer el offcanvas
        }
    
        // Esperar a que el offcanvas termine de cerrarse antes de abrir el modal
        setTimeout(openLoginModal, 300);
    });
    


}

const loginHTML = `
<!-- Modal de Login -->
<div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="loginModalLabel">Iniciar Sesión</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="loginFormModal">
          <div class="mb-3">
            <input required type="email" class="form-control" id="loginEmailModal" placeholder="E-mail">
          </div>
          <div class="mb-3">
            <input required type="password" class="form-control" id="loginPasswordModal" placeholder="Password">
          </div>
          <button type="button" class="btn btn-primary w-100" onclick="iniciarSesion()">Ingresar</button>
        </form>
        <div class="mt-3 text-center">
          <span>¿No tienes cuenta? <a href="#" data-bs-target="#registerModal" data-bs-toggle="modal" data-bs-dismiss="modal">Regístrate aquí</a></span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Modal de Registro -->
<div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="registerModalLabel">Registrarse</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="signupFormModal">
          <div class="row g-2">
            <div class="col-md-6">
              <input required type="text" class="form-control" id="signupNombre" placeholder="Nombre">
            </div>
            <div class="col-md-6">
              <input required type="date" class="form-control" id="signupFechaNacimiento">
            </div>
          </div>
          <div class="row g-2 mt-2">
            <div class="col-md-6">
              <input required type="text" class="form-control" id="signupDireccion" placeholder="Dirección">
            </div>
            <div class="col-md-6">
              <input required type="email" class="form-control" id="signupEmailModal" placeholder="E-mail">
            </div>
          </div>
          <div class="row g-2 mt-2">
            <div class="col-md-6">
              <input required type="tel" class="form-control" id="signupTelefono1" placeholder="Teléfono 1">
            </div>
            <div class="col-md-6">
              <input type="tel" class="form-control" id="signupTelefono2" placeholder="Teléfono 2">
            </div>
          </div>
          <div class="row g-2 mt-2">
            <div class="col-md-6">
              <input required type="password" class="form-control" id="signupPasswordModal" placeholder="Contraseña">
            </div>
            <div class="col-md-6">
              <input required type="password" class="form-control" id="signupPassword2" placeholder="Repite tu Contraseña">
            </div>
          </div>
          <button type="button" class="btn btn-success w-100 mt-3" onclick="registrarUsuario()">Registrarse</button>
        </form>
        <div class="mt-3 text-center">
          <span>¿Ya tienes cuenta? <a href="#" data-bs-target="#loginModal" data-bs-toggle="modal" data-bs-dismiss="modal">Inicia sesión aquí</a></span>
        </div>
      </div>
    </div>
  </div>
</div>
`;



function showSignUp() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

function showSignIn() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

function openLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'flex'; // Muestra el modal
    document.body.classList.add('modal-open'); // Bloquea la interacción debajo
    setTimeout(() => modal.classList.add('show'), 10); // Añade la animación
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.classList.remove('show'); // Inicia la animación de salida
    setTimeout(() => {
        modal.style.display = 'none'; // Oculta completamente después de la animación
        document.body.classList.remove('modal-open'); // Permite interacción debajo
    }, 300); // Tiempo para que termine la animación
}

function actualizarNavbarConUsuario(usuario) {
    const signInButton = document.getElementById("signInButton");
    if (signInButton) {
        signInButton.remove(); // Elimina el botón "Sign In" si existe
    }

    const navbarContainer = document.getElementById("navbarSupportedContent");
    if (!navbarContainer) {
        console.error("No se encontró el contenedor del navbar.");
        return;
    }

    // Verificar si ya existe un botón "Sign Out" para evitar duplicados
    let signOutButton = document.getElementById("signOutButton");
    if (!signOutButton) {
        // Crear el botón "Sign Out"
        signOutButton = document.createElement("button");
        signOutButton.className = "btn btn-outline-danger"; // Clase de estilo
        signOutButton.id = "signOutButton";
        signOutButton.textContent = `Salir`; // Mostrar el nombre del usuario
        signOutButton.addEventListener("click", cerrarSesion); // Evento para cerrar sesión

        navbarContainer.appendChild(signOutButton);
    }
}


function verificarSesion() {
    const usuario = JSON.parse(sessionStorage.getItem("usuario")); // Busca el usuario en sessionStorage
    if (usuario) {
        console.log("Usuario logueado:", usuario);
        actualizarNavbarConUsuario(usuario); // Actualiza el navbar si el usuario está logueado
    } else {
       //console.log("No hay usuario logueado.");
        // Si no hay usuario, asegúrate de que solo el botón "Sign In" está presente
        const signOutButton = document.getElementById("signOutButton");
        if (signOutButton) {
            signOutButton.remove(); // Elimina el botón Sign Out si no hay usuario
        }
        const signInButton = document.getElementById("signInButton");
        if (!signInButton) {
            const navbarContainer = document.getElementById("navbarSupportedContent");
            const newSignInButton = document.createElement("button");
            newSignInButton.className = "btn btn-outline-primary";
            newSignInButton.id = "signInButton";
            newSignInButton.textContent = "Sign In";
            newSignInButton.addEventListener("click", openLoginModal);
            navbarContainer.appendChild(newSignInButton);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {

    // 1. Crear el navbar primero
    createNavbar();
    const botonperfil = document.getElementById("miPerfil");
    // 2. Verificar si hay usuario en la sesión
    //verificarSesion();

    const usuario = JSON.parse(sessionStorage.getItem("usuario"));
    if (usuario) {
        //console.log("Usuario logueado:", usuario);
        actualizarNavbarConUsuario(usuario); // Muestra el botón Sign Out
        
        botonperfil.style.display = "inline-block";
    } else {
        botonperfil.style.display = "none";
        //console.log("No hay usuario logueado.");
        const signOutButton = document.getElementById("signOutButton");
        if (signOutButton) {
            signOutButton.remove(); // Elimina el botón Sign Out si no hay usuario
        }
    }
});
