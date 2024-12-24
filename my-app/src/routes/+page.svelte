<script>
    import Footer from "../lib/Footer.svelte";
    import NavbarIndex from "../lib/navbar_index.svelte";
    import SocialMedia from "../lib/social_media.svelte";
</script>

<!--<div>
    <div class="d-flex">
        <div class="col-2 mt-3 px-5 mb-2 col-xl-9">
            <a target="_blank" href="#"
                ><img
                    src="foto_logo__2_-removebg-preview.png"
                    width="170"
                    height="120"
                    id=""
                    alt=""
                />
            </a>
        </div>

       <div
            class="  col-lg-2 col-3 col-md-2 col-sm-2 col-xl-2 text-white text-end"
        >
            <p>Redes sociales</p>

            <a
                href="https://www.facebook.com/jesusalfredo.coronadovertel?mibextid=ZbWKwL"
                class="facebook"
                target="_blank"
                aria-label="Icono de facebook"
            >
                <i
                    class="fab fa-facebook-f"
                    id="facebook"
                    style="font-size: 2em;"
                ></i>
            </a>

            <a
                href="https://www.instagram.com/"
                class="instagram mx-5"
                target="_blank"
                aria-label="Icono de instagram"
            >
                <i
                    class="fab fa-instagram"
                    id="instagram"
                    style="font-size: 2em; "
                ></i>
            </a>

            <a
                href="https://wa.me/573008725181"
                class="whatsapp"
                target="_blank"
                aria-label="Icono de whats"
            >
                <i
                    class="fab fa-whatsapp"
                    id="whatsapp"
                    style="font-size: 2em;"
                ></i>
            </a>
        </div>
    </div>
</div>-->

<NavbarIndex></NavbarIndex>
<SocialMedia></SocialMedia>
<div class="" style="background-image: url('/fondo-3.jpg'); background-size: cover; background-color: darkcyan;">
    <!--Inicio de carrusel
    <div
        id="carouselExampleCaptions"
        class="carousel slide"
        style=""
        data-bs-ride="carousel"
    >   
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img
                    src="../first.jpg"
                    class="d-block w-100"
                    alt="..."
                    width="1000"
                    height="550"
                />
            </div>
            <div class="carousel-item">
                <img
                    src="../second.jpg"
                    class="d-block w-100"
                    alt="..."
                    width="1000"
                    height="550"
                />
            </div>
            <div class="carousel-item">
                <img
                    src="../third.png"
                    class="d-block w-100"
                    alt="..."
                    width="1000"
                    height="550"
                />
            </div>
        </div>
        <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
        >
            <span class="carousel-control-prev-icon" aria-hidden="true"
            ></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
        >
            <span class="carousel-control-next-icon" aria-hidden="true"
            ></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    Final de carrusel-->
    
    <div class="d-flex">
        <div class=" container col-10">
            <!--Inicio de cartas-->
            <div class="container text-center" style="">
                <div class="row" style="padding-top: 4%;">
                    <div
                        class="card col-12 col-sm-3"
                        style="width: 32%; margin-right: 1%; padding-bottom: 5%"
                    >
                    <div id="carouselExampleSlidesOnly" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="../servicio_t.jpg" class="card-img-top py-2" width="230" height="200" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="../servicio_t1.jpg" class="card-img-top py-2"  width="230" height="200" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="../servicio_t2.jpg" class="card-img-top py-2"  width="230" height="200" alt="...">
                            </div>
                        </div>
                    </div>
                        <div class="card-body">
                            <h5 class="card-title">SERVICIOS TECNICOS</h5>
                            <p class="card-text">
                                Ofrecemos servicios de mantenimientos preventivos programados y
                                correctivos ilimitados a peticion del cliente, para garantizar el optimo
                                funcionamiento de los dispositivos y equipos medicos.
                            </p>
                        </div>
                    </div>

                    <div
                        class="card col-12 col-sm-3"
                        style="width: 32%; margin-right:1%; margin-left: 1%;"
                    >
                    <div id="carouselExampleSlidesOnly" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="../entrenamientos.jpg" class="card-img-top py-2" width="230" height="200" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="../entrenamientos1.jpg" class="card-img-top py-2"  width="230" height="200" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="../entrenamientos2.jpg" class="card-img-top py-2"  width="230" height="200" alt="...">
                            </div>
                        </div>
                    </div>
                        <div class="card-body">
                            <h5 class="card-title">ENTRENAMIENTOS</h5>
                            <p class="card-text">
                                Nuestro servicio de entrenamiento esta dedicado a potenciar las habilidades y
                                conocimientos de nuestros clientes, ofrecemos capacitaciones personalizadas enfocadas
                                en practicas innovadoras y la seguridad del paciente.
                            </p>
                        </div>
                    </div>

                    <div class="card col-12 col-sm-3"style="width: 32%; margin-left: 1%;">
                        <div id="carouselExampleSlidesOnly" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="../diseño_e.jpg" class="card-img-top py-2" width="230" height="200" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img src="../diseño_e3.jpg" class="card-img-top py-2"  width="230" height="200" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img src="../diseño_e2.jpg" class="card-img-top py-2"  width="230" height="200" alt="...">
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">
                                DISEÑO DE PROTOTIPO DE EQUIPOS MEDICOS
                            </h5>
                            <p class="card-text">
                                Nuestro servicio de diseño de prototipos transforma ideas en soluciones tangibles,
                                ayudando a nuestros clientes a visualizar y perfeccionar sus productos previo a su
                                produccion final.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!--Final de cartas-->

            <!--Inicio de carta baja-->
            <div class="card mb-3 mt-4" style="max-width: auto; background-color: #ffffff;">
                <div class="row g-0">
                    <div class="col-md-12">
                        <div class="card-head" style="background-color: #8a8c91;">
                            <h5
                                class="card-title text-center py-2"
                                id="cliente1" 
                                style="color: white;"
                            >
                                CLIENTES
                            </h5>
                            <p class="card-text"></p>
                        </div>
                        <div class="card-body px-5 py-3">
                            <img
                                src="../logos clientes/colmedica.jpg"
                                class=" text-center py-2"
                                width="111"
                                height="90"
                                alt="..."
                            />
                            <img
                                src="../logos clientes/eap.png"
                                class="  text-center py-2"
                                width="111"
                                height="90"
                                alt="..."
                            />
                            <img
                                src="../logos clientes/image_gallery.jpg"
                                class="  text-center py-2"
                                width="111"
                                height="90"
                                alt="..."
                            />
                            <img
                                src="../logos clientes/ips madss.png"
                                class="  text-center py-2"
                                width="111"
                                height="90"
                                alt="..."
                            />
                            <img
                                src="../logos clientes/medcosta.jpg"
                                class="  text-center py-2"
                                width="111"
                                height="90"
                                alt="..."
                            />
                            <img
                                src="../logos clientes/oxford.png"
                                class="  text-center py-2"
                                width="111"
                                height="90"
                                alt="..."
                            />
                            <img
                                src="../logos clientes/presicion2.jpg"
                                class="  text-center py-2"
                                width="111"
                                height="90"
                                alt="..."
                            />
                            <img
                                src="../logos clientes/reina.png"
                                class="  text-center py-2"
                                width="111"
                                height="90"
                                alt="..."
                            />
                            <img
                                src="../logos clientes/salamina.png"
                                class="  text-center py-2"
                                width="111"
                                height="90"
                                alt="..."
                            />
                            <img
                                src="../logos clientes/s.m.q.jpg"
                                class="  text-center py-2"
                                width="310"
                                height="100"
                                alt="..."
                            />
                            <img
                                src="../logos clientes/salud-total.jpg"
                                class="  text-center py-2"
                                width="130"
                                height="100"
                                alt="..."
                            />
                            <img
                                src="../logos clientes/semin.jpg"
                                class="  text-center py-2"
                                width="111"
                                height="90"
                                alt="..."
                            />
                            <img
                                src="../logos clientes/unifrar.png"
                                class="  text-center py-2"
                                width="130"
                                height="100"
                                alt="..."
                            />
                            <img
                                src="../logos clientes/unimetro.png"
                                class="  text-center py-2"
                                width="130"
                                height="100"
                                alt="..."
                            />
                        </div>
                    </div>
                </div>
            </div>
            <!--Final carta baja-->
        </div>
    </div>
