<script>
    import { onMount } from "svelte";
    let todos = {};
    let loading = true;
    let error = null;
    let activeElement = 'mostrar';
    
    onMount(async () => {
        
        try {
            const response = await fetch("http://127.0.0.1:8000/get_clients");
            if (!response.ok) throw new Error("Error al cargar los datos");
            const data = await response.json();
            todos = data.resultado;
            
            setTimeout(() => {
                globalThis.$("#myTable").DataTable(); // Para convertrlo en datatable :D
            }, 0);
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    });

//
    async function perfil(id) {
        alert(id)
        const response = await fetch("http://127.0.0.1:8000/get_client",{
            method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                }),
            });

        if (!response.ok) throw new Error("Error al cargar los datos");
        const data = await response.json();
        todos = data.resultado;
        console.log(todos)

        document.getElementById('nombres').value=todos[0].cliente;
        document.getElementById('correo').value=todos[0].correo;
        document.getElementById('password').value=todos[0].password;
        document.getElementById('jefe_de_uso').value=todos[0].jefe;
        document.getElementById('telefono').value=todos[0].cliente;
        document.getElementById('ciudad').value=todos[0].cliente;
        document.getElementById('direccion').value=todos[0].cliente;
        document.getElementById('nic').value=todos[0].cliente;

    }


</script>

<div class="py-4" style="background-image: url(''); background-size: cover; background-color: darkcyan; height: 100vh; width: 100vw;">
    
    <div id="Mostrarusuario" hidden={activeElement!=='mostrar'}>
        <div class="container">
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
                                <th class="px-4 py-2 border">Cliente</th>
                                <th class="px-4 py-2 border">Correo</th>
                                <th class="px-4 py-2 border">Contraseña</th>
                                <th class="px-4 py-2 border">Persona a cargo</th>
                                <th class="px-4 py-2 border">Telefono</th>
                                <th class="px-4 py-2 border">Ciudad</th>
                                <th class="px-4 py-2 border">Direccion</th>
                                <th class="px-4 py-2 border">NIT</th>
                                <th class="px-4 py-2 border">Estado</th>


                            </tr>
                        </thead>

                        <tbody>
                            {#each todos as todo}
                                <tr class="hover:bg-gray-50">
                                    <td class="px-4 py-2 border"
                                        >{todo.cliente}</td
                                    >
                                    <td class="px-4 py-2 border"
                                        >{todo.correo}</td
                                    >
                                    <td class="px-4 py-2 border"
                                        >{todo.contraseña}</td
                                    >
                                    <td class="px-4 py-2 border"
                                        >{todo.persona_acargo}</td
                                    >
                                    <td class="px-4 py-2 border"
                                        >{todo.telefono}</td
                                    >

                                    <td class="px-4 py-2 border"
                                    >{todo.ciudad}</td
                                >

                                    <td class="px-4 py-2 border"
                                    >{todo.direccion}</td
                                >

                                    <td class="px-4 py-2 border"
                                    >{todo.nic}</td
                                >


                                    <td class="px-4 py-2 border">
                                        <span class={todo.estado ? "text-green-600" : "text-red-600"}
                                        > {todo.estado ? "Activo" : "Desactivado"}
                                        </span>
                                    </td>
                                    <td class="px-4 py-2 border">
                                        <button class="btn btn-success"
                                            on:click={()=>{activeElement="a";perfil(todo.id)}}>Ver</button
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

    <div hidden={activeElement==='mostrar'}
    
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
                <div class="col-12 col-xl-10" style="background-color: red;">
                    
                    <div hidden={activeElement !== 'a'} class="card border-dark shadow" id="perfil" style="">
                        <div class="card-header row g-2">
                            <h5 class="card-title col-lg-11">
                                <b>Editando Usuario</b>
                            </h5>
                            <button
                                class="btn btn-close col-lg-1"
                                aria-label="Cerrar edición de usuario"
                                on:click={() => activeElement = 'mostrar'}
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

                    <div hidden={activeElement !== 'b'} class="card border-dark shadow" id="inventario" style="">
                        <div class="card-header row g-2">
                            <h5 class="card-title col-lg-11">
                                <b>Inventario</b>
                            </h5>
                            <button
                                class="btn btn-close col-lg-1"
                                aria-label="Cerrar edición de usuario"
                                on:click={() => activeElement = 'mostrar'}
                            ></button>
                        </div>
                        <div class="card-body" style="margin-left: 10%;">
                            <div id="Mostrarusuario">
                                <div class="container py-4">
                                    <h2 class="mb-4">Lista de equipos</h2>
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
                        </div>
                    </div>

                    <div hidden={activeElement !== 'c'} class="card border-dark shadow" id="cronograma" style="">
                        <div class="card-header row g-2">
                            <h5 class="card-title col-lg-11">
                                <b>Cronograma</b>
                            </h5>
                            <button
                                class="btn btn-close col-lg-1"
                                aria-label="Cerrar edición de usuario"
                                on:click={() => activeElement = 'mostrar'}
                            ></button>
                        </div>
                        <div class="card-body" style="margin-left: 10%;">
                            
                        </div>
                    </div>

                    <div hidden={activeElement !== 'd'} class="card border-dark shadow" id="os_activas" style="">
                        <div class="card-header row g-2">
                            <h5 class="card-title col-lg-11">
                                <b>os activas</b>
                            </h5>
                            <button
                                class="btn btn-close col-lg-1"
                                aria-label="Cerrar edición de usuario"
                                on:click={() => activeElement = 'mostrar'}
                            ></button>
                        </div>
                        <div class="card-body" style="margin-left: 10%;">
                            <div id="Mostrarusuario">
                                <div class="container py-4">
                                    <h2 class="mb-4">OS activas</h2>
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
                        </div>
                    </div>

                    <div hidden={activeElement !== 'e'} class="card border-dark shadow" id="os_totales" style="">
                        <div class="card-header row g-2">
                            <h5 class="card-title col-lg-11">
                                <b>Historial de os</b>
                            </h5>
                            <button
                                class="btn btn-close col-lg-1"
                                aria-label="Cerrar edición de usuario"
                                on:click={() => activeElement = 'mostrar'}
                            ></button>
                        </div>
                        <div class="card-body" style="margin-left: 10%;">
                            <div id="Mostrarusuario">
                                <div class="container py-4">
                                    <h2 class="mb-4">Historial de servicios</h2>
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
                        </div>
                    </div>

                </div>

                <div class="col-12 col-xl-2">
                    <div class="card bg-secondary py-1 px-1">
                        <div class="text-center"><button class="mt-3 btn btn-primary" on:click={() =>{ activeElement = 'a'; perfil(id); }}>Perfil</button></div>
                        <div class="text-center"><button class="mt-3 btn btn-primary" on:click={() => activeElement = 'b'}>Inventario</button></div>
                        <div class="text-center"><button class="mt-3 btn btn-primary" on:click={() => activeElement = 'c'}>Cronograma</button></div>
                        <div class="text-center"><button class="mt-3 btn btn-primary" on:click={() => activeElement = 'd'}>OS activa</button></div>
                        <div class="text-center"><button class="mt-3 mb-3 btn btn-primary" on:click={() => activeElement = 'e'}>Historial OS</button></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</div>
