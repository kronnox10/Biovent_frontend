<script>
    import { onMount } from "svelte";

    onMount(() => {
        const carousels = document.querySelectorAll('.carousel');
        carousels.forEach(carousel => {
            const instance = bootstrap.Carousel.getInstance(carousel); // Obtiene la instancia actual
            if (instance) {
                instance.dispose(); // Elimina la instancia previa
            }
            new bootstrap.Carousel(carousel); // Crea una nueva instancia
        });
    });
</script>

<div style="background-color: #ffffff; border-bottom: 1.5px solid #127bbe;" class="py-1">
    <nav class="navbar navbar-expand-lg navbar-light " style="margin-left: 10%;">
        <a target="" href="/">
            <img
                src="foto_logo__2_-removebg-preview.png"
                width="119"
                height="100"
                id=""
                alt=""
            />
        </a>
        <div class="container-fluid  mt-3">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse " id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0" style="margin-left:7%">
                    <li class="nav-item px-2">
                        <a class="nav-link active" aria-current="page" href="/">INICIO</a>
                    </li>
                    <li class="nav-item dropdown px-1">
                        <a class="nav-link active dropdown-toggle" href="/nosotros" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            NOSOTROS
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="/nosotros_extra#mision">Mision-Vision</a></li>
                            <li><a class="dropdown-item" href="/nosotros_extra#valores">Valores</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown px-1">
                        <a class="nav-link active dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            SERVICIOS
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="/servicios#preventivo">Mantenimiento preventivo y correctivo</a></li>
                            <li><a class="dropdown-item" href="/servicios#cronograma">Diseño de cronograma de mantenimiento</a></li>
                            <li><a class="dropdown-item" href="/servicios#capacitacion">Capacitación personal médico - asistencial</a></li>
                            <li><a class="dropdown-item" href="/servicios#tarjetas">Diseño de tarjetas electrónicas y prototipos de equipos médicos</a></li>
                            <li><a class="dropdown-item" href="/servicios#ventas">Venta y Alquiler de Dispositivos Médicos</a></li>
                            <li><a class="dropdown-item" href="/servicios#simulacion">Diseño de equipos de simulación médica</a></li>
                        </ul>
                    </li>
                    <li class="nav-item px-2">
                        <a class="nav-link active" aria-current="page" href="/contactenos">CONTACTENOS</a>
                    </li>
                    <li class="nav-item px-2">
                        <p class="nav-link active mb-3" aria-current="page" data-bs-toggle="modal" data-bs-target="#exampleModal">EQUIPO DE TRABAJO</p>
                    </li>
                </ul>

                <a href="https://oxfo-front.onrender.com/" class="icon_container">
                    <img src="/usuario.png" alt="..." width="45" height="45" style="margin-right: 1vw;">
                </a>
                <form class="d-flex  " style="padding-right: 11vw;">
                    <a href="/Login" class="btn btn-dark" alt="..." style="border-radius: 20%;">Sign in</a>
                </form>
            </div>
        </div>
    </nav>
</div>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" style="margin-left:-50%; width: 200%;">
            <div class="modal-header">
                <h5 class="modal-title" style="padding-left: 40%;" id="exampleModalLabel">NUESTRO EQUIPO</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body px-5" style="text-align: justify;">
                <p>
                    Nuestro equipo multidisciplinario está compuesto por profesionales altamente capacitados en diversas áreas clave para garantizar un servicio integral y de calidad. Contamos con:
                    <li>Ingenieros Mecatrónicos, Electrónicos y Biomédicos.</li>
                    <li>Ingenieros en Sistemas y Técnicos Especializados.</li>
                    <li>Enfermeras y Especialistas Clínicos.</li>
                    <br>
                    Este equipo combina experiencia técnica, conocimiento clínico y habilidades tecnológicas para ofrecer soluciones innovadoras y un servicio de excelencia que responde a las necesidades de nuestros clientes.
                </p>
            </div>
        </div>
    </div>
</div>

<style>
    .nav-link:hover {
        color: #d33764 !important;
    }

    .nav-item.dropdown:hover .dropdown-menu {
        display: block;
        margin-top: 0;
    }

    .icon_container:hover img {
        content: url('/usuario_hover.png');
    }

    .dropdown-menu a:hover {
        background-color: #127bbe;
        color: #ffffff;
    }

    /* Mobile-specific styles */
    @media (max-width: 768px) {
        .nav-link.active {
            margin-bottom: 1rem; /* Adds spacing below Equipo de Trabajo */
        }

        .icon_container img {
            margin-top: 1rem; /* Adjusts the login icon for better spacing */
        }

        .btn {
            margin-top: 1rem;
        }
    }
</style>
