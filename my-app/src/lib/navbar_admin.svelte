
<script>

function confirmacion() {
          Swal.fire({
        title: "¿Estas seguro?",
        text: "Se perdera lo que no hayas guardado",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, cerrar!"
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          window.location.href = "/";
        }
      });
      
    }

</script>


<button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Menu</button>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">Menu :3</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div class="dropdown mt-3">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
          Clientes
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li><a class="dropdown-item" href="#">Clientes</a></li>
          <li><a class="dropdown-item" href="#">cronograma</a></li>
          <li><a class="dropdown-item" href="#">Ordenes Activas</a></li>
          <li><a class="dropdown-item" href="#">Historial de ordenes</a></li>
        </ul>
      </div>
    </div>
    <form class="d-flex nav-item ms-auto">
      <button class="btn btn-outline-dark nav-item" on:click="{confirmacion}" href="#" aria-label="Cerrar edición de usuario">Cerrar sesión</button>
    </form>
</div>


<!--<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid" style="margin-left: 22vw;">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle mx-5" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Clientes
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" href="#">Clientes</a></li>
              <li><a class="dropdown-item" href="#">cronograma</a></li>
              <li><a class="dropdown-item" href="#">Ordenes Activas</a></li>
              <li><a class="dropdown-item" href="#">Historial de ordenes</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle mx-5" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Tecnicos
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" href="/administrador/mantenimiento/Buscar_mantenimiento">Buscar Mantenimiento</a></li>
              <li><a class="dropdown-item" href="/administrador/mantenimiento/create_mantenimiento">Digitar mantenimiento</a></li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle mx-5" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              OS
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" href="/administrador/maquina/Buscar_maquina">Buscar equipos</a></li>
              <li><a class="dropdown-item" href="/administrador/maquina/create_maquina">Ingresar equipos</a></li>
            </ul>
          </li>

        </ul>
        <form class="d-flex nav-item ms-auto">
          <button class="btn btn-outline-dark nav-item" on:click="{confirmacion}" href="#" aria-label="Cerrar edición de usuario">Cerrar sesión</button>
        </form>
      </div>
    </div>
  </nav>-->
  