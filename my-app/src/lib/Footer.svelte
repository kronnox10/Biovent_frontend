<script>
    import { onMount } from "svelte";

    onMount(() => {

    });
</script>

<div class="">
    <div style="background-color: #ffffff; border-top: 2px solid #127bbe">
        <div class="container">
            <div class="row pt-2" style="color: black;">
                <div
                    class="col-12 col-lg-3 col-md-3 col-sm-3 col-xl-3 text-decoration-none text-center"
                >
                    <div
                        class=" fs-2 pt-3"
                        style="margin-top: 10%;"
                    >
                        <img
                            src="foto_logo__2_-removebg-preview.png"
                            id="facebook"
                            width="173"
                            height="123"
                            alt="Facebook icon"
                        />
                    </div>
                </div>

                <div
                    class="col-12 col-lg-5 col-md-5 col-sm-5 py-4 col-xl-5 text-dark"
                    style="border-left: 1px solid black; border-top: 0px; border-right: 0px; border-bottom: 0px;"
                >
                    <div style="margin-left: 20%; color: black;">
                        <h5>
                            <strong><b>Contactenos</b></strong>
                        </h5>
                        <div>
                            <i class="fab fa-whatsapp" style="color: green;"></i> WhatsApp: 300 302 2783
                        </div>
                        <div>
                            <i class="fas fa-envelope" style="color: black;"></i> Correo Electrónico: bioventingenieriabiomedica@gmail.com
                        </div>

                        <div class="py-4">
                            <p>
                                <strong>BIOVENT®</strong> Todos los derechos reservados
                                2024
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    class="col-12 col-lg-3 col-md-3 col-sm-3 col-xl-3 py-3 text-black"
                >
                    <h5>
                        <b>Ubicaciones</b>
                    </h5>
                    <p>
                        <i class="fas fa-map-marker-alt" style="color: blue;"></i> Barranquilla - Colombia
                    </p>
                </div>
                <i class="nav-link active" aria-current="page" data-bs-toggle="modal" data-bs-target="#exampleModal1">Agradecimientos</i>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" style="margin-left:-50%; width: 200%;">
            <div class="modal-header">
                <h5 class="modal-title" style="padding-left: 40%;" id="exampleModalLabel">Agradecimientos</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body px-5" style="text-align: justify;">
                <p>
                    Muchas gracias a flaticon por prestar sus iconos y estos creadores de abajo, sin ustedes esta tarea sería más engorrosa de lo que ya es.
                    <a href="https://www.flaticon.es/iconos-gratis/compromiso" title="compromiso iconos">Compromiso iconos creados por SBTS2018 - Flaticon</a>
                    <a href="https://www.flaticon.es/iconos-gratis/conclusion" title="conclusión iconos">Conclusión iconos creados por piksart - Flaticon</a>
                    <a href="https://www.flaticon.es/iconos-gratis/alta-calidad" title="alta calidad iconos">Alta calidad iconos creados por Uniconlabs - Flaticon</a>
                    <a href="https://www.flaticon.es/iconos-gratis/el-respeto" title="el respeto iconos">El respeto iconos creados por Freepik - Flaticon</a>
                    <a href="https://www.flaticon.es/iconos-gratis/nombre-de-usuario" title="nombre de usuario iconos">Nombre de usuario iconos creados por tuktukdesign - Flaticon</a>
                    <a href="https://www.flaticon.es/iconos-gratis/innovacion" title="innovación iconos">Innovación iconos creados por zero_wing - Flaticon</a>
                </p>
            </div>
        </div>
    </div>
</div>

<style>
    /* Estilos para pantallas móviles */
    @media (max-width: 768px) {
        .row {
            flex-direction: column !important; /* Hace que las columnas se apilen verticalmente */
        }

        .col-12 {
            text-align: center;
        }

        .container {
            padding-left: 10px;
            padding-right: 10px;
        }

        .fs-2 {
            margin-top: 5%; /* Reduce el espacio superior */
            text-align: center;
        }

        .col-lg-5 {
            margin-left: 0 !important; /* Asegura que el contacto se vea bien */
        }

        .col-12 .text-center {
            padding-bottom: 10px; /* Agrega un poco de espacio entre las imágenes y el texto */
        }

        .py-4 {
            padding-top: 10px;
            padding-bottom: 10px;
        }

        .modal-content {
            margin-left: 0 !important;
            width: 100% !important; /* Asegura que el modal ocupe todo el ancho */
        }

        .py-3 {
            padding: 10px !important;
        }

        i {
            font-size: 18px; /* Ajusta los íconos para pantallas pequeñas */
        }

        h5 {
            font-size: 20px; /* Hace que los títulos sean más pequeños en pantallas pequeñas */
        }
    }
</style>
