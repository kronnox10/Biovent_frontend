<script>
    import { onMount } from "svelte";
    let todos = {};
    let todos_inventario = {};
    let todos_totales = {};
    let loading = true;
    let error = null;
    let nclient = "";
    let nequipo = "";
    let activeElement = 'mostrar';
    var v_id_usuario=0;
    var v_id_equipo=0;
    let vfecha= ""
    let mantein_text= ""

    onMount(async () => {
        try {
            const response = await fetch("https://biovent-backend.onrender.com/get_clients");
            if (!response.ok) throw new Error("Error al cargar los datos");
            const data = await response.json();
            todos = data.resultado;
            console.log("todos",todos)
            
            setTimeout(() => {
                globalThis.$("#myTable").DataTable(); // Para convertrlo en datatable :D
            }, 0);
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    });

    function cerrar() {
        location.reload()
    }

    async function inventario(id, nombre) {
        nclient=nombre
        v_id_usuario=id
        console.log("La id es: ",v_id_usuario)
        console.log("El nombre: ",nclient)
        error = null;
        console.log("entra inventario")
        try { 
                const response = await fetch("http://127.0.0.1:8000/getall_nopreventives",{
                method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_usuario: v_id_usuario,
                    }),
                });
                
                const data = await response.json();
                todos_inventario = data.resultado;
                console.log("datos", todos_inventario)

                if (data.resultado && data.resultado.length > 0) {
                setTimeout(() => {
                    globalThis.$("#myinventario").DataTable(); 
                }, 0);
            }else {
                todos_inventario = [];
                error = "No hay maquinas en el inventario de este cliente :(";
            }
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        } 
    }

    function seleccionarEquipo(id) {
        v_id_equipo=id;
        console.log("ID del equipo seleccionado:", v_id_equipo);
        activeElement = "Send_preventive"; // Cambia la vista al formulario de carga
    }
    
    async function subir_file() {
        console.log("ID del equipo seleccionado:", v_id_equipo);
        if (!v_id_equipo) {
            Swal.fire({
                title: "Error",
                text: "No se ha proporcionado un ID válido.",
                icon: "error",
            });
            return;
        }
   
        const input = document.getElementById("archivo_c");
        const file = input.files[0];

        if (!file) {
            Swal.fire({
                title: "Error",
                text: "Selecciona un archivo antes de subirlo.",
                icon: "error",
            });
            return;
        }

        let uid_usuario=v_id_usuario;
        console.log("al usuario que se le mandan es", uid_usuario);
        
        if (file) {

            const formData = new FormData();
            formData.append("file", file);
            formData.append("id_usuario", uid_usuario);
            formData.append("id_maquina", v_id_equipo); // Enviamos la ID del equipo
            formData.append("creacion", vfecha);

            try {
                const response = await fetch("http://127.0.0.1:8000/upload_mongo", {
                    method: "POST",
                    body: formData,
                });
                
                
                const data = await response.json();
                console.log(data);
                let mongo_id=data.id
                
                const sending = await fetch("http://127.0.0.1:8000/create_preventives", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_maquina: v_id_equipo,
                        id_propietario: uid_usuario,
                        fecha: vfecha,
                        id_file_mongo:mongo_id,
                        fecha_mantenimiento: mantein_text,
                    }),
                });

                if (data.status_code === 200 && data.resultado === "Archivo subido exitosamente") {
                    Swal.fire({
                        title: "Carga exitosa",
                        text: "El archivo se ha subido correctamente.",
                        icon: "success",
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: data.resultado || "Hubo un problema al subir el archivo.",
                        icon: "error",
                    });
                }
            } catch (error) {
                console.error("Error de red:", error);
                Swal.fire({
                    title: "Error de conexión",
                    text: "No se pudo conectar con el servidor.",
                    icon: "error",
                });
            }
        }
    }

    async function total() {
        error = null;
        console.log("entra a realizados")
        try { 
                const response = await fetch("http://127.0.0.1:8000/getall_sipreventives",{
                method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_usuario: v_id_usuario,
                    }),
                });
                
                const data = await response.json();
                todos_totales = data.resultado;
                console.log("datos", todos_totales)

                if (data.resultado && data.resultado.length > 0) {
                setTimeout(() => {
                    globalThis.$("#mytotal").DataTable(); 
                }, 0);
            }else {
                todos_inventario = [];
                error = "No hay maquinas en el inventario de este cliente :(";
            }
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        } 
    }

    async function  downloadpdf(id,equipo) {
        v_id_equipo=id
        nequipo=equipo
        try {       
            const response = await fetch("http://127.0.0.1:8000/getmongoid",{
            method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_maquina: v_id_equipo,
                }),
            });            
            const data = await response.json();
            console.log("id mongo", data.resultado)
            let file_id= data.resultado[0]
            console.log(file_id)

            const getfiled = await fetch(`http://127.0.0.1:8000/download_mongo/${file_id}`);
                     
            if (!getfiled.ok) {
                console.error("Error al descargar el archivo:", getfiled.statusText);
                return;
            }

            
             // Convertir la respuesta en un Blob
            const fileBlob = await getfiled.blob();
            const url = window.URL.createObjectURL(fileBlob);

            const newTab = window.open();
            if (newTab) {
            newTab.document.write(`
                <html>
                    <head>
                        <title>Previsualización de PDF</title>
                    </head>
                    <body style="margin:0">
                        <iframe src="${url}" width="100%" height="100%" style="border:none;"></iframe>
                    </body>
                </html>
            `);
        } else {
            alert("Permite las ventanas emergentes para ver la previsualización.");
        }

        } catch (e) {
            console.error("Error:", e.message);
        }
    }

