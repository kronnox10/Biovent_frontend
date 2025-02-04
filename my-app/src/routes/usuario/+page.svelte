<script>
    
    import {onMount} from "svelte";

    let todos={}
    let loading=true;
    let error= null;
    let todos_inventario=[]
    var id_invt=0
    var v_id=0
    onMount(async()=>{
        let miStorage = window.localStorage;
        let usuario = JSON.parse(miStorage.getItem("usuario"));
        v_id = usuario.id;
        console.log(v_id)

        try{
            const response = await fetch("https://biovent-backend.onrender.com/get_machine_on",{

                method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_usuario:v_id
                    }),      
            });
            const data= await response.json();
            todos= data.Funcionando;
            console.log("verificando todos", todos)
            let v_t_equipos= document.getElementById('t_equipos').innerHTML=todos;
            inventario()
            client()    
            e_inactive()
            e_inactive_topic()
        }catch(e){
            error= e.message;
        }finally{
            loading=false
        }

    })


    async function perfil() {
        console.log("Entramos aca ",v_id)

        const response = await fetch("https://biovent-backend.onrender.com/get_client",{
            method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: v_id,
                }),
            });

        if (!response.ok) throw new Error("Error al cargar los datos");
        const data = await response.json();
        todos = data.resultado;

        document.getElementById('nombres').value=todos[0].cliente;
        document.getElementById('correo').value=todos[0].correo;
        document.getElementById('password').value=todos[0].contraseña;
        document.getElementById('jefe_de_uso').value=todos[0].persona_acargo;
        document.getElementById('telefono').value=todos[0].telefono;
        document.getElementById('ciudad').value=todos[0].ciudad;
        document.getElementById('direccion').value=todos[0].direccion;
        document.getElementById('nit').value=todos[0].nic;
    }

    async function inventario() {
        error = null;
            console.log("entra inventario")
            try { 
                    const response = await fetch("https://biovent-backend.onrender.com/get_machine",{
                    method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            id_usuario: v_id,
                        }),
                    });
                    
                    const data = await response.json();
                    todos_inventario = data.resultado;
                    
                    if (data.resultado && data.resultado.length > 0) {
                    setTimeout(() => {
                        globalThis.$("#myinventario").DataTable(); 
                    }, 0);
                }else {
                    todos_inventario = [];
                    error = "No hay maquinas en el inventario de este cliente ??"
                }
            } catch (e) {
                error = e.message;
            } finally {
                loading = false;
            } 

    }


    async function client() {
        try{
            console.log(v_id)
            const response = await fetch("https://biovent-backend.onrender.com/get_client",{

                method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id:v_id
                    }),      

            });
            const data= await response.json();
            todos= data.resultado;
            console.log("verificando todos, client" ,todos)
          let name= document.getElementById('name').innerHTML=todos[0].persona_acargo;
          let cliente= document.getElementById('client').innerHTML=todos[0].cliente;


        }catch(e){
        error= e.message;
        }finally{    
        }
    }      

    async function e_inactive() {
        try{//ruta para mostrar nombre(rafael) y el cliente (universidad del norte), equipos actuales...

            const response = await fetch("https://biovent-backend.onrender.com/get_machine_off",{

                method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_usuario:v_id
                    }),      

            });
            const data= await response.json();
            todos= data.Dañadas;
            let v_e_inactive= document.getElementById('e_inactive').innerHTML=todos;
            
        }catch(e){
            error= e.message;
        }finally{
            
        }
    }
    
    async function e_inactive_topic() {
        try{
            console.log("Segundo llamado")
            const response = await fetch("https://biovent-backend.onrender.com/get_machine_off_topic",{
                method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_usuario:v_id
                    }),      
            });
            const data= await response.json();
            todos=data.Dañadasporalgo;
            console.log("verificando todos", todos)
            let v_e_inactive_pieza= document.getElementById('inactive_pieza').innerHTML=todos;
    
        }catch(e){
            error= e.message;
        }finally{
            //loading=false;
            
        }
    }

    async function solicitar() {
        try{
            let desc=document.getElementById('desc').value;
            const response = await fetch("https://biovent-backend.onrender.com/create_os",{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                    id_propietario: v_id,
                    id_maquina: id_invt,    
                    descripcion: desc,
                    tecnico:null,
                    estado:1
                }),
        });    

        if (!response.ok) {
            throw new Error("Error en la actualización del usuario.");
            }
            
            Swal.fire({
                title: "Orden de servicio creada con exito",
                icon: "success",
                iconColor: "white",
                color: "white",
                showConfirmButton: false,
                background: "gray",
                timer: 2500
            });




        }catch(e){
            error=e.message
        }finally{
            estado_maquina(id_invt)
        }  
    }
  

    async function estado_maquina(v_id_maquina) {
        try{
            const response = await fetch("https://biovent-backend.onrender.com/up_est_mac", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id:v_id_maquina,
                }), 
            });
            console.log("Maquina apagada")

            if (!response.ok) {
            throw new Error("Error en la actualización de la maquina.");
            }
            Swal.fire({
                title: "Maquina apagada :c",
                icon: "error",
                showConfirmButton: false,
                timer: 2500
            });
            window.location.reload()
        }catch(e){
            error=e.message
        } 
    }


</script>



