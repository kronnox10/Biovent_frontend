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
                <div class="col-md-4">
                    <img src="/servicios/Mantenimiento_preventivo-correctivo1.png" 
                    class="img-fluid rounded-start w-100" 
                    alt="..."
                    width="750"
                    height="550"
                    >
                </div>
                <div class="col-md-8">
                    <div class="card-body" >
                        <h5 class="card-title py-2" >Mantenimientos preventivos y correctivos</h5>
                        <p class="card-text py-4">Garantizamos el funcionamiento óptimo de los equipos médicos, evitando fallas futuras y reparando problemas existentes de manera eficiente.</p>
                    </div>
                </div>
            </div>
        </div> 

        <div class="card mb-4 mt-5"  id="cronograma" style="max-width: 100vw;">
            <div class="row g-0 py-2 px-2">
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title py-2">Diseño de cronograma de mantenimiento</h5>
                        <p class="card-text py-4">Organizamos un plan personalizado para el cuidado regular de sus dispositivos, asegurando su disponibilidad y confiabilidad.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <img src="/servicios/cronograma_mantenimiento.png" 
                    class="img-fluid rounded-start w-100" 
                    alt="..."
                    width="750"
                    height="550"
                    >
                </div>
            </div>
        </div> 

        <div class="card mb-4 mt-5" id="capacitacion" style="max-width: 100vw;">
            <div class="row g-0 py-2 px-2">
            <div class="col-md-4">
                <img src="/servicios/capacitacion_personal.png" 
                class="img-fluid rounded-start w-100" 
                alt="..."
                width="750"
                height="550"
                >
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
                    <img src="/servicios/diseño_prototipomedico.png" 
                    class="img-fluid rounded-start w-100" 
                    alt="..."
                    width="750"
                    height="550"
                    >
                </div>
            </div>
        </div> 

        <div class="card mb-4 mt-5" id="ventas" style="max-width: 100vw;">
            <div class="row g-0 py-2 px-2">
            <div class="col-md-4">
                <img src="/servicios/venta_equipos.png" 
                class="img-fluid rounded-start w-100" 
                alt="..."
                width="750"
                height="550"
                >
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
                <div class="col-md-4">
                    <img src="/servicios/simulacion.png" 
                    class="img-fluid rounded-start w-100" 
                    alt="..."
                    width="750"
                    height="550"
                    >
                </div>
            </div>
        </div> 
    </div>
    <Footer></Footer>
</div>