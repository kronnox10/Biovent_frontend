<script>
    import NavbarAdmin from "$lib/navbar_admin.svelte";

    let v_inventario = "";
    let v_ubicacion = "";
    let v_nombre = "";
    let v_serial = "";
    let v_modelo = "";
    let v_marca = "";
    var file = null;

    async function Register() {
        v_nombre = document.getElementById("nombre").value;
        v_serial = document.getElementById("serial").value;
        v_modelo = document.getElementById("modelo").value;
        v_marca = document.getElementById("marca").value;
        v_inventario = document.getElementById("inventario").value;
        v_ubicacion = document.getElementById("ubicacion").value;

        try {
            const response = await fetch(
                "http://localhost:8000/create_machine",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombre: v_nombre,
                        serial: v_serial,
                        modelo: v_modelo,
                        marca: v_marca,
                        inventario: v_inventario,
                        ubicacion: v_ubicacion,
                    }),
                },);

            const data = await response.json();
            console.log("probando que entra");
            console.log(data);
            if (data.resultado === "Maquina registrada") {
                Swal.fire({
                    title: "Cargue exisoto",
                    icon: "success",
                    draggable: true,
                });

                location.reload();
            } else {
                Swal.fire({
                    title: "ups! uyuyui esto no hay quien lo arregle",
                    icon: "error",
                    draggable: true,
                });
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    }

    async function enviar() {
        const input = document.getElementById("archivo");
        file = input.files[0];
        console.log(file);

        if (file) {
            // Crear un objeto FormData
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch(
                    "http://localhost:8000/create_user_masivo",
                    {
                        method: "POST",
                        body: formData,
                    },
                );

                const data = await response.json();
                console.log("probando que entra");
                console.log(data);
                if (data.resultado === "Maquinas añadidas exitosamente") {
                    Swal.fire({
                        title: "Cargue exisoto",
                        icon: "success",
                        draggable: true,
                    });

                    location.reload();
                } else {
                    Swal.fire({
                        title: "ups! uyuyui esto no hay quien lo arregle",
                        icon: "error",
                        draggable: true,
                    });
                }
            } catch (error) {
                console.error("Error de red:", error);
            }
        } else {
        }
    }
</script>

<NavbarAdmin></NavbarAdmin>

<!--Inicio insertar individual-->
<div class="container pt-3">
    <div class="d-flex">
        <div class="col-xl-10 text-center fs-1">
            <b> Registro de maquinas </b>
        </div>

        <div
            class="col-xl-2 btn fs-5"
            data-bs-toggle="modal"
            data-bs-target="#TerminosCondiciones"
        >
            <span class="">Cargar </span>
            <i
                class="fa-solid fa-file-excel"
                style="color: #217346;"
                aria-hidden="true"
            ></i>
        </div>
    </div>

    <form
        name="formulario"
        id="formulario"
        class="container"
        on:submit={Register}
    >
        <div class="container py-5 ps-4 px-5 mt-5 border border-info">
            <!-- border-danger -->
            <div class="row mt-5 mx-5">
                <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6">
                    <label for="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="name"
                        placeholder="Escriba el nombre completo"
                        autocomplete="off"
                        class="form-control rounded-pill"
                        required
                        bind:value={v_nombre}
                    />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6">
                    <!--El autocomplete off, es para que no te salga sugerencia de cosas que ya registraste-->
                    <label for="serial">Serial</label>
                    <input
                        type="text"
                        id="serial"
                        name="serial"
                        placeholder="Escriba el serial"
                        autocomplete="off"
                        class="form-control rounded-pill"
                        required
                        bind:value={v_serial}
                    />
                </div>
            </div>

            <div class="row mt-4 mx-5">
                <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6">
                    <label for="modelo">Modelo</label>
                    <input
                        type="text"
                        id="modelo"
                        name="modelo"
                        placeholder="Escriba el modelo de la maquina"
                        autocomplete="off"
                        class="form-control rounded-pill"
                        required
                        bind:value={v_modelo}
                    />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6">
                    <label for="marca">Marca</label>
                    <input
                        type="text"
                        id="marca"
                        name="marca"
                        placeholder="Escriba la marca de la maquina"
                        autocomplete="off"
                        class="form-control rounded-pill"
                        required
                        bind:value={v_marca}
                    />
                </div>
            </div>

            <div class="row mt-4 mx-5">
                <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6 py-2">
                    <label for="inventario">Inventario</label>
                    <input
                        type="text"
                        id="inventario"
                        name="inventario"
                        placeholder="Escriba el inventario"
                        class="form-control rounded-pill"
                        bind:value={v_inventario}
                    />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6 py-2">
                    <label for="ubicacion">Ubicacion</label>
                    <input
                        type="text"
                        id="ubicacion"
                        placeholder="Escriba la ubicacion de la maquina"
                        required
                        class="form-control rounded-pill"
                        bind:value={v_ubicacion}
                    />
                </div>
            </div>

            <div class="row mt-4" style="margin-left: 38%;">
                <div class="row mt-4 mx-5">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6">
                        <input
                            type="submit"
                            value="Enviar"
                            class="btn text-black btn-info rounded-pill"
                        />
                    </div>
                </div>
            </div>
        </div>
    </form>

    <div><br /></div>
</div>
<!--Fin buscar indivudal-->

<!--Modal-->
<div
    class="modal fade"
    id="TerminosCondiciones"
    tabindex="-1"
    aria-labelledby="rModalLabel"
    aria-hidden="true"
>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <!--Q pro :D-->
                <h5 class="modal-title" id="mleModalLabel">
                    <b>Cargue de equipos desde excel</b>
                </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div class="modal-body">
                <p>Cargue el archivo de excel</p>

                <input type="file" id="archivo" />
            </div>
            <div class="modal-footer">
                <button class="btn btn-info" on:click={enviar}> Enviar </button>
            </div>
        </div>
    </div>
</div>
