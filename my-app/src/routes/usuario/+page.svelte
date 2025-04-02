<script>
    
    import {onMount} from "svelte";

    let todos={}
    let loading=true;
    let error= null;
    let todos_inventario=[]
    var id_invt=0
    var v_id=0
    let activate="mostrar"
    let todos_cronograma={}
    
    onMount(async()=>{
        let miStorage = window.localStorage;
        let usuario = JSON.parse(miStorage.getItem("usuario"));
        v_id = usuario.id;
        

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
                    console.log (todos_inventario)
                    
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
            
          let name= document.getElementById('name').innerHTML=todos[0].persona_acargo;
          let cliente= document.getElementById('client').innerHTML=todos[0].cliente;


        }catch(e){
        error= e.message;
        }finally{    
        }
    }      

    async function e_inactive() {
        try{

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
            let v_e_inactive_pieza= document.getElementById('inactive_pieza').innerHTML=todos;
    
        }catch(e){
            error= e.message;
        }finally{
            //loading=false;
            
        }
    }

    async function solicitar() {
        try{
            console.log("entra al solicitar que raro no?")

            console.log(id_invt)
            console.log(v_id)

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
            throw new Error("Error en la os.");
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

            if (!response.ok) {
            throw new Error("Error en la actualización de la maquina.");
            }
            Swal.fire({
                title: "Maquina apagada :c",
                icon: "error",
                showConfirmButton: false,
                timer: 2500
            });
           // window.location.reload()
        }catch(e){
            error=e.message
        } 
    }

    async function cronograma(id) {
        try {

            let usuario = JSON.parse(localStorage.getItem("usuario"));
            let v_id_usuario=usuario.id

            const response = await fetch("https://biovent-backend.onrender.com/getcronobyuser",{
            method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_usuario: v_id_usuario,
                }),
            });
            
            const data = await response.json();
                if ( data!=null && data.resultado && data.resultado.length > 0) {
            todos_cronograma = data.resultado;
            setTimeout(() => {
                globalThis.$("#mycronos").DataTable(); 
            }, 0);
            } else {
                todos_cronograma = [];
                error = "No hay ninguna cronograma registrado a este usuario";
            }
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        } 
    }


</script>



