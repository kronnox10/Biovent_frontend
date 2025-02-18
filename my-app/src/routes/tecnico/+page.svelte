<script>
    import {onMount} from "svelte";
    let todos={}
    let loading=true;
    let error= null;
    let todos_clientes={}
    let v_id = 0;
    let v_os = 0;
    let activeElement="mostrar"
    let todos_inventario={}
    let todos_cronograma={}
    let todos_pendientes={}
    let loading_opciones=false
    
    onMount(async()=>{
        let miStorage = window.localStorage;
        let usuario = JSON.parse(miStorage.getItem("usuario"));
        v_id = usuario.id;
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
        }
        try {
            const response = await fetch("https://biovent-backend.onrender.com/get_clients");
            if (!response.ok) throw new Error("Error al cargar los datos");
            const data = await response.json();
            todos_clientes = data.resultado;
            
        } catch (e) {
            
        }
    })  

    /*async function perfil() {
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
    }*/

    async function inventario(vid_client, name_machine) {
        error = null;
        try { 
                const response = await fetch("https://biovent-backend.onrender.com/get_machine",{
                method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_usuario: vid_client,
                    }),
                });
                
                const data = await response.json();
                todos_inventario = data.resultado;
                document.getElementById('name_machine').innerHTML=name_machine


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

    async function os_oese() {
        let usuario = JSON.parse(localStorage.getItem("usuario"));
        let v_id_usuario=usuario.id


        try { 
            const response = await fetch("https://biovent-backend.onrender.com/get_ost",{
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

                if (data.resultado && data.resultado.length > 0) {
              
            }else {
               
            }
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        } 
    }

    async function os_oese_h() {
        let usuario = JSON.parse(localStorage.getItem("usuario"));
        let v_id_usuario=usuario.id

        try { 
            const response = await fetch("https://biovent-backend.onrender.com/get_osh",{
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
                console.log("verificando todoss de os_oese", todos)

                if (data.resultado && data.resultado.length > 0) {
              
            }else {
               
            }
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        } 
    }

    let v_opcion=""
    let dañoOpciones=false
    let loading_extra=false

    let id_os=""
    let id_de_la_maquina=""
    let id_del_dueño=""

   
    


    async function revisada_v(event) {
        loading_opciones=false
            console.log("Estado cambiado a:", event.target.value);
   
           setTimeout(() => {
               console.log("Estado procesado:", event.target.value);
           }, 200);

console.log(id_os+"maq:"+id_de_la_maquina+"maqdue:"+id_del_dueño )


    if(v_opcion==="solucionado"){
        dañoOpciones=false
            loading_extra=false 
    }else if(v_opcion==="noSolucionado"){
        loading_opciones=true
        loading_extra=false
    }else{
        dañoOpciones=false 
        loading_extra=true

    }

}


   
    async function revisada(id, maquina, dueño) {

         id_os=id
         id_de_la_maquina=maquina
         id_del_dueño=dueño
        console.log(id_os+"maq:"+id_de_la_maquina+"maqdue:"+id_del_dueño )
    }
        

    async function guardar_revisada() {
        console.log("v_opcion:", v_opcion);
        console.log("id_os:", id_os);
        console.log("id_de_la_maquina:", id_de_la_maquina);
        console.log("id_del_dueño:", id_del_dueño);

        try{
           
           console.log("yy opcion es", v_opcion)
           if(v_opcion==="solucionado"){
            dañoOpciones=false
            loading_extra=false
            let vdescripcion=document.getElementById("descripcionTrabajo").value;
                console.log("acacaa",vdescripcion)
                       const response = await fetch("https://biovent-backend.onrender.com/update_os",{
                        method: "POST",
                        headers:{
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            osupdate:{
                                id: id_os,
                                id_maquina: id_de_la_maquina,
                                estado_machine: 1,
                                estado: 0,
                            },
                            pendiente:{
                                id_os: id_os, 
                                id_maquina_p: id_de_la_maquina,
                                id_propietario:id_del_dueño,
                                descripcion: vdescripcion,
                                repuestos: "Ninguno",
                                estado_p: "Funcionando"
                            }
                        }),
                    });
                    console.log("HTTP Status:", response.status);
                    console.log("Response OK?", response.ok);
                    const data = await response.json();
                    console.log("Response Data:", data);
                   
                        Swal.fire({
                    title: "Información registrada",
                    text: "Los datos han sido guardados correctamente.",
                    icon: "success",
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false
                })
               location.reload();
                    



            }else if(v_opcion==="noSolucionado"){

                loading_opciones=true
                loading_extra=false

                if (dañoOpciones===true){
                  
                let v_desc_resp=document.getElementById("desc_resp").value;
                let vdescripcion=document.getElementById("descripcionTrabajo").value;
                console.log("acacaa",vdescripcion)
                console.log("descripcion del respuesto:",v_desc_resp)
              console.log(id_os+"maq:"+id_de_la_maquina+"maqdue:"+id_del_dueño )


                       const response = await fetch("https://biovent-backend.onrender.com/update_os",{

                        method: "POST",
                        headers:{
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            osupdate:{
                                id: id_os,
                                id_maquina: id_de_la_maquina,
                                estado_machine: 0,
                                estado: 1,
                            },
                            pendiente:{
                                id_os: id_os, 
                                id_maquina_p: id_de_la_maquina,
                                id_propietario:id_del_dueño,
                                descripcion: vdescripcion,
                                repuestos: v_desc_resp,
                                estado_p: "No funcionando"
                            }
                        }),
                    })

                Swal.fire({
                        title: "Repuesto solicitado correctamente 📦",
                        icon: "success",
                        timer: 3000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    });

                location.reload();
               

                }else{
               
                let vdescripcion=document.getElementById("descripcionTrabajo").value;
                console.log("acacaa",vdescripcion)
                 console.log(id_os+"maq:"+id_de_la_maquina+"maqdue:"+id_del_dueño )


                       const response = await fetch("https://biovent-backend.onrender.com/update_os",{

                        method: "POST",
                        headers:{
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            osupdate:{
                                id: id_os,
                                id_maquina: id_de_la_maquina,
                                estado_machine: 0,
                                estado: 0,
                            },
                            pendiente:{
                                id_os: id_os, 
                                id_maquina_p: id_de_la_maquina,
                                id_propietario:id_del_dueño,
                                descripcion: vdescripcion,
                                repuestos: "ninguno",
                                estado_p: "No funcionando"
                            }
                        }),
                    })

                    Swal.fire({
                    title: "Orden cerrada",
                    text: "El equipo se a dejado inactivo.",
                    icon: "info",
                    timer: 3000,
                    timerProgressBar: true
                });
               
                location.reload();
                }
                



            }else{
                dañoOpciones=false 
                console.log("entra al extra opciones")
                loading_extra=true

               let v_repuestS=document.getElementById('repuestoSolicitado').value;

                let vdescripcion=document.getElementById("descripcionTrabajo").value;
                console.log("acacaa",vdescripcion)
                console.log("acacaa",v_repuestS)

                 console.log(id_os+"maq:"+id_de_la_maquina+"maqdue:"+id_del_dueño )


                       const response = await fetch("https://biovent-backend.onrender.com/update_os",{

                        method: "POST",
                        headers:{
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            osupdate:{
                                id: id_os,
                                id_maquina: id_de_la_maquina,
                                estado_machine: 1,
                                estado: 1,
                            },
                            pendiente:{
                                id_os: id_os, 
                                id_maquina_p: id_de_la_maquina,
                                id_propietario:id_del_dueño,
                                descripcion: vdescripcion,
                                repuestos: v_repuestS,
                                estado_p: "Trabajando parcialmente"
                            }
                        }),
                    });
                    
                    Swal.fire({
                        title: "Repuesto solicitado correctamente 📦",
                        icon: "success",
                        timer: 3000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                location.reload();

            }
        }catch(e){
               error=e.message
                console.log(error)
            }  
         
      }

  


        //let v_opcion=document.getElementById("trabajando")
        /*let id_os=id
        let id_de_la_maquina=maquina
        let id_del_dueño=dueño
        let vdescripcion=""
        console.log(id_os+"maq:"+id_de_la_maquina+"maqdue:"+id_del_dueño )
       
        //-------------------------------------------------------------------------------------------------------------------------
            let result = await Swal.fire({
                title: "<strong>Trabajo realizado</strong>",
                input: "textarea",
                inputPlaceholder: "Describe el trabajo realizado...",
                showCloseButton: true,
                showDenyButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "Solucionado",
                denyButtonText: "No Solucionado ",
                cancelButtonText: "Trabajando Parcialmente ⚙️",
            });
            vdescripcion=result.value

            if (result.isConfirmed) {
                // ✅ Solucionado
                console.log("revisando solamente el result2", vdescripcion)
                Swal.fire({
                    title: "Información registrada",
                    text: "Los datos han sido guardados correctamente.",
                    icon: "success",
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false
                }).then(async() => {
                    
                    try{
                       const response = await fetch("https://biovent-backend.onrender.com/update_os_",{

                        method: "POST",
                        headers:{
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            osupdate:{
                                id: id_os,
                                id_maquina: id_de_la_maquina,
                                estado_machine: 1,
                                estado: 0,
                            },
                            pendiente:{
                                id_os: id_os, 
                                id_maquina_p: id_de_la_maquina,
                                id_propietario:id_del_dueño,
                                descripcion: vdescripcion,
                                repuestos: "Ninguno",
                                estado_p: "Funcionando"
                            }
                        }),
                    })

                    }catch(e){
                       error=e.message
                        console.log(error)
                    }


                  //  location.reload();
                });

            } else if (result.isDenied) {
                console.log("revisando solamente el result", result.value)
                // ❌ No Solucionado
                let opcionNoSolucionado = await Swal.fire({
                    title: "Selecciona una opción",
                    input: "radio",
                    inputOptions: {
                        repuesto: "Solicitar Repuesto ",
                        terminal: "Daño Terminal "
                    },
                    showCancelButton: true,
                    cancelButtonText: "Cancelar",
                    inputValidator: (value) => {
                        if (!value) {
                            return "Debes seleccionar una opción";
                        }
                    }
                });

            if (!opcionNoSolucionado.value) return;

            if (opcionNoSolucionado.value === "repuesto") {
             
                let repuestoSolicitado = await Swal.fire({
                    title: "Especifica el repuesto solicitado",
                    input: "textarea",
                    inputPlaceholder: "Describe el repuesto requerido...",
                   
                    showCancelButton: true
                });

                if (!repuestoSolicitado.value) return;

                    let repuestoDesc  = repuestoSolicitado.value
                    console.log("Repuesto ",repuestoDesc )
                    console.log("descripcion ",vdescripcion )

                        try{
                        const response = await fetch("https://biovent-backend.onrender.com/update_os_",{

                            method: "POST",
                            headers:{
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                osupdate:{
                                    id: id_os,
                                    id_maquina: id_de_la_maquina,
                                    estado_machine: 0,
                                    estado: 0,
                                },
                                pendiente:{
                                    id_os: id_os, 
                                    id_maquina_p: id_de_la_maquina,
                                    id_propietario:id_del_dueño,
                                    descripcion: vdescripcion,
                                    repuestos: repuestoDesc ,
                                    estado_p: "No funcionando"
                                }
                            }),
                        })
                      }catch(e){
                        error=e.message
                        console.log(error)
                      }

                    Swal.fire({
                        title: "Repuesto solicitado correctamente 📦",
                        icon: "success",
                        timer: 3000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    });

            } else if (opcionNoSolucionado.value === "terminal") {

                let descip = result.value
                    try{
                       const response = await fetch("https://biovent-backend.onrender.com/update_os_",{

                        method: "POST",
                        headers:{
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            osupdate:{
                                id: id_os,
                                id_maquina: id_de_la_maquina,
                                estado_machine: 0,
                                estado: 0,
                            },
                            pendiente:{
                                id_os: id_os, 
                                id_maquina_p: id_de_la_maquina,
                                id_propietario:id_del_dueño,
                                descripcion: vdescripcion,
                                repuestos: "Ninguno, se sugiere dar de baja el equipo",
                                estado_p: "No funcionando"
                            }
                        }),
                    })

                    }catch(e){
                       error=e.message
                        console.log(error)
                    }

                Swal.fire({
                    title: "Orden cerrada",
                    text: "El equipo se a dejado inactivo.",
                    icon: "info",
                    timer: 3000,
                    timerProgressBar: true
                });
            }

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // ⚙️ Trabajando Parcialmente
                let repuestos = await Swal.fire({
                    title: "Materiales/Repuestos solicitados",
                    input: "textarea",
                    inputPlaceholder: "Especifica los materiales necesarios...",
                    showCancelButton: true
                });

                if (!repuestos.value) return;

                Swal.fire({
                    title: "Equipo 'Trabajando Parcialmente' ⚙️",
                    icon: "info",
                    timer: 3000,
                    timerProgressBar: true
                });
            }*/
        
        // Escuchar la selección de los radios
     
    
    async function descargar_pdf(id) {
        try {
            console.log("",id)
            
            const response = await fetch("https://biovent-backend.onrender.com/pendientes_pdf", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    id: id })
            });

            const data = await response.json();
            const resultados = data.resultado;
            console.log("data de download pdf",data)

            if (!resultados.length) {
                alert("No hay datos disponibles.");
                return;
            }

            
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            const logoWidth = 30;  // Ancho de la imagen (en mm)
            const logoHeight = 25; // Alto de la imagen (en mm)
            doc.addImage("foto_logo__2_-removebg-preview.png", "PNG", 210-logoWidth-14, 10, logoWidth, logoHeight)
            
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.text("REPORTE DE TÉCNICO", 14, 50);

            
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(`Cliente: ${resultados[0].Dueño}`, 14, 60);
            doc.text(`Equipo: ${resultados[0].Maquina}`, 14, 65);
            doc.text(`Técnico a cargo: ${resultados[0].tecnico}`, 14,70);
            doc.text(`Estado de la máquina: ${resultados[0]["Estado de la maquina"]}`, 14, 75);

            // Trabajos Realizados
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text("Trabajos Realizados:", 14, 85);

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");

            // Dividir el texto en líneas si es muy largo
            let trabajos = doc.splitTextToSize(resultados[0].Descripcion, 180);
            doc.text(trabajos, 14, 90);

            //--------------------------------------------------------------------------
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text("Repuestos solicitados:", 14, 110);

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");

            // Dividir el texto en líneas si es muy largo
            let repuestos = doc.splitTextToSize(resultados[0].Repuestos, 180);
            doc.text(repuestos, 14, 125);

 
            // Guardar el archivo
            doc.save("Reporte_Tecnico.pdf");

        } catch (error) {
            console.error("Error generando PDF:", error);
        }
    }
    
    async function mostrar_pdf() {
        let usuario = JSON.parse(localStorage.getItem("usuario"));
        let v_id_usuario=usuario.id
        console.log("estamos aca",v_id_usuario)
        try { 
            const response = await fetch("https://biovent-backend.onrender.com/get_pendientes",{
            method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_usuario: v_id_usuario,
                }),
            });
                
            const data = await response.json();
            todos_pendientes = data.resultado;
            console.log("pasamos el try",todos_pendientes);
            v_os=todos_pendientes.id

            if (data.resultado && data.resultado.length > 0) {
            setTimeout(() => {
                globalThis.$("#mymp").DataTable(); 
            }, 0);
            }else {
                todos_pendientes = [];
                error = "No hay maquinas en el inventario de este cliente :(";
            }
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        } 

    }

    async function cronograma(vid_client) {
        try {
            loading=true;
            error=null;
            
            console.log(vid_client)    

            const response = await fetch("https://biovent-backend.onrender.com/getcronobyuser",{
            method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_usuario: vid_client,
                }),
            });
            
            
            const data = await response.json();
                if ( data!=null && data.resultado && data.resultado.length > 0) {
            todos_cronograma = data.resultado;

            console.log("todos_cronograma",todos_cronograma)

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


<div style="background-image: url('/fondo_login.png'); background-size: cover; background-color: darkcyan; height: 100vh; width: 100vw;" hidden={activeElement!=='mostrar'}>
    <div class="col-sm-12 col-md-12 col-xl-12 col-lg-12 col-12 text-end mb-5">
        <a href="/Login" class="btn btn-dark mx-5" style="margin-top:1%;">Salir</a>
    </div>
    
    <div class="container-fluid">
        <div class="row ms-1 me-1 mt-3">
            <div class="col-xl-3 col-lg-3 col-3">
                <div class="px-2 py-2" style="background-color:grey; border: solid 1px black ;color:aliceblue; border-radius: 2%;">
                    <b>
                        <p id="name"></p>
                        <p>Tecnico</p>
                        <p id="client"></p>
                    </b>
                </div>
                <button class="btn btn-danger mt-4 col-12" on:click={()=>{activeElement='oeses'; os_oese()}}>OS Activas</button>
                <button class="btn btn-danger mt-4 col-12" on:click={()=>{activeElement='oeses_h'; os_oese_h()}}>OS Realizadas</button>
                <button class="btn btn-danger mt-4 col-12"on:click={()=> {activeElement = 'pdf';mostrar_pdf()}}>Exportar trabajos</button>
            </div>
            
            <div class="col-xl-9 col-lg-9 col-9">
                <div class="container" style="margin-top: -4%;">
                    <div class="card-header text-center "><p>CLIENTES</p></div>
                        <div class="row">
                            {#each todos_clientes as cliente,i}
                                <div class="col-sm-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">{cliente.cliente}</h5>
                                            <p class="card-text" >{cliente.persona_acargo}</p>
                                            <p class="card-text" style="margin-top: -3%;">{cliente.telefono}</p>
                                            <p class="card-text" style="margin-top: -3%;">{cliente.direccion}</p>
                                            <p class="card-text"><b>Estado:</b><span class={cliente.estado? "text-success":"text-danger"}> {cliente.estado ? " Activo" : " Desactivo"}</span></p>

                                            <button class="btn btn-primary mx-1" on:click={()=> {activeElement = 'inventario'; inventario(cliente.id, cliente.cliente)}}>Inventario</button>
                                            <button class="btn btn-primary mx-2" on:click={()=> {activeElement = 'cronograma';cronograma(cliente.id)}}>Cronograma</button>
                                        </div>
                                    </div>
                                </div>
                            
                                {#if (i + 1) % 2 === 0 }<!-- 1%2=1   2%2=0   3%2=1   4%2=0-->
                                <div class="pt-1"> 
                                </div> 
                                {/if}
                            {/each}
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div hidden={activeElement!=='inventario'}>
    <div class="ms-2">
        <div class="mx-4 fs-1">
            <i class="fa fa-caret-left" aria-hidden="true" on:click={() => {activeElement = 'mostrar'}}></i>
        </div>
        <div class="container">
            <h2 class="my-4">Lista de maquinas del perfil <span id="name_machine"></span></h2>

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
                        id="myinventario"
                    >
                    <thead>
                        <tr>
                            <th class="px-3 py-2 border">Nombre</th>
                            <th class="px-3 py-2 border">Marca</th>
                            <th class="px-3 py-2 border">Modelo</th>
                            <th class="px-3 py-2 border">Serial</th>
                            <th class="px-3 py-2 border">Inventario</th>
                            <th class="px-3 py-2 border">Ubicacion</th>
                            <th class="px-3 py-2 border">Sede</th>
                            <th class="px-3 py-2 border">Estado</th>
                            <th class="px-3 py-2 border">Descripcion de estado</th>
                        </tr>
                    </thead>

                        <tbody>
                            {#each todos_inventario as todos_inventario}
                                <tr class="hover:bg-gray-50">
                                    <td class="px-4 py-2 border"
                                        >{todos_inventario.nombre}</td
                                    >
                                    <td class="px-4 py-2 border"
                                        >{todos_inventario.marca}</td
                                    >
                                    <td class="px-4 py-2 border"
                                        >{todos_inventario.modelo}</td
                                    >
                                    <td class="px-4 py-2 border"
                                        >{todos_inventario.serial}</td
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
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            {/if}
        </div>
    </div>
</div>

<div hidden={activeElement!=='cronograma'}>
    <div class="ms-2">
        <div class="container mt-4">
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
            <div class="card-body" style="">
                <div id="Mostrarusuario">
                    <div class="container py-4">
                        {#if loading}
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
                                <table
                                    class="min-w-full bg-white border border-gray-300" style="width:100%; font-size: 11px;"
                                    id="mycronos"
                                >
                                    <thead>
                                        <tr>
                                            <th class="px-2 py-2 border">Equipo</th>
                                            <th class="px-2 py-2 border">Enero</th>
                                            <th class="px-2 py-2 border">Febrero</th>
                                            <th class="px-2 py-2 border">Marzo</th>
                                            <th class="px-2 py-2 border">Abril</th>
                                            <th class="px-2 py-2 border">Mayo</th>
                                            <th class="px-2 py-2 border">Junio</th>
                                            <th class="px-2 py-2 border">Julio</th>
                                            <th class="px-2 py-2 border">Agosto</th>
                                            <th class="px-2 py-2 border">Septiembre</th>
                                            <th class="px-2 py-2 border">Octubre</th>
                                            <th class="px-2 py-2 border">Noviembre</th>
                                            <th class="px-2 py-2 border">Diciembre</th>
                                        </tr>
                                    </thead>
            
                                    <tbody>
                                        {#each todos_cronograma as todo}
                                            <tr class="hover:bg-gray-50">
                                                <td class="px-4 py-2 border"
                                                    >{todo.equipo}</td
                                                >
                                                <td class="px-4 py-2 border" style="background-color: {todo.enero ? 'green' : 'red'};">
                                                
                                                </td>
                                                <td class="px-4 py-2 border" style="background-color: {todo.febrero ? 'green' : 'red'};">
                                                    
                                                </td>
                                                <td class="px-4 py-2 border" style="background-color: {todo.marzo ? 'green' : 'red'};">
                                                    
                                                </td>
                                                <td class="px-4 py-2 border" style="background-color: {todo.abril ? 'green' : 'red'};">
                                                    
                                                </td>
                                                <td class="px-4 py-2 border" style="background-color: {todo.mayo ? 'green' : 'red'};">
                                                    
                                                </td>
                                                <td class="px-4 py-2 border" style="background-color: {todo.junio ? 'green' : 'red'};">
                                                    
                                                </td>
                                                <td class="px-4 py-2 border" style="background-color: {todo.julio ? 'green' : 'red'};">
                                                    
                                                </td>
                                                <td class="px-4 py-2 border" style="background-color: {todo.agosto ? 'green' : 'red'};">
                                                    
                                                </td>
                                                <td class="px-4 py-2 border" style="background-color: {todo.septiembre ? 'green' : 'red'};">
                                                    
                                                </td>
                                                <td class="px-4 py-2 border" style="background-color: {todo.octubre ? 'green' : 'red'};">
                                                    
                                                </td>
                                                <td class="px-4 py-2 border" style="background-color: {todo.noviembre ? 'green' : 'red'};">
                                                    
                                                </td>
                                                <td class="px-4 py-2 border" style="background-color: {todo.diciembre ? 'green' : 'red'};">
                                                    
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
</div>

<div hidden={activeElement!=='pdf'}>
    <div class="ms-2">
        <div class="container mt-4">
            <div class="card-header row g-2">
                <h5 class="card-title col-lg-11">
                    <b>Descargar PDF de los trabajos realizados</b>
                </h5>
                <button
                    class="btn btn-close col-lg-1"
                    aria-label="Cerrar edición de usuario"
                    on:click={() => {activeElement = 'mostrar'; cerrar()}}
                ></button>
            </div>
            <div class="card-body">
                <div id="Mostrarpdfs">
                    <div class="container mt-4">
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
                                    style="width:100%; font-size: 12px;"
                                    id="mymp"
                                >
                                <thead>
                                    <tr>
                                        <th class="px-3 py-2 border">Cliente</th>
                                        <th class="px-3 py-2 border">Maquina</th>
                                        <th class="px-3 py-2 border">Serial</th>
                                        <th class="px-3 py-2 border">Descripcion del daño</th>
                                        <th class="px-1 py-2 border">Estado del equipo</th>
                                        <th class="py-2 border">Opciones</th>
                                    </tr>
                                </thead>

                                    <tbody>
                                        {#each todos_pendientes as todos}
                                            <tr class="hover:bg-gray-50">
                                                <td class="px-2 py-2 border"
                                                    >{todos.usuario_cliente}</td
                                                >
                                                <td class="px-2 py-2 border"
                                                    >{todos.nombre_maquina}</td
                                                >
                                                <td class="px-2 py-2 border"
                                                    >{todos.serial}</td
                                                >
                                                <td class="px-2 py-2 border"
                                                    >{todos.descripcion}</td
                                                >
                                                <td class="px-2 py-2 border"
                                                    ><span style="color: {todos.estado ? 'green' : 'red'};">
                                                        {todos.estado ? "Activo" : "Inactivo"}
                                                    </span></td
                                                >
                                                <td class="py-2 border text-center">
                                                    <button
                                                    class="btn btn-success" on:click={()=>descargar_pdf(todos.id)}>Descargar</button>
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


<div hidden={activeElement!=='oeses'}>
    <div class="mx-4 fs-1">
        <i class="fa fa-caret-left" aria-hidden="true" on:click={() => {activeElement = 'mostrar'}}></i>
    </div>
    <div class="container">
        <div class="card-header text-center my-3"> <h4>OS</h4> </div>
        {#if todos && todos.length > 0}    
            <div class="row">
                {#each todos as Oses,i}
                    <div class="col-sm-12">
                        <div class="card my-3">
                            <div class="card-body">
                                <h5 class="card-title mb-2">{Oses.nombre_maquina}</h5>
                                <p class="card-text">Cliente: {Oses.usuario_cliente}</p>
                                <p class="card-text">Descripcion: {Oses.descripcion}</p>
                                <p class="card-text mb-2"><b>Estado:</b><span class={Oses.estado? "text-success":"text-danger"}> {Oses.estado ? " En tramite" : " Corregido"}</span></p>
                                <button class="btn btn-primary mx-1" data-bs-toggle="modal" data-bs-target="#revisadaModal" on:click={()=>revisada(Oses.id,Oses.maquina,Oses.dueño)}>Revisada</button>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <p class="text-center text-muted">No hay órdenes de servicio aqui.</p>
        {/if}
    </div>
</div>

<div hidden={activeElement!=='oeses_h'}>
    <div class="mx-4 fs-1">
        <i class="fa fa-caret-left" aria-hidden="true" on:click={() => {activeElement = 'mostrar'}}></i>
    </div>
    <div class="container">
        <div class="card-header text-center my-3"> <h4>OS Realizadas</h4> </div>
        {#if todos && todos.length > 0}
            <div class="row">
                {#each todos as readys,i}
                    <div class="col-sm-12">
                        <div class="card my-3">
                            <div class="card-body">
                                <h5 class="card-title mb-2">{readys.nombre_maquina}</h5>
                                <p class="card-text">Serial: {readys.serial}</p>
                                <p class="card-text">Cliente: {readys.usuario_cliente}</p>
                                <p class="card-text">Descripcion: {readys.descripcion}</p>
                                <p class="card-text mb-2"><b>Estado:</b><span class={readys.estado? "text-success":"text-danger"}> {readys.estado ? " En tramite" : " Corregido"}</span></p>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <p class="text-center text-muted">No hay órdenes de servicio realizadas.</p>
        {/if}
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="revisadaModal" tabindex="-1" aria-labelledby="revisadaModalLabel" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="revisadaModalLabel">Trabajo realizado</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <label for="descripcionTrabajo" class="form-label">Describe el trabajo realizado:</label>
                <textarea id="descripcionTrabajo" class="form-control" placeholder="Escribe aquí..." rows="3"></textarea>
        
                <hr>
                
                <!-- svelte-ignore a11y_label_has_associated_control-->
                 <!-- que es esto wtf de arriba -->
               
                <label class="form-label">Selecciona una opción:</label>
                <div class="form-check">
                <input class="form-check-input" type="radio" bind:group={v_opcion} on:change={revisada_v} name="estadoMaquina" id="solucionado" value="solucionado">
                <label class="form-check-label" for="solucionado">Solucionado</label>
                </div>
                <div class="form-check">
                <input class="form-check-input" type="radio"   bind:group={v_opcion}  on:change={revisada_v} name="estadoMaquina" id="noSolucionado" value="noSolucionado">
                <label class="form-check-label" for="noSolucionado">No Solucionado</label>
                </div>
                <div class="form-check">
                <input class="form-check-input" type="radio"  bind:group={v_opcion} on:change={revisada_v} name="estadoMaquina" id="trabajando" value="trabajando">
                <label class="form-check-label" for="trabajando">Trabajando Parcialmente</label>
                </div>
         
                
                <!-- Opciones adicionales -->
                 {#if loading_extra}
                    <div id="extraOptions" >
                     <label for="repuestoSolicitado" class="form-label">Especifica el repuesto solicitado:</label>
                     <textarea id="repuestoSolicitado" class="form-control" placeholder="Describe el repuesto..." rows="2"></textarea>
                    </div>
                {/if}

                {#if loading_opciones}
                <div id="dañoOpciones"><!--no solucionado-->
                <button id="solicitarRepuesto" class="btn btn-warning" on:click={()=>{dañoOpciones=true}}>Solicitar Repuesto</button>
                <button id="dañoTerminal" class="btn btn-danger" on:click={()=>{dañoOpciones=false; guardar_revisada()}}>Daño Terminal</button>
                </div>
                {/if}   
                {#if dañoOpciones}
                <label for="" class="mt-2">Ingrese el respuesto a solicitar</label>
                <textarea name="" id="desc_resp" class="form-control"></textarea>
                {/if}

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" id="guardarEstado" on:click={guardar_revisada}>Guardar</button>
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
        cursor: pointer;
    }
</style>



<!--


/* let result = await Swal.fire({
            title: "<strong>Trabajo realizado</strong>",
            input: "text",
            showCloseButton: true,
            showDenyButton: true,
            focusConfirm: false,
            confirmButtonText: `
            Solucionada
            `,
            confirmButtonAriaLabel: "Thumbs up, great!",
            denyButtonText: `
            A la proxima
            `,
            denyButtonAriaLabel: "Thumbs down"
        })

        if(result.isConfirmed){
            try{
                const response = await fetch("https://biovent-backend.onrender.com/update_os", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: id_os,
                    }),
                });
                

                if (!response.ok) throw new Error("Error 1 al actualizar la OS");

                Swal.fire({
                    title: "Marcando OS como realizada :D",
                    icon: "success",
                    timer: 3000, 
                    timerProgressBar: true,
                    showConfirmButton: false
                }).then(() => {
                    location.reload();
                });
                
            } catch (error) {
                Swal.fire("Error al actualizar la OS", "", "error");
            }
        } else if (result.isDenied) {
            Swal.fire("No solucionado... pendiente por nueva revision", "", "warning");
        }*/
-->