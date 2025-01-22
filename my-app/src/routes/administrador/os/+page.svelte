<script>
    import {onMount} from "svelte";
    
    let activateElement='OS_active';
    let loading=true;
    let error=null;
    let todos=[]
    let tecnicos = {};
    var v_os_id=0;

    onMount (async()=>{
    try{
        
        const response= await fetch ('https://biovent-backend.onrender.com/get_os_activas');
        if (!response.ok) throw new Error("Error al cargar los datos");
        const data = await response.json();
       

        if(data!= null && data.resultado){
            todos=data.resultado;
        setTimeout(() => {
                globalThis.$("#tableActive").DataTable(); // Para convertrlo en datatable :D
            }, 0);
        }else{
            error = "No hay órdenes de servicio activas para este usuario. :D";
            
        }
    }catch(e){
        error= e.message;
    }finally{
        loading=false;
    }        
    })


    async function os_activas() {
        error = null;
        try{
            loading=true;
            const response= await fetch ('https://biovent-backend.onrender.com/get_os_activas');

            const data = await response.json();

            if(data!= null && data.resultado){
                todos=data.resultado;
            setTimeout(() => {
                    globalThis.$("#tableActive").DataTable(); // Para convertrlo en datatable :D
                }, 0);
            }else{
                error = "No hay órdenes de servicio activas para este usuario. :D";
            }
        }catch(e){
            error= e.message;
        }finally{
            loading=false;
        }   //yo opino que borremos todo el proyecto y lo empezemos de nuevo, solo de chill     
    }

    async function os_all() {
        error = null;
        try{
            loading=true;
            const response= await fetch ('https://biovent-backend.onrender.com/get_historial_os');

            const data = await response.json();


            if(data!= null && data.resultado){
                todos=data.resultado;
            setTimeout(() => {
                    globalThis.$("#tableAll").DataTable(); // Para convertrlo en datatable :D
                }, 0);
            }else{
                error = "No hay órdenes de servicio para este usuario. ._.";
                
            }
        }catch(e){
            error= e.message;
        }finally{
            loading=false;
        }        
    }



    async function Asignar_tecnico(id){
        error = null;
        v_os_id=id;
        console.log(v_os_id)

        try {
            const response = await fetch("https://biovent-backend.onrender.com/get_tecnicos");
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

    async function editar_tecnico() {
        let vtecnico = document.getElementById("tecnico_se").value;
        console.log("valor de vtecnico es: ",vtecnico)
        try {
            const response = await fetch("https://biovent-backend.onrender.com/asignar_tecnico_os", {
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
                location.reload()
            }, 5000);  

        } catch (e) {
        error = e.message;
        } finally {
        loading = false;
        }
    }

    function cerrar() {
        location.reload()
    }

</script>

<div class="py-4" style="background-size: cover; background-color: white; height: 100vh; width: 100vw;">
    <div class="mx-4 fs-1">
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <a href="/administrador">
            <i class="fa fa-caret-left" aria-hidden="true"></i>
        </a>
    </div>

    <div class="container text-center">
        <button class="btn btn-info col-5" on:click={()=>{activateElement='OS_active';os_activas()}}>Mostrar solo os activas</button>
        <button class="btn btn-info col-5" on:click={()=>{activateElement='OS_all';os_all()}}>Mostra todas las os</button>
    </div>

    <div hidden={activateElement!="OS_active"} class="container mt-5" id=pantalla>
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
                id="tableActive"
            >
                <thead>
                    <tr>
                        <th class="px-4 py-2 border">Usuario</th>
                        <th class="px-4 py-2 border">Nombre maquina</th>
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
                                    on:click={()=>{Asignar_tecnico(todo.id);}}>Asignar tecnico</button
                                >
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        {/if}


    </div>

    <div hidden={activateElement!="OS_all"} class="container mt-5" id=pantalla2>
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
                id="tableAll"
            >
                <thead>
                    <tr>
                        <th class="px-4 py-2 border">Usuario</th>
                        <th class="px-4 py-2 border">Nombre maquina</th>
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
                                    on:click={()=>{Asignar_tecnico(todo.id);}}>Asignar tecnico</button
                                    >
                                </td>

                            {:else if todo.estado!=1}
                            <td></td>
                           {:else}
                            {/if}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        {/if}
    </div>

</div>


<!-- Modal de escoger tecnicos -->
<div class="modal fade" id="Select_tecnico" tabindex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Asignar tecnico</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" on:click={cerrar} aria-label="Close"></button>
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
                <button type="button" class="btn btn-secondary" on:click={cerrar} data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" on:click={editar_tecnico}>Guardar cambios</button>
            </div>
        </div>
    </div>
</div>



<style>
    .fa{
        color: black;
    }
    .fa:hover{
        color: gray;
    }
</style>