</script>
    <div class="container-fluid">
        <div class="row ">
            <div class="col text-start mx-4 fs-1">
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <a href="/administrador/cliente">
                    <i class="fa fa-caret-left" aria-hidden="true"></i>
                </a>
            </div>
        </div>
    </div>

    <div class="container mt-5" hidden={activeElement!='mostrar'}>
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
                <div class="overflow-x-auto display compact">
                    <table
                        class="min-w-full bg-white border border-gray-300"  
                        style="width:100%; font-size: 11px;"
                        id="myTable"
                    >
                        <thead>
                            <tr>
                                <th class="px-2 py-2 border">Cliente</th>
                                <th class="px-2 py-2 border">Telefono</th>
                                <th class="px-2 py-2 border">Direccion</th>
                                <th class="px-2 py-2 border">Correo</th>
                                <th class="px-2 py-2 border">Ciudad</th>
                                <th class="px-2 py-2 border">Jefe de area</th>
                                <th class="px-2 py-2 border">Usuario</th>
                                <th class="px-2 py-2 border">Contraseña</th>
                                <th class="px-2 py-2 border">NIT</th>
                                <th class="px-2 py-2 border">Estado</th>
                                <th class="px-2 py-2 border">Opciones</th>



                            </tr>
                        </thead>

                        <tbody>
                            {#each todos as todo}
                                <tr class="hover:bg-gray-50">
                                    <td class="px-2 py-2 border"
                                        >{todo.cliente}</td
                                    >
                                    <td class="px-2 py-2 border"
                                        >{todo.telefono}</td
                                        >
                                        <td class="px-2 py-2 border"
                                        >{todo.direccion}</td
                                    >
                                    <td class="px-2 py-2 border"
                                        >{todo.correo}</td
                                    >

                                    <td class="px-2 py-2 border">
                                        {todo.ciudad}
                                    </td>
                                    
                                    <td class="px-2 py-2 border"
                                        >{todo.persona_acargo}</td
                                    >
                                    
                                    <td class="px-2 py-2 border"
                                        >{todo.usuario}</td
                                    >

                                    <td class="px-2 py-2 border"
                                        >{todo.contraseña}</td
                                    >

                                    <td class="px-2 py-2 border"
                                    >{todo.nic}</td
                                >


                                    <td class="px-2 py-2 border">
                                        <span class={todo.estado ? "text-green-600" : "text-red-600"}
                                        > {todo.estado ? "Activo" : "Desactivado"}
                                        </span>
                                    </td>
                                    <td class="px-2 py-2 border">
                                        <button class="btn btn-success"
                                            on:click={()=>{activeElement="inventario";inventario(todo.id, todo.cliente)}}>Ver</button
                                        >
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            {/if}
    </div>

    <div class="container mt-5" hidden={activeElement!='inventario'}>
        <div class="card-header row g-2">
            <h5 class="card-title col-lg-10">
                <b>Inventario de "{nclient}"</b>
            </h5>
            <button
            class="btn btn-close col-lg-2"
            aria-label="Cerrar edición de usuario"
            on:click={() => {activeElement = 'mostrar'; cerrar()}}
            ></button>
            <button class="btn btn-outline-dark col-lg-2" on:click={() => {activeElement = 'mostrarall';total()}}>
                Mostrar realizados    
            </button>
        </div>
        
        <div class="card-body" style="">
            <div id="tablita">
                <div class="container py-4">
                    <h2 class="mb-4">Lista de equipos</h2>
                    {#if loading}
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
                        <div class="">
                            <table 
                                class="min-w-full bg-white border border-gray-300" style="width:100%; font-size: 11px;"
                                id="myinventario"
                            >
                                <thead>
                                    <tr>
                                        <th class="px-3 py-2 border">Nombre</th>
                                        <th class="px-3 py-2 border">Serial</th>
                                        <th class="px-3 py-2 border">Ubicacion</th>
                                        <th class="px-3 py-2 border">Opciones</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {#each todos_inventario as todos_inventario}
                                        <tr class="hover:bg-gray-50">
                                            <td class="px-4 py-2 border"
                                                >{todos_inventario.equipo}</td
                                            >
                                            <td class="px-4 py-2 border"
                                            >{todos_inventario.serie}</td
                                        >
                                        <td class="px-4 py-2 border"
                                            >{todos_inventario.ubicacionamiento}</td
                                        >

                                            <td class="px-4 py-2 border">
                                                <button class="btn btn-success"
                                                    on:click={()=>seleccionarEquipo(todos_inventario.id)}>Hacer preventivo</button
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

    <div class="container mt-5" hidden={activeElement!='mostrarall'}>
        <div class="card-header row g-2">
            <h5 class="card-title col-lg-10">
                <b>Preventivos realizados</b>
            </h5>
            <button
            class="btn btn-close col-lg-2"
            aria-label="Cerrar edición de usuario"
            on:click={() => {activeElement = 'mostrar'; cerrar()}}
            ></button>
            <button class="btn btn-outline-dark col-lg-2" on:click={() => {activeElement = 'inventario';}}>
                Volver    
            </button>
        </div>
        
        <div class="card-body" style="">
            <div id="tablita">
                <div class="container py-4">
                    {#if loading}
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
                        <div class="">
                            <table 
                                class="min-w-full bg-white border border-gray-300" style="width:100%; font-size: 11px;"
                                id="mytotal"
                            >
                                <thead>
                                    <tr>
                                        <th class="px-3 py-2 border">Cliente</th>
                                        <th class="px-3 py-2 border">Equipo</th>
                                        <th class="px-3 py-2 border">Serial</th>
                                        <th class="px-3 py-2 border">Fecha</th>
                                        <th class="px-3 py-2 border">Ubicacion</th>
                                        <th class="px-3 py-2 border">Opciones</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {#each todos_totales as items}
                                        <tr class="hover:bg-gray-50">
                                            <td class="px-4 py-2 border"
                                                >{items.clientamiento}</td
                                            >
                                                <td class="px-4 py-2 border">
                                                    {items.equipo}
                                                </td>
                                                <td class="px-4 py-2 border">
                                                {items.serie}
                                                </td>
                                                <td class="px-4 py-2 border">
                                                    {items.fechita}
                                                </td>
                                                <td class="px-4 py-2 border">
                                                    {items.ubicacionamiento}
                                                </td>

                                            <td class="px-4 py-2 border">
                                                <button class="btn btn-success"
                                                    on:click={()=>downloadpdf(items.id,items.equipo)}>Descargar</button
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

    <div class="container-fluid mt-5" hidden={activeElement!='Send_preventive'}>
        <div style="background-color: aqua;">
            <div class="container datos_equipo_cliente">

            </div>

            <div class="mantenimiento">
                <div class="row">
                    <div class="col-6">
                        <label for="formFile" class="form-label">Subir imagen o pdf del mantenimiento</label>
                        <input class="form-control" type="file" id="archivo_c">
                    </div>  
                    <div class="col-6">
                        <label for="formFile" class="form-label">fecha</label>
                        <input class="form-control" type="date" bind:value={vfecha}>
                        <label for="formFile" class="form-label">fecha del proximo preventivo</label>
                        <input class="form-control" type="date" bind:value={mantein_text}>
                    </div>  
                </div>
                <button on:click={subir_file}>Enviar</button>
            </div>
        </div>
    </div>



<style>

</style>