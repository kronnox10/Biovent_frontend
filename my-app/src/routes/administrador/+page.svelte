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
            <div class="col" style="margin-top: 14rem">
                <a href="/administrador/cliente">
                    <img
                        src="/admin_v/persona.png"
                        alt=""
                        width="100"
                        height="100"
                        id="cliente_si"
                    />
                </a>
                <div><p class="fs-2">Cliente</p></div>
            </div>

            <div class="col me-3" style="margin-top: 14rem">
                <a href="/administrador/cronograma">
                    <img class="ms-5"
                        src="/admin_v/cronograma(1).png"
                        alt=""
                        width="100"
                        height="100"
                        id="cronograma_si"
                    />
                </a>
                <div><p class="fs-2">Cronogramas</p></div>
            </div>


            <div class="col ms-5" style="margin-top: 14rem">
                <a href="/administrador/tecnico">
                    <img
                        src="/admin_v/tecnico.png"
                        alt=""
                        width="100"
                        height="100"
                        id="tecnico_si"
                    />
                </a>

                <div><p class="fs-2">Tecnico</p></div>
            </div>

            <div class="col ms-3" style="margin-top: 14rem">
                <a href="/administrador/os">
                    <img
                        src="/admin_v/os.png"
                        alt=""
                        width="100"
                        height="100"
                        id="os_si"
                    />
                </a>

                <div><p class="fs-2 ms-4">OS</p></div>
            </div>

            <div class="col" style="margin-top: 14rem">
                <a href="/administrador/perfil">
                    <img
                        src="/admin_v/persona.png"
                        alt=""
                        width="100"
                        height="100"
                        id="cliente_si"
                    />
                </a>
                <div><p class="fs-2 ms-3">Perfil</p></div>
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
    #cronograma_si:hover {
        content: url('/admin_v/cronograma.png');
    }

    p {
        color: white;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0, 0, 0);
    }

</style>


