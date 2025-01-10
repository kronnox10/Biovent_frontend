<script>
    import { onMount } from "svelte";
    let todos = {};
    let tecnicos = {};
    let todos2 = {};
    let loading = true;
    let error = null;
    let activeElement = 'mostrar';
    let activador = 0;
    var v_id_usuario=0;
    var v_id_maquina=0;
    var v_os_id=0;
    var file = null;

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

    async function editar_perfil() {
        console.log(v_id_usuario)
        let vnombre=document.getElementById('nombres').value;
        let vcorreo=document.getElementById('correo').value
        let vpassword=document.getElementById('password').value
        let vjefe=document.getElementById('jefe_de_uso').value
        let vtelefono=document.getElementById('telefono').value
        let vciudad=document.getElementById('ciudad').value
        let vdireccion=document.getElementById('direccion').value
        let vnit=document.getElementById('nit').value
        let vestado = document.getElementById('estado').value

        try{
            console.log("Entra al try de actualzar");
            const response = await fetch("http://127.0.0.1:8000/update_client", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: v_id_usuario,
                    cliente:vnombre,
                    correo:vcorreo,
                    password:vpassword,
                    jefe_de_uso:vjefe,
                    telefono:vtelefono,
                    ciudad:vciudad,
                    direccion:vdireccion,
                    nic:vnit,
                    estado:vestado,
                }),
            });

            if (!response.ok) {
            throw new Error("Error en la actualización del usuario.");
            }
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });
            Toast.fire({
                icon: "success",
                iconColor: "white",
                color: "white",
                background: "#00bdff",
                title: "usuario actualizado con exito",
            });
        }catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    }

    async function editar_perfil_maquina() {
        console.log(v_id_maquina)

        let v_nombre=document.getElementById('nombre').value
        let v_marca=document.getElementById('marca').value
        let v_modelo=document.getElementById('modelo').value
        let v_serial=document.getElementById('serie').value
        let v_inventario=document.getElementById('inventario').value
        let v_ubicacion=document.getElementById('ubicacion').value
        let v_desc_estado=document.getElementById('desc_estado').value
        let v_estado=document.getElementById('estado_i').value

        try{
            console.log("Entra al try de actualzar");
            const response = await fetch("http://127.0.0.1:8000/update_maquina", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: v_id_maquina,
                    nombre:v_nombre,
                    marca:v_marca,
                    modelo:v_modelo,
                    serial:v_serial,
                    inventario:v_inventario,
                    ubicacion:v_ubicacion,
                    estado:v_estado,
                    descripcion_e:v_desc_estado,
                }),
            });

            if (!response.ok) {
            throw new Error("Error en la actualización de la maquina.");
            }
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });
            Toast.fire({
                icon: "success",
                iconColor: "white",
                color: "white",
                background: "#00bdff",
                title: "Maquina actualizado con exito",
            });
        }catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    }

    async function editar_tecnico() {
        let vtecnico = document.getElementById("tecnico_se").value;
        try {

            const response = await fetch("http://127.0.0.1:8000/asignar_tecnico_os", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: v_os_id,
                id_tecnico: vtecnico
            }),
            });
            console.log("Actualizado");

            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });
            Toast.fire({
                icon: "success",
                iconColor: "white",
                color: "white",
                background: "#00bdff",
                title: "Tecnico asignado correctamente",
            });
            
            setTimeout(() => {
                const modalElement = document.getElementById('Select_tecnico');
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                modalInstance.hide();
            }, 5000);
            

        } catch (e) {
        error = e.message;
        } finally {
        loading = false;
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

    async function Asignar_tecnico(){
        try {
            const response = await fetch("http://127.0.0.1:8000/get_tecnicos");
            if (!response.ok) throw new Error("Error al cargar los datos");
            const data = await response.json();
            tecnicos = data.resultado;

            console.log("eu",tecnicos)

            const Selecttecnical = document.getElementById("tecnico_se");
            for (let i = 0; i < data.resultado.length; i++) {
                const user = data.resultado[i];

                const option = document.createElement("option");

                option.value = user.id;

                option.textContent = user.Nombre;

                Selecttecnical.appendChild(option);
            }
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    }

    function cerrar() {
        location.reload()
    }

    async function perfil(id) {
        v_id_usuario=id
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
        document.getElementById('password').value=todos[0].contraseña;
        document.getElementById('jefe_de_uso').value=todos[0].persona_acargo;
        document.getElementById('telefono').value=todos[0].telefono;
        document.getElementById('ciudad').value=todos[0].ciudad;
        document.getElementById('direccion').value=todos[0].direccion;
        document.getElementById('nit').value=todos[0].nic;
        document.getElementById('estado').value=todos[0].estado;
    }

    async function perfil_maquina(id) {
        console.log("verificando que id toma", id)
        v_id_maquina=id
        const response = await fetch("http://127.0.0.1:8000/get_machines",{
            method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: v_id_maquina,
                }),
            });

        if (!response.ok) throw new Error("Error al cargar los datos");
        const data = await response.json();
        todos2 = data.resultado;
        console.log(todos2)

        document.getElementById('nombre').value=todos2[0].nombre;
        document.getElementById('marca').value=todos2[0].marca;
        document.getElementById('modelo').value=todos2[0].modelo;
        document.getElementById('serie').value=todos2[0].serial;
        document.getElementById('inventario').value=todos2[0].inventario;
        document.getElementById('ubicacion').value=todos2[0].ubicacion;
        document.getElementById('desc_estado').value=todos2[0].desc_estado;
        document.getElementById('estado_i').value=todos2[0].estado;
    }

    async function inventario() {
        try { 
                const response = await fetch("http://127.0.0.1:8000/get_machine",{
                method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_usuario: v_id_usuario,
                    }),
                });
                
                const data = await response.json();
                todos = data.resultado;


                setTimeout(() => {
                    globalThis.$("#myinventario").DataTable(); 
                }, 0);
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        } 

    }

    async function cronograma() {
        
    }

    async function OS_activa(id) {
        try { 
                const response = await fetch("http://127.0.0.1:8000/get_osi",{
                method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_usuario: v_id_usuario,
                    }),
                });
                
                const data = await response.json();
                console.log("_________",data)
                if (data.resultado && data.resultado.length > 0) {
                    todos = data.resultado;
                    v_os_id=data.resultado[0].id
                    console.log("la id de la maquina es",v_os_id)
                setTimeout(() => {
                    globalThis.$("#myOSI").DataTable(); 
                }, 0);
            } else {
                todos = [];
                error = "No hay órdenes de servicio activas para este usuario. :D";
            }
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        } 
    }

    async function OS_historial() {//
        try { 
                const response = await fetch("http://127.0.0.1:8000/get_os",{
                method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_usuario: v_id_usuario,
                    }),
                });
                
                const data = await response.json();
                if (data.resultado && data.resultado.length > 0) {
            todos = data.resultado;
            
            setTimeout(() => {
                globalThis.$("#myOS").DataTable(); 
            }, 0);
            } else {
                todos = [];
                error = "Que raro, no hay ninguna Orden de servicio para ese usuario (?";
            }
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        } 

    }