</div>

<Footer></Footer>

<style>
   /* @keyframes redPulse {
        0%, 100% { color: black; transform: scale(1); }
        50% { color: #E1306C; transform: scale(1.2); }
    }


    @keyframes bluePulse {
        0%, 100% { color: black; transform: scale(1); }
        50% { color: #007bff; transform: scale(1.2); }
    }

    @keyframes greenPulse {
        0%, 100% { color: black; transform: scale(1); }
        50% { color: rgb(2, 143, 2); transform: scale(1.2); }
    }
    /* 

    */


    /*#facebook, #instagram, #whatsapp {
        color: black;
        transition: color 0.3s ease; 
    }

    a.facebook:hover #facebook {
        color: #4267B2; 
        animation: bluePulse 1s infinite;
    }

    a.instagram:hover #instagram {
        color: #E1306C; 
        animation: redPulse 1s infinite;

    }

    a.whatsapp:hover #whatsapp {/* a.whatsapp seria la etiqueta a con la clase a, y el #whatsapp seria la id
        color: #25D366; 
        animation: greenPulse 1s infinite;

    }

    .carousel-control-prev-icon:hover,
    .carousel-control-next-icon:hover{
        background-color: #252525d2; 
        border-radius: 2px;
        padding: 10px;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .carousel-control-prev-icon {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23ffffff' viewBox='0 0 16 16'%3E%3Cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L6.707 7l4.647 4.646a.5.5 0 0 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 0 1 .708 0z'/%3E%3C/svg%3E");
        background-size: 100%; /* Ajusta el tamaño 
        width: 2rem; /* Ancho de la flecha 
        height: 2rem; /* Altura de la flecha 
    }

    /*.carousel-control-next-icon {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23ffffff' viewBox='0 0 16 16'%3E%3Cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l5 5a.5.5 0 0 1 0 .708l-5 5a.5.5 0 0 1-.708-.708L9.293 7 4.646 2.354a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
        background-size: 100%; /* Ajusta el tamaño 
        width: 2rem; Ancho de la flecha 
        height: 2rem; /* Altura de la flecha
    }*/
</style>
