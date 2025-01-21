<script>


    let activateElement='OS_active';
    let loading=true;
    async function os_activas() {
    
     
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
        <button class="btn btn-info col-5" on:click={()=>{activateElement='OS_active';}}>Mostrar solo os activas</button>
        <button class="btn btn-info col-5" on:click={()=>{activateElement='OS_all'}}>Mostra todas las os</button>
    </div>

    <div hidden={activateElement!="OS_active"} class="container mt-5" id=pantalla>

        pantalla

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
        
        {/if}


    </div>

    <div hidden={activateElement!="OS_all"} class="container mt-5" id=pantalla2>
        pantalla2
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