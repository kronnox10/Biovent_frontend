<script>
    import NavbarIndex from "../../lib/navbar_index.svelte";
    import SocialMedia from "../../lib/social_media.svelte";
    import Footer from "../../lib/Footer.svelte";


</script>

<NavbarIndex></NavbarIndex>
<SocialMedia></SocialMedia>

<div class="pt-5"style="background-image: url('/fondo-6.jpg'); background-color: #c9cdd9;">
    <div class="container" style="">
        <div class="card mb-4" id="preventivo" style="max-width: 100vw; ">
            <div class="row g-0 py-2 px-2" style="border-radius: 15%;">
                <div id="carouselExampleSlidesOnly" class="carousel slide carousel-fade col-md-4" data-bs-ride="carousel" data-bs-interval="3000">
                    <div class="carousel-inner ">
                        <div class="carousel-item active">
                            <img src="/servicios/Mantenimiento_preventivo-correctivo1.png"  width="360" height="250" alt="...">
                        </div>
                        <div class="carousel-item">
                            <img src="/servicios/Mantenimiento_preventivo-correctivo2.jpg"  width="360" height="250" alt="...">
                        </div>
                        <div class="carousel-item">
                            <img src="/servicios/Mantenimiento_preventivo-correctivo3.jpg"  width="360" height="250" alt="...">
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card-body" >
                        <h5 class="card-title py-2" >Mantenimientos preventivos y correctivos</h5>
                        <p class="card-text py-4">Nos comprometemos a garantizar el funcionamiento optimo de sus equipos médicos, prolongando su vida util y asegurando su fiabilidad y precision. Nuestros servicios de mantenimiento y reparacion estan diseñados para evitar futuras fallas y reparar problemas existentes de manera inmediata y eficiente, 
                            minimizando el tiempo de inactividad y garantizando la continuidad de la atencion medica de alta calidad.
                        </p>
                    </div>
                </div>
            </div>
        </div> 

        <div class="card mb-4 mt-5"  id="cronograma" style="max-width: ;">
            <div class="row g-0 py-2 px-2">
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title py-2">Diseño de cronograma de mantenimiento</h5>
                        <p class="card-text py-4">Organizamos un plan personalizado para el cuidado continuo de dispositivos médicos asegurando su disponibilidad y confiabilidad y proporcionara nuestros clientes un servicio de alta calidad adaptable a sus necesidades.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <!-- svelte-ignore a11y_media_has_caption -->
                    <img src="/servicios/cronograma_mantenimiento.png" width="360" height="200" alt="...">
                </div>
            </div>
        </div> 

        <div class="card mb-4 mt-5" id="capacitacion" style="max-width: 100vw;">
            <div class="row g-0 py-2 px-2">
                <div id="carouselExampleSlidesOnly" class="carousel slide carousel-fade col-md-4" data-bs-ride="carousel" data-bs-interval="3000">
                    <div class="carousel-inner ">
                        <div class="carousel-item active">
                            <img src="/servicios/capacitacion_personal_1.jpg"  width="360" height="250" alt="...">
                        </div>
                        <div class="carousel-item">
                            <img src="/servicios/capacitacion_personal_2.jpg"  width="360" height="250" alt="...">
                        </div>
                        <div class="carousel-item">
                            <img src="/servicios/capacitacion_personal_3.jpg"  width="360" height="250" alt="...">
                        </div>
                    </div>
                </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title py-2" >Capacitacion personal medico - asistencial</h5>
                <p class="card-text py-4">Ofrecemos formación especializada para que el personal utilice los equipos médicos de manera segura y eficiente.</p>
                </div>
            </div>
            </div>
        </div> 

        <div class="card mb-4 mt-5" id="tarjetas" style="max-width: 100vw;">
            <div class="row g-0 py-2 px-2">
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title py-2" >Diseño de tarjetas electronicas y prototipos de equipos medicos</h5>
                        <p class="card-text py-4">Desarrollamos soluciones innovadoras en tecnología médica adaptadas a las necesidades específicas de los clientes.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
                        <div>
                            <div>
                                <!-- svelte-ignore a11y_media_has_caption -->
                                <video src="/servicios/diseño_prototipomedico.mp4" class="w-100" title="dp" autoplay loop></video>
                            </div>
                            <!--<div class="carousel-item">
                                <img src="/servicios/diseño_prototipomedico_2.jpg" width="360" height="250" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="/servicios/diseño_prototipomedico_3.jpg" width="360" height="250" alt="...">
                            </div>-->
                        </div>
                    </div>
                </div>
            </div>
        </div> 

        <div class="card mb-4 mt-5" id="ventas" style="max-width: 100vw;">
            <div class="row g-0 py-2 px-2">
                <div id="carouselExampleSlidesOnly" class="carousel slide carousel-fade col-md-4" data-bs-ride="carousel" data-bs-interval="3000">
                    <div class="carousel-inner ">
                        <div class="carousel-item active">
                            <img src="/servicios/venta_equipos.png" width="360" height="250" alt="...">
                        </div>
                        <div class="carousel-item">
                            <img src="/servicios/venta_equipos_2.jpg" width="360" height="250" alt="...">
                        </div>
                        <div class="carousel-item">
                            <img src="/servicios/venta_equipos_1.jpg" width="360" height="250" alt="...">
                        </div>
                    </div>
                </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title py-2" >Venta y Alquiler de Dispositivos Médicos:</h5>
                <p class="card-text py-4">Proveemos acceso a tecnología de vanguardia mediante opciones flexibles de compra o alquiler.</p>
                </div>
            </div>
            </div>
        </div> 

        <div class="card mb-4 mt-5" id="simulacion" style="max-width: 100vw;">
            <div class="row g-0 py-2 px-2">
                <div class="col-md-8">
                    <div class="card-body" >
                        <h5 class="card-title py-2" >Diseño de equipos de simulacion medica</h5>
                        <p class="card-text py-4">Creamos herramientas para entrenamientos clínicos, ayudando a perfeccionar habilidades en un entorno seguro y controlado.</p>
                    </div>
                </div>
                <div id="carouselExampleSlidesOnly" class="carousel slide carousel-fade col-md-4" data-bs-ride="carousel" data-bs-interval="3000">
                    <div class="carousel-inner ">
                        <div class="carousel-item active">
                            <img src="/servicios/diseño_prototipomedico_3.jpg" width="360" height="250" alt="...">
                        </div>
                        <div class="carousel-item">
                            <img src="/servicios/diseño_prototipomedico_2.jpg" width="360" height="250" alt="...">
                        </div>
                        <div class="carousel-item">
                            <img src="/servicios/diseño_prototipomedico.png" width="360" height="250" alt="...">
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
    <Footer></Footer>
</div>