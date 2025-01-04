<script>
    import NavbarAdmin from "$lib/navbar_admin.svelte";
</script>

<div
    style="background-image: url('/fondo_login.png'); background-size: cover; background-color: darkcyan; height: 100vh; width: 100vw;"
>
<div class="col-sm-2 col-md-3 col-xl-3 col-lg-3 col-2">
    <a href="/Login" class="btn btn-dark mx-5" style="margin-top:5%; margin-bottom: -15%;">Salir</a>
</div>
    <div class="container">
        <div class="row">
            <div class="col-4" style="margin-top: 15rem">
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

            <div class="col-4"   style="margin-top: 15rem">
                <a href="#">
                    <img
                        src="/foto_logo__2_-removebg-preview.png"
                        alt=""
                        width="125"
                        height="80"
                    />
                </a>

                <div><p class="fs-2 text-white">Tecnico</p></div>
            </div>

            <div class="col-4" style="margin-top: 15rem">
                <a href="#">
                    <img
                        src="/foto_logo__2_-removebg-preview.png"
                        alt=""
                        width="125"
                        height="80"
                    />
                </a>

                <div><p class="fs-2 text-white">OS</p></div>
            </div>
        </div>
    </div>
</div>

<style>

    #cliente_si:hover {
        content: url('/admin_v/persona (1).png');
    }

</style>


