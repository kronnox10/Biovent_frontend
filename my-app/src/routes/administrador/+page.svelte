<script>
    import NavbarAdmin from "$lib/navbar_admin.svelte";
    
</script>

<div
    style="background-image: url('/fondo_login.png'); background-size: cover; background-color: darkcyan; height: 100vh; width: 100vw;"
>
<div class="col-sm-12 col-md-12 col-xl-12 col-lg-12 col-12 text-end">
    <a href="/Login" class="btn btn-dark mx-5 mb-1" style="margin-top:1%;">Salir</a>
</div>
    <div class="container">
        <div class="row" style="margin-top: -6%;">
            <div class="col-3 text-center" style="margin-top: 15rem">
                <a href="/administrador/cliente">
                    <img
                        src="/admin_v/persona.png"
                        alt=""
                        width="125"
                        height="125"
                        id="cliente_si"
                    />
                </a>
                <div><p class="fs-2 text-white">Cliente</p></div>
            </div>

            <div class="col-3 text-center" style="margin-top: 15rem">
                <a href="/administrador/tecnico">
                    <img
                        src="/admin_v/tecnico.png"
                        alt=""
                        width="125"
                        height="125"
                        id="tecnico_si"
                    />
                </a>

                <div><p class="fs-2 text-white">Tecnico</p></div>
            </div>

            <div class="col-3 text-center" style="margin-top: 15rem">
                <a href="/administrador/os">
                    <img
                        src="/admin_v/os.png"
                        alt=""
                        width="125"
                        height="125"
                        id="os_si"
                    />
                </a>

                <div><p class="fs-2 text-white">OS</p></div>
            </div>

            <div class="col-3 text-center" style="margin-top: 15rem">
                <a href="/administrador/perfil">
                    <img
                        src="/admin_v/persona.png"
                        alt=""
                        width="125"
                        height="125"
                        id="cliente_si"
                    />
                </a>
                <div><p class="fs-2 text-white">Perfil</p></div>
            </div>
        </div>
    </div>
</div>

<style>

    #cliente_si:hover {
        content: url('/admin_v/persona (1).png');
    }

    #tecnico_si:hover {
        content: url('/admin_v/tecnico (1).png');
    }
    #os_si:hover {
        content: url('/admin_v/os (1).png');
    }

</style>