<div style="background-image: url('/fondo_login.png'); background-size: cover; background-color: darkcyan; height: 100vh; width: 100vw;">
    
    <div class="col-sm-12 col-md-12 col-xl-12 col-lg-12 col-12 text-end">
        <a href="/Login" class="btn btn-dark mx-5 mb-3" style="margin-top:1%;">Salir</a>
    </div>

    <div class="container-fluid">
        <div class="row ms-1 me-1 mt-3">
            <div class="col-xl-3 col-lg-3 col-3">
                
                <div class="px-2 py-2" style="background-color:grey; border: solid 1px black ;color:aliceblue; border-radius: 7%;">
                    <b>
                        <p id="name">Raphel Salcedo Gutierrez Naranja</p>
                        <p>Administrador</p>
                        <p id="client">Universidad del Norte</p>
                    </b>
                </div>

                <div style="background-color: white; color:black;" class="text-center mt-3 pt-3 mb-3 pb-3" ><!--HOlAAAAAAAAAAAA-->
                    <p><b>Equipos actuales</b></p>
                    <p><b id="t_equipos">-</b> equipos en total</p>
                    <p><b id="e_inactive">-</b> equipos inactivo</p>
                    <p><b id="inactive_pieza">-</b> equipos por algun motivo</p>
                </div>
                
                <button class="btn btn-danger col-12" data-bs-toggle="modal" data-bs-target="#perfilModal" on:click={perfil()}>Editar perfil</button>
            </div>
            
            <div class="col-xl-9 col-lg-9 col-9" style="margin-top:-2%;">
                <div id="tablita">
                    <div class="container">
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
                                    class="min-w-full bg-white border border-gray-300" style="width:100%; font-size: 13px;"
                                    id="myinventario"
                                >
                                    <thead>
                                        <tr>
                                            <th class="px-3 py-2 border">Nombre</th>
                                            <th class="px-3 py-2 border">Inventario</th>
                                            <th class="px-3 py-2 border">Ubicacion</th>
                                            <th class="px-3 py-2 border">Sede</th>
                                            <th class="px-3 py-2 border">Estado</th>
                                            <th class="px-3 py-2 border">Descripcion de estado</th>
                                            <th class="px-3 py-2 border">Opciones</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {#each todos_inventario as todos_inventario}
                                            <tr class="hover:bg-gray-50">
                                                <td class="px-4 py-2 border"
                                                    >{todos_inventario.nombre}</td
                                                >

                                                <td class="px-4 py-2 border"
                                                    >{todos_inventario.inventario}</td
                                                >

                                                <td class="px-4 py-2 border"
                                                    >{todos_inventario.ubicacion}</td
                                            >

                                                <td class="px-4 py-2 border"
                                                    >{todos_inventario.sede}</td
                                            >

                                                <td class="px-4 py-2 border">
                                                    <span style="color: {todos_inventario.estado ? 'green' : 'red'};">
                                                        {todos_inventario.estado ? "Activo" : "Inactivo"}
                                                    </span>
                                                </td>


                                                {#if todos_inventario.estado==0}
                                                <td class="px-4 py-2 border"
                                                >{todos_inventario.desc_estado}</td>
                                                
                                                {:else if todos_inventario.estado==1}
                                                <td class="px-4 py-2 border"></td>
                                                {:else}
                                                <td class="px-4 py-2 border"></td>
                                                {/if}

                                                <td class="px-4 py-2 border">
                                                    <button class="btn btn-success"
                                                        on:click={()=>{(id_invt=todos_inventario.id)}} 
                                                        data-bs-toggle="modal" data-bs-target="#solicitar_os"
                                                        >Solicitar OS</button
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
            
            <!--<div class="col-xl-2 col-lg-2 col-2 text-center" >
                <p><b>Solicitar Os</b></p>
                <button class="btn btn-danger">Solicitar</button>
            </div>
            -->
        </div>
    </div>
</div>


<div class="modal fade" id="solicitar_os" tabindex="-1" aria-labelledby="rModalLabel" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="mleModalLabel">
                   <p>Solicitud de orden de servicio</p>
                </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div class="modal-body">
                    <label for="">Motivo de la solicitud:</label>
                    <input type="text" id="desc" class="form-control">
            </div>
            <div class="modal-footer">
                <button class="btn btn-info" on:click={solicitar}>Solicitar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="perfilModal" tabindex="-1" aria-labelledby="perfilModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="perfilModalLabel">Editando perfil</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="mb-3">
                        <label for="nombres" class="form-label"><b>Nombre:</b></label>
                        <input type="text" class="form-control" id="nombres" placeholder="Nombres" maxlength="100">
                    </div>
                    <div class="mb-3">
                        <label for="correo" class="form-label"><b>Correo:</b></label>
                        <input type="email" class="form-control" id="correo" placeholder="Email">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label"><b>Password:</b></label>
                        <input type="text" class="form-control" id="password" placeholder="Contraseña">
                    </div>
                    <div class="mb-3">
                        <label for="jefe_de_uso" class="form-label"><b>Jefe de uso:</b></label>
                        <input type="text" class="form-control" id="jefe_de_uso" placeholder="Nombres" maxlength="50">
                    </div>
                    <div class="mb-3">
                        <label for="telefono" class="form-label"><b>Teléfono:</b></label>
                        <input type="text" class="form-control" id="telefono" placeholder="Teléfono">
                    </div>
                    <div class="mb-3">
                        <label for="ciudad" class="form-label"><b>Ciudad:</b></label>
                        <input type="text" class="form-control" id="ciudad" placeholder="Ciudad">
                    </div>
                    <div class="mb-3">
                        <label for="direccion" class="form-label"><b>Dirección:</b></label>
                        <input type="text" class="form-control" id="direccion" placeholder="Dirección">
                    </div>
                    <div class="mb-3">
                        <label for="nit" class="form-label"><b>NIT:</b></label>
                        <input type="text" class="form-control" id="nit" placeholder="NIT">
                    </div>
                    <p class="text-muted">¡Al terminar de editar, dale click en actualizar para guardar los cambios!</p>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-info"><b>Actualizar</b></button>
            </div>
        </div>
    </div>
</div>
