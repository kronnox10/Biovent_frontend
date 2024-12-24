<script>
    import NavbarIndex from "../../lib/navbar_index.svelte";
    import Footer from "../../lib/Footer.svelte";
    
    import { onMount } from "svelte";

    onMount(() => {
        var map = L.map("map").setView([10.960658, -74.801816], 16);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
    });


    const serviceID = 'service_dsrm2oj'
    const templateID = 'template_qjsxkyz'
    const apikey = 'Oz0CYuSYdZpJjKuWe'

    function sendEmail() {

        const nombre = document.getElementById("name").value;
        const correo = document.getElementById("correo").value;
        const mensaje = document.getElementById("mensaje").value;
        const telefono = document.getElementById("phone").value;
        
        emailjs.init(apikey); 
        emailjs.send(serviceID, templateID, {
            name: nombre,
            email: correo, 
            phone: telefono, 
            message: mensaje, 
        })
        .then(result => { 
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Correo mandado con exito " + name,
                showConfirmButton: false,
                });
                setTimeout(() => {
                    }, 2000);
        })
        .catch(error => {
            Swal.fire({
                title: "Error!",
                text: "Error al enviar el correo: "+error.text,
                icon: "error",
                showConfirmButton:false,
            });
            setTimeout(() => {
            }, 2000);
        });
    }

</script>

<NavbarIndex></NavbarIndex>

<div>
    <div class="container pt-5">
        <h1 class="text-center">Pongase en contacto con nosotros</h1>
        <div class="d-fluid pt-5">
            <div class="row">
                <div class="col-xl-4">
                    <div class="card">
                        <div
                            class="card-body"
                            style=" color: black; background-color: skyblue;"
                        >
                            <h5>
                                <strong><b>Contactenos</b></strong>
                            </h5>
                            <div>
                                <i class="fab fa-whatsapp" style="color: green;"
                                ></i>
                                WhatsApp:
                                <p>300 302 2783</p>
                                <p></p>
                            </div>
                            <div>
                                <i
                                    class="fas fa-envelope"
                                    style="color: black ;"
                                ></i> Correo Electrónico: bioventingenieriabiomedica@gmail.com
                            </div>

                            <div class="py-4">
                                <p>
                                    <strong>BIOVENT®</strong>
                                    2024
                                </p>
                                <p>Todos los derechos reservados</p>
                                <p></p>
                            </div>

                            <h5>
                                <b>Ubicaciones</b>
                            </h5>
                            <p>
                                <i
                                    class="fas fa-map-marker-alt"
                                    style="color: blue;"
                                ></i> Barranquilla - Colombia
                            </p>
                        </div>
                    </div>
                </div>

                <div class="col-xl-8">
                    <form action="">
                        <label for="name">Nombre</label>
                        <input id="name" type="text" class="form-control mb-2" />

                        <label for="phone">Télefono</label>
                        <input id="phone" type="text" class="form-control mb-2" />

                        <label for="correo">Correo</label>
                        <input id="correo" type="text" class="form-control mb-2" />

                        <label for="mensaje">Mensaje</label>
                        <input id="mensaje" type="text" class="form-control py-4 mb-3" />

                        <button class="btn btn-info" on:click={sendEmail}>Enviar</button>
                    </form>
                </div>
            </div>
        </div>

        <div class="pt-5 mt-5" id="map">
        </div>
    </div>
</div>

<Footer></Footer>

<br>
<style>
    #map {
        height: 580px;
    }
</style>