<div style="background-image: url(''); background-size: cover; height: 100vh; width: 100vw;">
    
    <div class="col-sm-12 col-md-12 col-xl-12 col-lg-12 col-12 text-end">
        <a href="/Login" class="btn btn-dark mx-5 mb-3" style="margin-top:1%;">Salir</a>
    </div>

    <div class="container-fluid" hidden={activate!='mostrar'}>
        <div class="row ms-1 me-1 mt-3" >

            <div class="col-xl-2 col-lg-2 col-2" style="">
                
                <div class="px-2 py-2" style="background-color:grey; color:aliceblue; padding-right: -5%;">
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
                    <p><b id="inactive_pieza">-</b> apagados por algun motivo</p>
                </div>
                
                <button class="btn btn-success px-5 mx-1" on:click={()=>{activate="cronograma"; cronograma()}}>Cronograma</button>
                
            </div>
            
            <div class="col-xl-10 col-lg-10 col-10" style="margin-top:-2%;">
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
                                            <th class="px-3 py-2 border">Serial</th>
                                            <th class="px-1 py-2 border">Ubicacion</th>
                                            <th class="px-3 py-2 border">Sede</th>
                                            <th class="px-3 py-2 border">Estado</th>
                                            <th class="px-3 py-2 border">Descripcion de estado</th>
                                            <th class="px-3 py-2 border">Opciones</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {#each todos_inventario as todos_inventario}
                                            <tr class="hover:bg-gray-50">
                                                <td class="px-3 py-1 border"
                                                    >{todos_inventario.nombre}</td
                                                >

                                                <td class="px-3 py-1 border"
                                                    >{todos_inventario.serial}</td
                                                >

                                                <td class="px-1 py-1 border"
                                                    >{todos_inventario.ubicacion}</td
                                            >

                                                <td class="px-3 py-1 border"
                                                    >{todos_inventario.sede}</td
                                            >

                                                <td class="px-3 py-1 border">
                                                    <span style="color: {todos_inventario.estado ? 'green' : 'red'};">
                                                        {todos_inventario.estado ? "Activo" : "Inactivo"}
                                                    </span>
                                                </td>


                                                {#if todos_inventario.estado==0}
                                                <td class="px-3 py-1 border"
                                                >{todos_inventario.desc_estado}</td>
                                                
                                                {:else if todos_inventario.estado==1}
                                                <td class="px-3 py-1 border"></td>
                                                {:else}
                                                <td class="px-3 py-1 border"></td>
                                                {/if}

                                                <td class="px-3 py-1 border">
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


    <div hidden={activate!=='cronograma'}>
        <div class="ms-2">
            <div class="container">
                <div class="card-header row g-2">
                    <h5 class="card-title col-lg-11">
                        <b>Cronograma</b>
                    </h5>
                    <button
                        class="btn btn-close col-lg-1"
                        aria-label="Cerrar edición de usuario"
                        on:click={() => {activate = 'mostrar'; cerrar()}}
                    ></button>
                </div>
                <div class="card-body" style="">
                    <div id="Mostrarusuario">
                        <div class="container py-4">
                            </div>
                                {#if loading}
                                <!---->
                                <div class="row g-2 justify-content-center mt-2">
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
                                    <table class="w-full border border-dark-300" style="background-color: #8db4e2; border: 2px black solid; width: 100%; font-size: 11px;" id="mycronos">
                                        <thead>
                                            <tr class="">
                                                <th class="text-center border border-dark" style="width: 30%;">EQUIPOS</th>
                                                <th class="text-center border border-dark" style="width: 15px; height: 5px">ENE</th>
                                                <th class="text-center border border-dark" style="width: 15px; height: 5px">FEB</th>
                                                <th class="text-center border border-dark" style="width: 15px; height: 5px">MAR</th>
                                                <th class="text-center border border-dark" style="width: 15px; height: 5px">ABR</th>
                                                <th class="text-center border border-dark" style="width: 13px; height: 5px">MAY</th>
                                                <th class="text-center border border-dark" style="width: 15px; height: 5px">JUN</th>
                                                <th class="text-center border border-dark" style="width: 15px; height: 5px">JUL</th>
                                                <th class="text-center border border-dark" style="width: 15px; height: 5px">AGO</th>
                                                <th class="text-center border border-dark" style="width: 15px; height: 5px">SEP</th> 
                                                <th class="text-center border border-dark" style="width: 15px; height: 5px">OCT</th>
                                                <th class="text-center border border-dark" style="width: 15px; height: 5px">NOV</th>
                                                <th class="text-center border border-dark" style="width: 15px; height: 5px">DIC</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {#each todos_cronograma as todo}
                                                <tr class="hover:bg-gray-50 border border-dark">
                                                    <td class="border border-dark" style="background-color: #c5d9f1 ; width: 30%;">{todo.equipo}</td>
                                                    <td class="border border-dark" style="background-color: {todo.enero ? '#336497' : '#c5d9f1'};"></td>
                                                    <td class="border border-dark" style="background-color: {todo.febrero ? '#336497' : '#c5d9f1'};"></td>
                                                    <td class="border border-dark" style="background-color: {todo.marzo ? '#336497' : '#c5d9f1'};"></td>
                                                    <td class="border border-dark" style="background-color: {todo.abril ? '#336497' : '#c5d9f1'};"></td>
                                                    <td class="border border-dark" style="background-color: {todo.mayo ? '#336497' : '#c5d9f1'};"></td>
                                                    <td class="border border-dark" style="background-color: {todo.junio ? '#336497' : '#c5d9f1'};"></td>
                                                    <td class="border border-dark" style="background-color: {todo.julio ? '#336497' : '#c5d9f1'};"></td>
                                                    <td class="border border-dark" style="background-color: {todo.agosto ? '#336497' : '#c5d9f1'};"></td>
                                                    <td class="border border-dark" style="background-color: {todo.septiembre ? '#336497' : '#c5d9f1'};"></td>
                                                    <td class="border border-dark" style="background-color: {todo.octubre ? '#336497' : '#c5d9f1'};"></td>
                                                    <td class="border border-dark" style="background-color: {todo.noviembre ? '#336497' : '#c5d9f1'};"></td>
                                                    <td class="border border-dark" style="background-color: {todo.diciembre ? '#336497' : '#c5d9f1'};"></td>
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
                <button class="btn btn-info" on:click={solicitar()}>Solicitar</button>
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
