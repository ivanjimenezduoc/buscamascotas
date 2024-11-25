function createNavbar() {

    //console.log("href="+ruta+"/mascota_perdidas.html")
    const navbarHTML = `
    <div class="container-fluid">
        <nav class="navbar navbar-expand-lg custom_nav-container">
            <a class="navbar-brand d-flex align-items-center" href="../templates/index.html">
                <img src="../images/logo_verde.png" alt="Logo" class="logo-img">
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
                            <a class="nav-link" href="../templates/index.html">Inicio</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="../templates/mascota_perdidas.html">Mascotas perdidas</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="../templates/mascota_encontrada.html">Mascotas encontradas</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link"   href="../templates/mis_mascotas.html" id="miPerfil" >Mis mascotas</a>
                        </li>
                        
                    </ul>
                </div>
                <button class="btn btn-outline-success" id="signInButton">Ingresar</button>
            </div>
        </nav>
    </div>
`;

//style="display: none;"

    document.getElementById('navbar-container').innerHTML = navbarHTML;

    if (!document.getElementById('loginModal')) {
        document.body.insertAdjacentHTML('beforeend', loginHTML);
        }
    
        // Evento para abrir el modal de login
        document.getElementById('signInButton').addEventListener('click', openLoginModal);
    
    }
   
 const loginHTML =  `
<div id="loginModal" class="modal">
    <div class="modal-content">
        <span class="close" onclick="closeLoginModal()">&times;</span>
        <div class="login-container" id="loginForm">
            <div class="login-heading">Iniciar Sesion</div>
            <form id="loginFormModal" class="login-form">
                <input required class="login-input" type="email" name="email" id="loginEmailModal" placeholder="E-mail" />
                <input required class="login-input" type="password" name="password" id="loginPasswordModal" placeholder="Password" />
                <!--<span class="forgot-password"><a href="#">Forgot Password?</a></span>-->
                <button class="login-button" type="button" onclick="iniciarSesion(event)">Ingresar</button>
            </form>

            <span class="agreement">¿No tienes cuenta?</span>
            <span class="agreement"> <a href="#" onclick="showSignUp()">Regístrate aquí</a></span>
        </div>

        <div class="registrarModal" id="signupForm" style="display: none;">
        <div class="login-heading">Registrarse</div>
        <form action="" id="signupFormModal" class="login-form"">
        
        <div class="row">
        <div class="col-md-6">
                   <input required class="login-input" type="text" id="signupNombre" placeholder="Nombre">
                   </div>
                   <div class="col-md-6">
            <input required class="login-input" type="date" id="signupFechaNacimiento" placeholder="Fecha de Nacimiento">
        </div>
        </div>

        <div class="row">
        <div class="col-md-6">
                  <input required class="login-input" type="text" id="signupDireccion" placeholder="Dirección">
                   </div>
                   <div class="col-md-6">
            <input required class="login-input" type="email" id="signupEmailModal" placeholder="E-mail">
        </div>
        </div>

       <div class="row">
        <div class="col-md-6">
                <input required class="login-input" type="tel" id="signupTelefono" placeholder="Teléfono 1">
                   </div>
                   <div class="col-md-6">
             <input required class="login-input" type="tel" id="signupTelefono" placeholder="Teléfono 2">
        </div>
        </div>

        <div class="row">
        <div class="col-md-6">
              <input required class="login-input" type="password" id="signupPasswordModal" placeholder="Contraseña">
                   </div>
                   <div class="col-md-6">
              <input required class="login-input" type="password" id="signupPassword2" placeholder="Repite tu Contraseña">
        </div>
        </div>
          
            <input class="login-button" type="button" value="Registrarse" onclick="registrarUsuario()">
        </form>
        <span class="agreement">¿Ya tienes cuenta? <a href="#" onclick="showSignIn()">Inicia sesión aquí</a></span>
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
