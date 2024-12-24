<script>
    import { onMount } from "svelte";
    
    onMount(() => {

    });

</script>


<div style="background-color: #ffffff; border-bottom: 1.5px solid #127bbe;" class="py-1">
<nav class="navbar navbar-expand-lg navbar-light " style="margin-left: 10%;">
    <a target="" href="/"
    ><img
        src="foto_logo__2_-removebg-preview.png"
        width="125"
        height="80"
        id=""
        alt=""
    />
</a>
    <div class="container-fluid" >
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
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
                    <li><a class="dropdown-item" href="/nosotros_extra#valores" >Valores</a></li>
                </ul>
            </li>

            <li class="nav-item dropdown px-1">
                <a class="nav-link active dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    SERVICIOS
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="/servicios#preventivo"> Mantenimiento preventivo y correctivo</a></li>
                    <li><a class="dropdown-item" href="/servicios#cronograma">Diseño de cronograma de mantenimiento</a></li>
                    <li><a class="dropdown-item" href="/servicios#capacitacion">Capacitacion personal medico - asistencial</a></li>
                    <li><a class="dropdown-item" href="/servicios#tarjetas">Diseño de tarjetas electronicas y prototipos de equipos medicos</a></li>
                    <li><a class="dropdown-item" href="/servicios#ventas">Venta y Alquiler de Dispositivos Médicos</a></li>
                    <li><a class="dropdown-item" href="/servicios#simulacion">Diseño de equipos de simulacion medica</a></li>
                </ul>
            </li>
            <li class="nav-item px-2">
                <a class="nav-link active" aria-current="page" href="/contactenos">CONTACTENOS</a>
            </li>
            <li class="nav-item px-2">
                <p class="nav-link active" aria-current="page" data-bs-toggle="modal" data-bs-target="#exampleModal">EQUIPO DE TRABAJO</p>
            </li>
        </ul>
        <a href="/Login" class="icon_container"><img src="/usuario.png"   alt="..." width="45" height="45" style="margin-right: 1vw;"></a>
        <form class="d-flex" style="padding-right: 11vw;">
            <a  href="/Login" class="btn btn-dark" alt="..." style="border-radius: 20%;">Sign in</a>
          <!--<input class="form-control  href="/Login"me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>-->
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
                        <li>
                            Ingenieros Mecatrónicos, Electrónicos y Biomédicos: Especialistas en el diseño, desarrollo y optimización de  y equipos médicos, así como en el diagnóstico y resolución de problemas técnicos.
                        </li>
                        <li>
                            Ingenieros en Sistemas y Técnicos Especializados: Encargados de implementar y mantener soluciones tecnológicas y sistemas informáticos que aseguren la conectividad y funcionalidad de los equipos.
                        </li>
                        <li>
                            Enfermeras y Especialistas Clínicos: Profesionales con experiencia en el uso práctico de  y equipos médicos, quienes aportan conocimientos sobre las necesidades reales del entorno clínico.
                        </li>
                        <br>
                        Este equipo combina experiencia técnica, conocimiento clínico y habilidades tecnológicas para ofrecer soluciones innovadoras y un servicio de excelencia que responde a las necesidades de nuestros clientes."</p>
                </div>
            </div>
        </div>
    </div>


<style>
    .nav-link:hover {
        color: #d33764 !important; /* Cambia el color del texto (ejemplo: blanco) */
    }
    
    .nav-item.dropdown:hover .dropdown-menu {
        display: block;
        margin-top: 0; 
    }

    .icon_container:hover img{
        content: url('usuario_hover.png');
    }
</style>