</script>

<div class="py-4" style="background-image: url(''); background-size: cover; background-color: white; height: 100vh; width: 100vw;">
    
    <div id="Mostrarusuario" hidden={activeElement!=='mostrar'}>
        <div class="mx-4 fs-1">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <a href="/administrador">
                <i class="fa fa-caret-left" aria-hidden="true"></i>
            </a>
        </div>
        
        <div class="container">
            <h2 class="mb-4">Lista de usuarios</h2>

            <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#creacion_user">Crear usuario</button>
            <button class="btn btn-dark mx-1" data-bs-toggle="modal" data-bs-target="#cargue_excel">Cargar desde excel </button>

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
                                <th class="px-4 py-2 border">Opciones</th>



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
        class="" id="nav-listado" role="tabpanel" aria-labelledby="nav-listado-tab">
    
        <div class="container text-center">
            <p class="text-orange"></p>
        </div>
          
        <div class="text-end mx-5">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button class="btn btn-primary fs-5" style="background-color: white; border-color: white;" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                <i class="fa fa-align-justify" aria-hidden="true"></i>
            </button>
        </div>

        <div class="container">          
            <div class="row">
                <div class="col-12 col-xl-12" style="background-color: red;">
                                                
                    <div hidden={activeElement !== 'a'} class="card border-dark shadow" id="perfil" style="">
                        <div class="card-header row g-2">
                            <h5 class="card-title col-lg-11">
                                <b>Editando Usuario</b>
                            </h5>

                            <button
                                class="btn btn-close col-lg-1"
                                aria-label="Cerrar edición de usuario"
                                on:click={() => {activeElement = 'mostrar'; cerrar()}}
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
                                        
                                    />
                                </div>
                            </div>

                            <div class="row pt-3">
                                <div class="col-lg-2">
                                    <p class="card-text"><b>Jefe de uso:</b></p>
                                </div>
                                <div class="col-lg-10">
                                    <input
                                        type="text"
                                        id="jefe_de_uso"
                                        placeholder="Nombres"
                                        maxlength="50"
                                        style="border: none; width: 55%;"
                                        
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
                                <div class="col-lg-3 ">
                                    <button class="btn btn-outline-info" on:click={editar_perfil}
                                        ><b>Actualizar</b></button
                                    >
                                </div>
                                <div id="estado" class="col-lg-10"></div>
                            </div>
                        </div>
                    </div>

                    <div hidden={activeElement !== 'mostrarb'} class="card border-dark shadow" id="perfil_maquina" style="">
                        <div class="card-header row g-2">
                            <h5 class="card-title col-lg-11">
                                <b>Editando maquina</b>
                            </h5>
                            <button
                                class="btn btn-close col-lg-1"
                                aria-label="Cerrar edición de usuario"
                                on:click={() => {activeElement = 'mostrar'; cerrar()}}
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
                                        id="nombre"
                                        maxlength="100"
                                        style="border: none; width: 55%;"
                                        
                                    />
                                </div>
                            </div>

                            <div class="row pt-3">
                                <div class="col-lg-2">
                                    <p class="card-text"><b>Marca:</b></p>
                                </div>

                                <div class="col-lg-10">
                                    <input
                                        type="text"
                                        placeholder="marca"
                                        id="marca"
                                        style="border: none; width: 55%;"
                                        
                                    />
                                </div>
                            </div>

                            <div class="row pt-3">
                                <div class="col-lg-2">
                                    <p class="card-text"><b>Modelo:</b></p>
                                </div>
                                <div class="col-lg-10">
                                    <input
                                        type="text"
                                        id="modelo"
                                        placeholder="Modelo"
                                        style="border: none; width: 55%;"
                                        
                                    />
                                </div>
                            </div>

                            <div class="row pt-3">
                                <div class="col-lg-2">
                                    <p class="card-text"><b>Serial:</b></p>
                                </div>
                                <div class="col-lg-10">
                                    <input
                                        type="text"
                                        id="serie"
                                        placeholder="Serial"
                                        style="border: none; width: 55%;"
                                        
                                    />
                                </div>
                            </div>

                            <div class="row pt-3">
                                <div class="col-lg-2">
                                    <p class="card-text"><b>Inventario:</b></p>
                                </div>
                                <div class="col-lg-10">
                                    <input
                                        type="text"
                                        placeholder="inventario"
                                        id="inventario"
                                        style="border: none; width: 55%;"
                                        
                                    />
                                </div>
                            </div>

                            <div class="row pt-3">
                                <div class="col-lg-2">
                                    <p class="card-text"><b>Ubicacion:</b></p>
                                </div>
                                <div class="col-lg-10">
                                    <input
                                        type="text"
                                        placeholder="ubicacion"
                                        id="ubicacion"
                                        style="border: none; width: 55%;"
                                        
                                    />
                                </div>
                            </div>

                            <div class="row pt-3">
                                <div class="col-lg-2">
                                    <p class="card-text"><b>Estado:</b></p>
                                </div>
                                <div class="col-lg-10">
                                    <select
                                        id="estado_i"
                                        name="opciones"
                                        style="border: none; width: 55%;"
                                    >
                                        <option value="1">Activado</option>
                                        <option value="0">Desactivado</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row pt-3">
                                <div class="col-lg-2">
                                    <p class="card-text"><b>Descripcion:</b></p>
                                </div>
                                <div class="col-lg-10">
                                    <input
                                        type="text"
                                        placeholder="desc_estado"
                                        id="desc_estado"
                                        style="border: none; width: 55%;"
                                        
                                    />
                                </div>
                            </div>

                            <div class="row" style="margin-top: 4%;">
                                <div class="col-lg-9">
                                    ¡Al terminar de editar, darle click en
                                    actualizar para guardar los cambios!
                                </div>
                                <div class="col-lg-3 text-end">
                                    <button class="btn btn-outline-info" on:click={editar_perfil_maquina}
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
                                on:click={() => {activeElement = 'mostrar'; cerrar()}}
                            ></button>
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
                                        <div class="overflow-x-auto">
                                            <table 
                                                class="min-w-full bg-white border border-gray-300"
                                                id="myinventario"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th class="px-4 py-2 border">Nombre</th>
                                                        <th class="px-4 py-2 border">Marca</th>
                                                        <th class="px-4 py-2 border">Modelo</th>
                                                        <th class="px-4 py-2 border">Serial</th>
                                                        <th class="px-4 py-2 border">Inventario</th>
                                                        <th class="px-4 py-2 border">Ubicacion</th>
                                                        <th class="px-4 py-2 border">Estado</th>
                                                        <th class="px-4 py-2 border">Descripcion de estado</th>
                                                        <th class="px-4 py-2 border">Opciones</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {#each todos as todo}
                                                        <tr class="hover:bg-gray-50">
                                                            <td class="px-4 py-2 border"
                                                                >{todo.nombre}</td
                                                            >
                                                            <td class="px-4 py-2 border"
                                                                >{todo.marca}</td
                                                            >
                                                            <td class="px-4 py-2 border"
                                                                >{todo.modelo}</td
                                                            >
                                                            <td class="px-4 py-2 border"
                                                                >{todo.serial}</td
                                                            >
                                                            <td class="px-4 py-2 border"
                                                                >{todo.inventario}</td
                                                            >

                                                            <td class="px-4 py-2 border"
                                                                >{todo.ubicacion}</td
                                                        >

                                                            <td class="px-4 py-2 border">
                                                                <span style="color: {todo.estado ? 'green' : 'red'};">
                                                                    {todo.estado ? "Activo" : "Inactivo"}
                                                                </span>
                                                            </td>


                                                            {#if todo.estado==0}
                                                            <td class="px-4 py-2 border"
                                                            >{todo.desc_estado}</td>
                                                            
                                                            {:else if todo.estado==1}
                                                            <td class="px-4 py-2 border"></td>
                                                            {:else}
                                                            <td class="px-4 py-2 border"></td>
                                                            {/if}

                                                            <td class="px-4 py-2 border">
                                                                <button class="btn btn-success"
                                                                    on:click={()=>{activeElement="mostrarb";perfil_maquina(todo.id)}}>Editar</button
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
                                on:click={() => {activeElement = 'mostrar'; cerrar()}}
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
                                on:click={() => {activeElement = 'mostrar'; cerrar()}}
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
                                                id="myOS"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th class="px-4 py-2 border">Cliente</th>
                                                        <th class="px-4 py-2 border">Maquina</th>
                                                        <th class="px-4 py-2 border">Descripcion</th>
                                                        <th class="px-4 py-2 border">Tecnico</th>
                                                        <th class="px-4 py-2 border">Estado</th>
                                                        <th class="px-4 py-2 border">Opcion</th>
                                                    </tr>
                                                </thead>
                        
                                                <tbody>
                                                    {#each todos as todo}
                                                        <tr class="hover:bg-gray-50">
                                                            <td class="px-4 py-2 border"
                                                                >{todo.usuario_cliente}</td
                                                            >
                                                            <td class="px-4 py-2 border"
                                                                >{todo.nombre_maquina}</td
                                                            >
                                                            <td class="px-4 py-2 border"
                                                                >{todo.descripcion}</td
                                                            >
                                                            <td class="px-4 py-2 border"
                                                                >{todo.tecnico}</td
                                                            >
                                                            <td class="px-4 py-2 border">
                                                                <span style="color: {todo.estado ? 'red' : 'green'};">
                                                                    {todo.estado ? "Activo" : "Inactivo"}
                                                                </span>
                                                            </td>
                                                            <td class="px-4 py-2 border">
                                                                <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#Select_tecnico"
                                                                on:click={Asignar_tecnico}>Asignar tecnico</button
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
                                on:click={() => {activeElement = 'mostrar'; cerrar()}}
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
                                            id="myOS"
                                        >
                                            <thead>
                                                <tr>
                                                    <th class="px-4 py-2 border">Cliente</th>
                                                    <th class="px-4 py-2 border">Maquina</th>
                                                    <th class="px-4 py-2 border">Descripcion</th>
                                                    <th class="px-4 py-2 border">Tecnico</th>
                                                    <th class="px-4 py-2 border">Estado</th>
                                                    <th class="px-4 py-2 border">Opcion</th>
                                                </tr>
                                            </thead>
                    
                                            <tbody>
                                                {#each todos as todo}
                                                    <tr class="hover:bg-gray-50">
                                                        <td class="px-4 py-2 border"
                                                            >{todo.usuario_cliente}</td
                                                        >
                                                        <td class="px-4 py-2 border"
                                                            >{todo.nombre_maquina}</td
                                                        >
                                                        <td class="px-4 py-2 border"
                                                            >{todo.descripcion}</td
                                                        >
                                                        <td class="px-4 py-2 border"
                                                            >{todo.tecnico}</td
                                                        >
                                                        <td class="px-4 py-2 border">
                                                            <span style="color: {todo.estado ? 'red' : 'green'};">
                                                                {todo.estado ? "Activo" : "Solucionado"}
                                                            </span>
                                                        </td>
                                                        {#if todo.estado === 1}
                                                            <td class="px-4 py-2 border">
                                                                <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#Select_tecnico"
                                                                on:click={Asignar_tecnico}>Asignar tecnico</button
                                                                >
                                                            </td>
                                                        {/if}
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
            </div>
        </div>
    </div>
</div>

<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header text-center">
        <h5 id="offcanvasRightLabel">Menu</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <div class="card bg-secondary py-1 px-1">
            <div class="text-center"><button class="mt-3 btn btn-primary" on:click={() =>{ activeElement = 'a'; perfil(id);  }}>Perfil</button></div>
            <div class="text-center"><button class="mt-3 btn btn-primary" on:click={() => { activeElement = 'b'; inventario(); }}>Inventario</button></div>
            <div class="text-center"><button class="mt-3 btn btn-primary" on:click={() => activeElement = 'c'}>Cronograma</button></div>
            <div class="text-center"><button class="mt-3 btn btn-primary" on:click={() =>{ activeElement = 'd'; OS_activa(); }}>OS activa</button></div>
            <div class="text-center"><button class="mt-3 mb-3 btn btn-primary" on:click={() => { activeElement = 'e'; OS_historial();}}>Historial OS</button></div>
        </div>
    </div>
</div>

    <!-- Modal de cargue de usuarios -->
<div class="modal fade" id="cargue_excel" tabindex="-1" aria-labelledby="rModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="mleModalLabel">
                    <b>Cargue de usuarios</b>
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

    <!-- Modal de creacion de usuarios -->
    <div class="modal fade" id="creacion_user" tabindex="-1" aria-labelledby="rModalLabel" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mleModalLabel">
                        <b>Creacion de usuario</b>
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                        <form name="formulario"id="formulario">
                            <div class="container py-5 ps-4 px-5 mt-5 border">
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
                </div>
                <div class="modal-footer">
                    <button class="btn btn-info"> Crear </button>
                </div>
            </div>
        </div>
    </div>
    

    <!-- Modal de escoger tecnicos -->
<div class="modal fade" id="Select_tecnico" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Asignar tecnico</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div>
                    <label>Elija un tecnico</label>
                </div>
                <select class="form-select" id="tecnico_se" required>
                    <option selected>Seleccione</option>
                </select>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" on:click={editar_tecnico}>Guardar cambios</button>
            </div>
        </div>
    </div>
</div>
  
<style>
    .fa{
        color: black;
    }
</style>