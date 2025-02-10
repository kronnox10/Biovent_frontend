<script>
   import { onMount } from "svelte";
    var v_id_usuario=0;
    let todos = {};
    let loading = true;
    let error = null;

    onMount(async () => {
        let usuario = JSON.parse(localStorage.getItem("usuario"));
        v_id_usuario=usuario.id

        const response = await fetch("https://biovent-backend.onrender.com/get_client",{
            method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: v_id_usuario,
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
    })

    async function editar_perfil() {   
        let vnombre=document.getElementById('nombres').value;
        let vcorreo=document.getElementById('correo').value
        let vpassword=document.getElementById('password').value
        let vjefe=document.getElementById('jefe_de_uso').value
        let vtelefono=document.getElementById('telefono').value
        let vciudad=document.getElementById('ciudad').value
        let vdireccion=document.getElementById('direccion').value
        let vnit=document.getElementById('nit').value
        
        try{
            const response = await fetch("https://biovent-backend.onrender.com/update_client", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: v_id_usuario,
                    cliente:vnombre,
                    correo:vcorreo,
                    usuario_l:"cinjoheva",
                    password:vpassword,
                    jefe_de_uso:vjefe,
                    telefono:vtelefono,
                    ciudad:vciudad,
                    direccion:vdireccion,
                    nic:vnit,
                    estado:1,
                }),
            });

            if (!response.ok) {
            throw new Error("Error en la actualización del usuario.");
            }
            Swal.fire({
                title: "Usuario Actualizado con exito",
                icon: "success",
                iconColor: "white",
                color: "white",
                showConfirmButton: false,
                background: "gray",
                timer: 2500
            });
        }catch (e) {
            error = e.message;
        } finally {
            loading = false;
            window.location.reload()
        }
    }

</script>

<div class="mx-4 fs-1">
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <a href="/administrador">
        <i class="fa fa-caret-left" aria-hidden="true"></i>
    </a>
</div>

<div class="container card border-dark shadow" id="perfil" style="">
    <div class="card-header row g-2">
        <h5 class="card-title col-lg-11 fs-3">
            <b>Editando perfil</b>
        </h5>
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
                <p class="card-text"><b>Jefe de uso:</b></p>
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
        </div>
    </div>
</div>