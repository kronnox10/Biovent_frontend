<script>
    import { onMount } from "svelte";

    let todos = {};
    //let todos2 = {};

    let loading = false;
    let error = null;
    let v_usuario = "";
    let v_password = "";
    let loginModal;

    /*
    onMount(async () => {
        try {
            const response = await fetch("https://biovent-backend.onrender.com/login");
            if (!response.ok) throw new Error("Error al cargar los datos");
            todos = await response.json();
        } catch (e) {
            error = e.message;
            alert ("sss")
        } finally {
            loading = false;
        }
    });*/

    onMount(() => {
        const modalElement = document.getElementById("loginex");
        if (modalElement) {
            loginModal = new bootstrap.Modal(modalElement);
        }
    });

    async function Login() {
        loading = true;
        try {
            const response = await fetch("https://biovent-backend.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    correo: v_usuario,
                    password: v_password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                todos = data.resultado;

                let rol_v = todos[0].id_rol;
                console.log(rol_v);

                console.log(todos);
                
                if (rol_v == 1) {
                    let name = data.resultado[0].persona_acargo;
                    let id = data.resultado[0].id;
                    let correo = data.resultado[0].correo;

                    let encontrado = { name, id, correo };
                    let miStorage = window.localStorage;
                    miStorage.setItem("usuario", JSON.stringify(encontrado));
                   
                    Swal.fire({
                       
                        position: "top",
                        icon: "success",
                        title: "Inicio de sesion exitoso, bienvenido " + name,
                        showConfirmButton: false,
                    });

                    setTimeout(() => {
                        window.location.href = "/administrador";
                    }, 2000);

                } else if (rol_v == 2) {
                    let name = data.resultado[0].nombre;
                    let id = data.resultado[0].id;
                    let correo = data.resultado[0].correo;

                    let encontrado = { name, id, correo };
                    console.log("Imprimos el encontrado", encontrado);
                    let miStorage = window.localStorage;
                    miStorage.setItem("usuario", JSON.stringify(encontrado));

                   
                    Swal.fire({
                        position: "top",  
                        icon: "success",
                        title: "Inicio de sesion exitoso, bienvenido " + name,
                        showConfirmButton: false,
                    });

                    setTimeout(() => {
                        window.location.href = "/usuario";
                    }, 2000);
                } else if (rol_v == 3) {
                    let name = data.resultado[0].nombre;
                    let id = data.resultado[0].id;
                    let correo = data.resultado[0].correo;

                    let encontrado = { name, id, correo };
                    console.log("Imprimos el encontrado", encontrado);
                    let miStorage = window.localStorage;
                    miStorage.setItem("usuario", JSON.stringify(encontrado));

                   
                    Swal.fire({
                        position: "top",  
                        icon: "success",
                        title: "Inicio de sesion exitoso, bienvenido " + name,
                        showConfirmButton: false,
                    });

                    setTimeout(() => {
                        window.location.href = "/tecnico";
                    }, 2000);
                }
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Usuario/clave incorrecto",
                    icon: "error",
                    confirmButtonText: "Cool",
                });
            }
        } catch (e) {
            error = e.message;
            alert("Error en la solicitud: " + error);
        } finally {
            loading = false;
        }
    }

    function showModal() {
        if (loginModal) {
            loginModal.show();
        }
    }

    function Ocultar() {
        loginModal.hide();
    }

    function siguiente(event, contrasena) {
        if (event.key === "Enter") {
            event.preventDefault(); // Evita que el formulario se envíe
            document.getElementById(contrasena).focus(); // Cambia el enfoque al campo especificado
        }
    }

    function enterlog() {
        if (event.key === "Enter") {
            Login();
        }
    }
    
</script>

<div
    style="background-image: url('/biovent-fondo-transformed.png'); background-size: cover; background-color: darkcyan; height: 100vh; width: 100vw;"
>
    <div class="col-sm-2 col-md-3 col-xl-3 col-lg-3 col-2">
        <a href="/" class="btn btn-dark mx-5" style="margin-top:5%; margin-bottom: -15%;">Inicio</a>
    </div>
    <div class="container col-4" style="margin-top: 7%; margin-bottom: 2%; padding-top: -10%;">
        <div
            style="text-align: center; margin-top: 1%; margin-bottom: 3%; "
            class="fs-3"
        >
            <img
                src="foto_logo__2_-removebg-preview.png"
                width="125"
                height="120"
                id=""
                alt=""
                style="margin-bottom: 5%;"
            />
            <br>
            <b>Inicio de sesion</b>
        </div>
        <div class="row justify-content-center g-2">
            <div class=" mx-5 col-md-6 mb-2">
                <input
                    on:keydown={(event) => siguiente(event, "contrasena")}
                    type="text"
                    class="form-control"
                    placeholder="Correo"
                    bind:value={v_usuario}
                />
            </div>

            <div class="col-md-6 mb-3">
                <input
                    on:keydown={enterlog}
                    id="contrasena"
                    class="form-control"
                    type="password"
                    placeholder="Contraseña"
                    bind:value={v_password}
                />
            </div>
        </div>

        <div class="text-center">
            <button type="button" class="btn btn-primary mt-3" on:click={Login}>
                Ingresar
            </button>
        </div>
    </div>
</div>

{#if loading}
    <div class="overlay">
        <div class="spinner-grow text-light" role="status">
            <span class="visually-hidden">Cargando...</span>
        </div>
    </div>
{/if}

<style>
    .container {
        max-width: 600px; /* Limita el ancho del contenedor */
        margin: auto; /* Centra el contenedor horizontalmente */
        padding: 20px; /* Agrega padding interno */
        border-radius: 10px; /* Bordes redondeados */
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Sombra para profundidad */
        background-color: #f9f9f9; /* Color de fondo claro */
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5); /* Oscurecimiento del fondo */
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1050; /* Asegurarse de que estÃ© sobre el contenido */
    }

    .form-control {
        border-radius: 5px; /* Bordes redondeados para los inputs */
        border: 1px solid #ced4da; /* Borde gris claro */
    }

    .form-control:focus {
        border-color: #80bdff; /* Color del borde al enfocar */
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* Sombra al enfocar */
    }

    .btn-primary {
        background-color: #008b8b; /* Color de fondo del botÃ³n */
        border: none; /* Sin borde */
        padding: 10px 20px; /* Padding interno */
    }

    .btn-primary:hover {
        background-color: #1bd1d1; /* Color de fondo al pasar el mouse */
    }

    @media (max-width: 768px) {
        .col-md-4 {
            width: 100%; /* Hace que los inputs ocupen el 100% en pantallas pequeÃ±as */
        }
    }
</style>