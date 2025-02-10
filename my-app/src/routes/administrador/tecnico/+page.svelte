<script>
    import { onMount } from "svelte";
    let todos = {};
    let loading = true;
    let error = null;
    let activeElement = "mostrar";
    var v_id_tecnico=0
    
    onMount(async () => {
        try {
            const response = await fetch(
                "https://biovent-backend.onrender.com/get_technicals",
            );
            if (!response.ok) throw new Error("Error al cargar los datos");
            const data = await response.json();
            todos = data.resultado;
            console.log("data",todos)
            setTimeout(() => {
                globalThis.$("#myTable").DataTable();
            }, 0);
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    });

    async function editar(id) {
         v_id_tecnico = id;
        console.log("id del ", v_id_tecnico);
        const response = await fetch("https://biovent-backend.onrender.com/get_technical", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: v_id_tecnico,
            }),
        });

        if (!response.ok) throw new Error("Error al cargar los datos");
        const data = await response.json();
        console.log(data);
        todos = data.resultado;
        console.log(todos);

        document.getElementById("nombres").value = todos[0].cliente;
        document.getElementById("correo").value = todos[0].correo;
        document.getElementById("useri").value = todos[0].usuario;
        document.getElementById("password").value = todos[0].contraseña;
        document.getElementById("jefe_de_uso").value = todos[0].persona_acargo;
        document.getElementById("telefono").value = todos[0].telefono;
        document.getElementById("ciudad").value = todos[0].ciudad;
        document.getElementById("direccion").value = todos[0].direccion;
        document.getElementById("nit").value = todos[0].nic;
        document.getElementById("estado").value = todos[0].estado;
    }

    function cerrar() {
        location.reload()
    }
    
    async function Register() {
       let vu_correo = document.getElementById("u_correo").value;
       let vu_usuario = document.getElementById("u_usuario").value;
       let vu_contraseña = document.getElementById("u_contraseña").value;
       let vu_user = document.getElementById("u_user").value;
       let vu_telefono = document.getElementById("u_telefono").value;
       let vu_ciudad = document.getElementById("u_ciudad").value;


        try {
            const response = await fetch(
                "http://localhost:8000/create_technical",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_rol: 3,
                        cliente: "Biovent",
                        correo: vu_correo,
                        usuario_l: vu_usuario,
                        password: vu_contraseña,
                        jefe_de_uso: vu_user,
                        telefono: vu_telefono,
                        ciudad: vu_ciudad,
                        direccion: null,
                        nic: "901617987-1",
                        estado: true,
                    }),
                },
            );

            const data = await response.json();
            console.log(data);

            if (data.resultado === "Usuario registrado") {
                Swal.fire({
                    title: "registro exisoto",
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

    async function update() {
        console.log("usuario a actualizar con id", v_id_tecnico)
        let v_nombre = document.getElementById("nombres").value;
        let v_correo = document.getElementById("correo").value;
        let v_usuario = document.getElementById("useri").value;
        let v_contraseña = document.getElementById("password").value;
        let v_user = document.getElementById("jefe_de_uso").value;
        let v_telefono = document.getElementById("telefono").value;
        let v_ciudad = document.getElementById("ciudad").value;
        let v_direccion = document.getElementById("direccion").value;
        let v_NIT = document.getElementById("nit").value;
        let v_estado = document.getElementById("estado").value;


        const response = await fetch("https://biovent-backend.onrender.com/update_client", {
            
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cliente: v_nombre,
                correo: v_correo,
                usuario_l: v_usuario,
                password: v_contraseña,
                jefe_de_uso: v_user,
                telefono: v_telefono,
                ciudad: v_ciudad,
                direccion: v_direccion,
                nic: v_NIT,
                estado: v_estado,
                id: v_id_tecnico
            }),
        });

        const data = await response.json();
        console.log(data);

        alert("se actualizo perro")
    }

</script>

<div
    id="Mostrarusuario"
    class="py-4"
    style="background-image: url(''); background-size: cover; background-color: white; height: 100vh; width: 100vw;"
    hidden={activeElement !== "mostrar"}
>
    <div>
        <div class="mx-4 fs-1">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <a href="/administrador">
                <i class="fa fa-caret-left" aria-hidden="true"></i>
            </a>
        </div>

        <div class="container">
            <h2 class="mb-4">Lista de Tecnicos</h2>
            <button
                class="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#creacion_user">Crear tecnico</button
            >
            {#if loading}
                <!---->
                <div class="row g-2 justify-content-center">
                    <p
                        class="text-center col-lg-2 col-md-2 col-sm-2 col-12 col-xl-2"
                    >
                        Cargando datos...
                    </p>
                    <div
                        class="spinner-border col-lg-4 col-md-4 col-sm-4 col-12 col-xl-4"
                        role="status"
                    >
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            {:else if error}
                <p class="text-red-500">Error: {error}</p>
            {:else}
                <div class="overflow-x-auto">
                    <table
                        class="min-w-full bg-white border border-gray-300"
                        id="myTable"
                    >
                        <thead>
                            <tr>
                                <th class="px-4 py-2 border">Nombre tecnico</th>
                                <th class="px-4 py-2 border">Telefono</th>
                                <th class="px-4 py-2 border">Correo</th>
                                <th class="px-4 py-2 border">Usuario</th>
                                <th class="px-4 py-2 border">Contraseña</th>
                                <th class="px-4 py-2 border">Ciudad</th>
                                <th class="px-4 py-2 border">Estado</th>
                                <th class="px-4 py-2 border">Opciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {#each todos as todo}
                                <tr class="hover:bg-gray-50">
                                    <td class="px-4 py-2 border"
                                        >{todo.persona_acargo}</td
                                    >
                                    <td class="px-4 py-2 border"
                                        >{todo.telefono}</td
                                    >
                                    <td class="px-4 py-2 border"
                                        >{todo.correo}</td
                                    >
                                    <td class="px-4 py-2 border"
                                        >{todo.usuario}</td
                                    >
                                    <td class="px-4 py-2 border"
                                        >{todo.contraseña}</td
                                    >

                                    <td class="px-4 py-2 border"
                                        >{todo.ciudad}</td
                                    >

                                    <td class="px-4 py-2 border">
                                        <span
                                            class={todo.estado
                                                ? "text-green-600"
                                                : "text-red-600"}
                                        >
                                            {todo.estado
                                                ? "Activo"
                                                : "Desactivado"}
                                        </span>
                                    </td>
                                    <td class="px-4 py-2 border">
                                        <button
                                            class="btn btn-success"
                                            on:click={() => {
                                                activeElement = "a";
                                                editar(todo.id);
                                            }}>Ver</button
                                        >
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            {/if}
        </div>
    </div>
</div>

<div
    hidden={activeElement === "mostrar"}
    id="nav-listado"
    role="tabpanel"
    aria-labelledby="nav-listado-tab"
>
    <div class="container text-center">
        <p class="text-orange"></p>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-12 col-xl-12">
                <div class="card border-dark shadow" id="perfil" style="">
                    <div class="card-header row g-2">
                        <h5 class="card-title col-lg-11">
                            <b>Editando tecnico</b>
                        </h5>

                        <button
                            class="btn btn-close col-lg-1"
                            aria-label="Cerrar edición de usuario"
                            on:click={() => {activeElement = "mostrar";cerrar();}}
                        ></button>
                    </div>
                    <div class="card-body" style="margin-left: 10%;">
                        <div class="row">
                            <div class="col-lg-2">
                                <p class="card-text">
                                    <b>Nombre de la empresa:</b>
                                </p>
                            </div>

                            <div class="col-lg-10">
                                <input
                                    type="text"
                                    placeholder="Nombres"
                                    id="nombres"
                                    autocomplete="off"
                                    maxlength="100"
                                    style="border: none; width: 55%;"
                                />
                            </div>
                        </div>

                        <div class="row pt-3">
                            <div class="col-lg-2">
                                <p class="card-text"><b>correo:</b></p>
                            </div>

                            <div class="col-lg-10">
                                <input
                                    type="email"
                                    placeholder="email"
                                    id="correo"
                                    style="border: none; width: 55%;"
                                    autocomplete="off"
                                />
                            </div>
                        </div>

                        <div class="row pt-3">
                            <div class="col-lg-2">
                                <p class="card-text"><b>Usuario:</b></p>
                            </div>

                            <div class="col-lg-10">
                                <input
                                    type="text"
                                    placeholder="usuario"
                                    id="useri"
                                    style="border: none; width: 55%;"
                                    autocomplete="off"
                                />
                            </div>
                        </div>

                        <div class="row pt-3">
                            <div class="col-lg-2">
                                <p class="card-text"><b>password:</b></p>
                            </div>
                            <div class="col-lg-10">
                                <input
                                    type="text"
                                    id="password"
                                    placeholder="contraseña"
                                    style="border: none; width: 55%;"
                                    autocomplete="off"
                                />
                            </div>
                        </div>

                        <div class="row pt-3">
                            <div class="col-lg-2">
                                <p class="card-text"><b>Tecnico:</b></p>
                            </div>
                            <div class="col-lg-10">
                                <input
                                    type="text"
                                    id="jefe_de_uso"
                                    placeholder="Nombres"
                                    maxlength="50"
                                    style="border: none; width: 55%;"
                                    autocomplete="off"
                                />
                            </div>
                        </div>

                        <div class="row pt-3">
                            <div class="col-lg-2">
                                <p class="card-text"><b>Telefono:</b></p>
                            </div>
                            <div class="col-lg-10">
                                <input
                                    type="text"
                                    placeholder="Telefono"
                                    id="telefono"
                                    style="border: none; width: 55%;"
                                    autocomplete="off"
                                />
                            </div>
                        </div>

                        <div class="row pt-3">
                            <div class="col-lg-2">
                                <p class="card-text"><b>Ciudad:</b></p>
                            </div>
                            <div class="col-lg-10">
                                <input
                                    type="text"
                                    placeholder="Ciudad"
                                    id="ciudad"
                                    style="border: none; width: 55%;"
                                    autocomplete="off"
                                />
                            </div>
                        </div>

                        <div class="row pt-3">
                            <div class="col-lg-2">
                                <p class="card-text"><b>direccion:</b></p>
                            </div>
                            <div class="col-lg-10">
                                <input
                                    type="text"
                                    placeholder="Direccion"
                                    id="direccion"
                                    style="border: none; width: 55%;"
                                    autocomplete="off"
                                />
                            </div>
                        </div>

                        <div class="row pt-3">
                            <div class="col-lg-2">
                                <p class="card-text"><b>Nit:</b></p>
                            </div>
                            <div class="col-lg-10">
                                <input
                                    type="text"
                                    placeholder="NIT"
                                    id="nit"
                                    style="border: none; width: 55%;"
                                    autocomplete="off"
                                />
                            </div>
                        </div>

                        <div class="row pt-3">
                            <div class="col-lg-2">
                                <p class="card-text"><b>Estado:</b></p>
                            </div>
                            <div class="col-lg-10">
                                <select
                                    id="estado"
                                    name="opciones"
                                    style="border: none; width: 55%;"
                                >
                                    <option value="1">Activado</option>
                                    <option value="0">Desactivado</option>
                                </select>
                            </div>
                        </div>

                        <div class="row" style="margin-top: 4%;">
                            <div class="col-lg-9">
                                ¡Al terminar de editar, darle click en
                                actualizar para guardar los cambios!
                            </div>
                            <div class="col-lg-3">
                                <button
                                    class="btn btn-outline-info"
                                    on:click={update}><b>Actualizar</b></button
                                >
                            </div>
                            <div id="estado" class="col-lg-10"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--Modal de creacion de tecnicos-->
<div
    class="modal fade"
    id="creacion_user"
    tabindex="-1"
    aria-labelledby="rModalLabel"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="mleModalLabel">
                    <b>Creacion de tecnicos</b>
                </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div class="modal-body">
                <form name="formulario" id="formulario">
                    <div class="container py-1 ps-3 px-5">
                        <!-- border-danger -->
                        <div class="row mt-5 mx-5">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6">
                                <!--El autocomplete off, es para que no te salga sugerencia de cosas que ya registraste-->
                                <label for="u_correo">correo</label>
                                <input
                                    type="text"
                                    id="u_correo"
                                    name="correo"
                                    placeholder="Escriba el correo electronico"
                                    autocomplete="off"
                                    class="form-control rounded-pill"
                                    required
                                />
                            </div>
                            <div
                                class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6"
                            >
                                <label for="u_contraseña">Contraseña</label>
                                <input
                                    type="text"
                                    id="u_contraseña"
                                    name="contraseña"
                                    placeholder="Escriba la contraseña de la cuenta"
                                    autocomplete="off"
                                    class="form-control rounded-pill"
                                    required
                                />
                            </div>
                        </div>
                        <div class="row mt-5 mx-5">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6">
                                <!--El autocomplete off, es para que no te salga sugerencia de cosas que ya registraste-->
                                <label for="u_usuario">Usuario</label>
                                <input
                                    type="text"
                                    id="u_usuario"
                                    name="Usuario"
                                    placeholder="Escriba el usuario del tecnico"
                                    autocomplete="off"
                                    class="form-control rounded-pill"
                                    required
                                />
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6">
                                <label for="u_user">Nombre del tecnico</label>
                                <input
                                    type="text"
                                    id="u_user"
                                    name="otro_nombre"
                                    placeholder="Escriba el nombre del tecnico"
                                    autocomplete="off"
                                    class="form-control rounded-pill"
                                    required
                                />
                            </div>
                        </div>
                        <div class="row mt-5 mx-5">
                            <div
                                class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6"
                            >
                                <label for="u_telefono">Telefono</label>
                                <input
                                    type="text"
                                    id="u_telefono"
                                    name="telefono"
                                    placeholder="Añada el numero telefonico"
                                    class="form-control rounded-pill"
                                    autocomplete="off"
                                />
                            </div>
                            <div
                                class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6"
                            >
                                <label for="u_ciudad">Ciudad</label>
                                <input
                                    type="text"
                                    id="u_ciudad"
                                    placeholder="Escriba la ciudad del tecnico"
                                    required
                                    class="form-control rounded-pill"
                                    autocomplete="off"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-info" on:click={Register}>
                    Crear
                </button>
            </div>
        </div>
    </div>
</div>

<style>
    .fa {
        color: black;
    }
    .fa:hover {
        color: gray;
    }
</style>
