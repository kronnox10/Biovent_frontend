<script>
    import { onMount } from "svelte";
    let todos_cronograma = {};
    let todos_cronograma_individual = {};
    let loading = true;
    let error = null;
    let activeElement = 'mostrar';
    var v_id_usuario=0;

    onMount(async () => {
        try {
            const response = await fetch("https://biovent-backend.onrender.com/gealls");
            if (!response.ok) throw new Error("Error al cargar los datos");
            const data = await response.json();
            todos_cronograma = data.resultado;
            console.log("todos",todos_cronograma)
            
            setTimeout(() => {
                globalThis.$("#myTable").DataTable(); // Para convertrlo en datatable :D
            }, 0);
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    });

   /* function cerrar() {
        location.reload()
    }*/

    async function cronograma_individual(id) {
        v_id_usuario=id
        console.log("id usuario" ,v_id_usuario)
        try {
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
            todos_cronograma_individual = data.resultado;
            console.log("todos",todos_cronograma_individual)

            setTimeout(() => {
                globalThis.$("#mycronos").DataTable({
                    ordering: false
                }); 
            }, 0);
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        } 
    }
    

</script>

    <div hidden={activeElement !== 'mostrar'} class=""  id="cronogramas" style="">
        <div class="mx-4 fs-1">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <a href="/administrador">
                <i class="fa fa-caret-left" aria-hidden="true"></i>
            </a>
        </div>
        
        <h2 class="mt-4 mx-5">Lista de usuarios</h2>
        <div id="Mostrarusuario">
            <div class="container py-4">
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
                        <table class="w-full border border-dark-300" style="background-color: #8db4e2; border: 2px black solid; width: 100%; font-size: 11px;" id="myTable">
                            <thead>
                                <tr class="">
                                    <th class="text-center border border-dark" style="width: 40%;">CLIENTES</th>
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
                                        <td class="border border-dark" on:click={()=>{activeElement="c";cronograma_individual(todo.id_usuario)}} style="background-color: #c5d9f1 ; width: 40%;">{todo.Cliente}</td>
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


    <div hidden={activeElement !== 'c'} class="card mt-5 mx-5 border-dark shadow" id="cronograma" style="">
        <div class="card-header row g-2">
            <h5 class="card-title col-lg-11">
                <b>Cronograma cliente</b>
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
                                        <th class="text-center border border-dark" style="width: 30%;">EQUPOS</th>
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
                                    {#each todos_cronograma_individual as todos}
                                        <tr class="hover:bg-gray-50 border border-dark">
                                            <td class="border border-dark" style="background-color: #c5d9f1 ; width: 30%;">{todos.equipo}</td>
                                            <td class="border border-dark" style="background-color: {todos.enero ? '#336497' : '#c5d9f1'};"></td>
                                            <td class="border border-dark" style="background-color: {todos.febrero ? '#336497' : '#c5d9f1'};"></td>
                                            <td class="border border-dark" style="background-color: {todos.marzo ? '#336497' : '#c5d9f1'};"></td>
                                            <td class="border border-dark" style="background-color: {todos.abril ? '#336497' : '#c5d9f1'};"></td>
                                            <td class="border border-dark" style="background-color: {todos.mayo ? '#336497' : '#c5d9f1'};"></td>
                                            <td class="border border-dark" style="background-color: {todos.junio ? '#336497' : '#c5d9f1'};"></td>
                                            <td class="border border-dark" style="background-color: {todos.julio ? '#336497' : '#c5d9f1'};"></td>
                                            <td class="border border-dark" style="background-color: {todos.agosto ? '#336497' : '#c5d9f1'};"></td>
                                            <td class="border border-dark" style="background-color: {todos.septiembre ? '#336497' : '#c5d9f1'};"></td>
                                            <td class="border border-dark" style="background-color: {todos.octubre ? '#336497' : '#c5d9f1'};"></td>
                                            <td class="border border-dark" style="background-color: {todos.noviembre ? '#336497' : '#c5d9f1'};"></td>
                                            <td class="border border-dark" style="background-color: {todos.diciembre ? '#336497' : '#c5d9f1'};"></td>
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

<style>
    .fa{
        color: black;
    }
    .fa:hover{
        cursor: pointer;
        color: gray;
    }
</style>