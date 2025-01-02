<script>
    import { onMount } from "svelte";
    let todos = {};
    let loading = true;
    let error = null;

    onMount(async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/get_users");
            if (!response.ok) throw new Error("Error al cargar los datos");
            const data = await response.json();
            todos = data.resultado;
            console.log(todos);
            console.log(todos.usuario);

            setTimeout(() => {
                globalThis.$("#myTable").DataTable(); // Para convertrlo en datatable :D
            }, 0);
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    });
</script>

<div
    style="background-image: url('/fondo_login.png'); background-size: cover; background-color: darkcyan; height: 100vh; width: 100vw;"
>
    <div id="Mostrarusuario">
        <div class="container py-4">
            <h2 class="mb-4">Lista de usuarios</h2>
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
                                <th class="px-4 py-2 border">Usuario</th>
                                <th class="px-4 py-2 border">Nombre</th>
                                <th class="px-4 py-2 border">Apellido</th>
                                <th class="px-4 py-2 border">Documento</th>
                                <th class="px-4 py-2 border">Telefono</th>
                                <th class="px-4 py-2 border">Estado</th>
                                <th class="px-4 py-2 border">Opcion</th>
                            </tr>
                        </thead>

                        <tbody>
                            {#each todos as todo}
                                <tr class="hover:bg-gray-50">
                                    <td class="px-4 py-2 border"
                                        >{todo.usuario}</td
                                    >
                                    <td class="px-4 py-2 border"
                                        >{todo.nombre}</td
                                    >
                                    <td class="px-4 py-2 border"
                                        >{todo.apellido}</td
                                    >
                                    <td class="px-4 py-2 border"
                                        >{todo.documento}</td
                                    >
                                    <td class="px-4 py-2 border"
                                        >{todo.telefono}</td
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
                                        <button class="btn btn-success"
                                            >Ver</button
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

    <div
        class=""
        id="nav-listado"
        role="tabpanel"
        aria-labelledby="nav-listado-tab"
    >
        <div class="container text-center">
            <p class="text-orange"></p>
        </div>
        <div class="container">
            <div class="row">


                <div class="col-8">
                    <div
                        class="card border-dark shadow"
                        style="width: 60%; margin-left: 20%;"
                    >
                        <div class="card-header row g-2">
                            <h5 class="card-title col-lg-11">
                                <b>Editando Usuario</b>
                            </h5>
                            <button
                                class="btn btn-close col-lg-1"
                                aria-label="Cerrar edición de usuario"
                                on:click={() => Ocultar()}
                            ></button>
                        </div>
                        <div class="card-body" style="margin-left: 10%;">
                            <div class="row">
                                <div class="col-lg-2">
                                    <p class="card-text"><b>Nombre:</b></p>
                                </div>

                                <div class="col-lg-10">
                                    <input
                                        type="text"
                                        placeholder="Nombres"
                                        id="nombres"
                                        maxlength="100"
                                        style="border: none; width: 55%;"
                                        readonly
                                    />
                                </div>
                            </div>

                            <div class="row pt-3">
                                <div class="col-lg-2">
                                    <p class="card-text"><b>Apellido:</b></p>
                                </div>

                                <div class="col-lg-10">
                                    <input
                                        type="text"
                                        placeholder="Apellidos"
                                        id="apellidos"
                                        style="border: none; width: 55%;"
                                        readonly
                                    />
                                </div>
                            </div>

                            <div class="row pt-3">
                                <div class="col-lg-2">
                                    <p class="card-text"><b>documento:</b></p>
                                </div>
                                <div class="col-lg-10">
                                    <input
                                        type="text"
                                        id="documento"
                                        placeholder="Documento de identidad"
                                        style="border: none; width: 55%;"
                                        readonly
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
                                        id="telefono"
                                        placeholder="Telefono"
                                        maxlength="20"
                                        style="border: none; width: 55%;"
                                        readonly
                                    />
                                </div>
                            </div>

                            <div class="row pt-3">
                                <div class="col-lg-2">
                                    <p class="card-text"><b>Correo:</b></p>
                                </div>
                                <div class="col-lg-10">
                                    <input
                                        type="text"
                                        placeholder="Correo electronico"
                                        id="correo"
                                        style="border: none; width: 55%;"
                                        readonly
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
                                        <option value="1">Activar</option>
                                        <option value="0">Desactivar</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 4%;">
                                <div class="col-lg-9">
                                    ¡Al terminar de editar, darle click en
                                    actualizar para guardar los cambios!
                                </div>
                                <div class="col-lg-3 text-end">
                                    <button class="btn btn-outline-info"
                                        ><b>Actualizar</b></button
                                    >
                                </div>
                                <div id="estado" class="col-lg-10"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-4 ">
                    <div class="card bg-secondary">
                        <div><button class="btn btn-primary">Perfil</button></div>
                        <div><button class="btn btn-primary">Inventario</button></div>
                        <div><button class="btn btn-primary">Cronograma</button></div>
                        <div><button class="btn btn-primary">OS activa</button></div>
                        <div><button class="btn btn-primary">Historial OS</button></div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</div>
