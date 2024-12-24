<script>
    import NavbarIndex from "../../lib/navbar_index.svelte";
    import SocialMedia from "../../lib/social_media.svelte";
    import Footer from "../../lib/Footer.svelte";
    import { onMount } from "svelte";

    onMount(() => {
        const a = "";
        const b = "";
        const c = "";
        const d = "";
    });

    function Cambiar(n) {
        const a = document.getElementById("mision-text");
        const b = document.getElementById("vision-text");
        const c = document.getElementById("mision-img");
        const d = document.getElementById("vision-img");

        if (n == 1) {
            a.removeAttribute("hidden");
            b.setAttribute("hidden", "true");
            c.removeAttribute("hidden");
            d.setAttribute("hidden", "true");
        } else if (n == 2) {
            a.setAttribute("hidden", "true");
            b.removeAttribute("hidden");
            c.setAttribute("hidden", "true");
            d.removeAttribute("hidden");
        }
    }
</script>

<SocialMedia></SocialMedia>
<NavbarIndex></NavbarIndex>
<div class="" style="background-image: url('/fondo-1.jpg'); background-size: cover; background-color: darkcyan; padding-bottom: 2%;">
    <h3 class="text-center pt-2 pb-2" id="valores" style="background-color: darkgray;  color: #ffffff; border-bottom: 1px solid #ffffff;"> NUESTROS VALORES</h3>
    <!--Valores-->
    <div class="">

        <div class="container"  style="margin-left: 14%">
            <div class="row pt-3">
                <div class="card card col-xl-3 col-12 col-sm-3" style="border-radius: 15%;">
                        <img id="calidad" src="../../valores/calidad.png" class="" alt="..." style="padding: 20%;" />
                        <p class="card-text text-center fs-5 mb-2">
                            Calidad.
                        </p>
                </div>

                <div
                    class="card card col-xl-3 col-12 col-sm-3"
                    style="margin-left: 5vw; border-radius: 15%;">
                            <img id="compromiso" src="../../valores/Compromiso.png" class="" alt="..." style="padding: 20%;" />
                            <p class="card-text text-center fs-5 mb-2">
                            Compromiso.
                            </p>
                  
                </div>

                <div
                    class="card col-xl-3 col-12 col-sm-3"
                    style="margin-left: 5vw; border-radius: 15%;">
                    <img id="innovacion" src="../../valores/Innovacion.png" class="" alt="..." style="padding: 20%;" />
                        <p class="card-text text-center fs-5 mb-2">
                            Innovacion.
                        </p>
                
                </div>
            </div>

            <div class="row pt-5">
                <div class="card card col-xl-3 col-12 col-sm-3" style="margin-left:15vw; border-radius: 15%;">
                    <img id="respeto" src="../../valores/respeto.png" class="2" alt="..." style="padding: 20%;" />
                        <p class="card-text text-center fs-5 mb-2">
                            Respeto.
                        </p>
               
                </div>

                <div
                    class="card card col-xl-3 col-12 col-sm-3"
                    style="margin-left:4vw; border-radius: 15%;"
                >
                    <img id=responsabilidad src="../../valores/responsabilidad.png" class="" alt="..." style="padding: 20%;" />
                        <p class="card-text text-center fs-5 mb-2">
                           responsabilidad.
                        </p>
                   
                </div>
            </div>
        </div>
    </div>

    <!--Mision-Vision-->
    <div class="container" >
        <div class="card mb-3" style="max-width: 100%; margin-top:5%;">
            <div class="row g-0" >
                <div class="col-md-12">
                    <div class="card-body" >
                        <div class="col-md-12 text-center" id="mision">
                            <img
                                id="mision-img"
                                src="/mision.png"
                                class="img-fluid rounded-start"
                                alt="..."
                            />
                            <img hidden
                                id="vision-img"
                                src="/vision.png" 
                                class="img-fluid rounded-start"
                                alt="..."
                                />
                            </div>
                            <div  style="margin-left: 4%;">
                            <p class="card-text" id="mision-text">
                                Somos una empresa biomédica calificada, con conocimiento
                                en tecnología para la prestación de servicio oportuno,
                                optimo y con calidad en el funcionamiento de equipo
                                médico. De esta manera aportar herramientas para brindar
                                una mayor seguridad y confianza a cada ente prestador
                            </p>
                            <p hidden class="card-text" id="vision-text">
                                En el 2025 Biovent se consolidará como una entidad líder
                                en satisfacer las necesidades de cada cliente, contar
                                con un servicio personalizado, integral y de calidad
                                tecnológica y humana, a su vez, siendo un apoyo en las
                                funciones de regulación del sistema de garantía de
                                calidad orientado al área biomédica, así como precios
                                competitivos.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div style="margin-left: 2%;" class="py-4">
                <button class="col-5 btn btn-dark mx-5" on:click={() => Cambiar(1)}>
                    Mision
                </button>
                <button class="col-5 btn btn-dark mx-2" on:click={() => Cambiar(2)}>
                    Vision
                </button>
            </div>
        </div>
    </div>
</div>
<Footer></Footer>

<style>

    #calidad:hover {
        content: url('valores/calidad_hover.png');
    }

    #compromiso:hover {
        content: url('valores/compromiso_hover.png');
    }

    #innovacion:hover {
        content: url('valores/Innovacion_hover.png');
    }

    #respeto:hover {
        content: url('valores/respeto_hover.png');
    }

    #responsabilidad:hover {
        content: url('valores/responsabilidad_hover.png');
    }

</style>