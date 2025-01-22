<script>
    /*
    import {OnMount} from "svelte";

    let todos={}
    let loading=true;
    let error= null;


    onMount(async()=>{
        try{//ruta para mostrar nombre(rafael) y el cliente (universidad del norte), equipos actuales...
            const response = await fetch("https://biovent-backend.onrender.com/");
            const data= await response.json();
            todos= data.resultado;

            let v_name= document.getElementById('name').innerHTML=todos.name;//algo asi
            let v_client= document.getElementById('client').innerHTML=todos.client;
            let v_t_equipos= document.getElementById('t_equipos').innerHTML=todos.t_equipos;
            let v_e_inactive= document.getElementById('e_inactive').innerHTML=todos.e_inactive;
            let v_inactive_pieza= document.getElementById('inactive_pieza').innerHTML=todos.inactive_pieza;

        }catch(e){
            error= e.message;
        }finally{
            loading=false;
        }

    })*/

</script>



<div style="background-image: url('/fondo_login.png'); background-size: cover; background-color: darkcyan; height: 100vh; width: 100vw;">
    
    <div class="col-sm-2 col-md-3 col-xl-3 col-lg-3 col-2">
        <a href="/Login" class="btn btn-dark mx-5 mb-2" style="margin-top:5%;">Salir</a>
    </div>

    <div class="container-fluid">
        <div class="row ms-1 me-1 mt-5">
            <div class="col-xl-3 col-lg-3 col-3">
                
                <div class="px-2 py-2" style="background-color:grey; border: solid 1px black ;color:aliceblue; border-radius: 7%;">
                    <b>
                        <p id="name">Raphel Salcedo Gutierrez Naranja</p>
                        <p>Administrador</p>
                        <p id="client">Universidad del Norte</p>
                    </b>
                </div>

                <div style="background-color: white; color:black; border-radius:7%;" class="text-center mt-3 pt-3" ><!--HOlAAAAAAAAAAAA-->

                    <p><b>Equipos actuales</b></p>
                    <p><b id="t_equipos">14</b> equipos en total</p>
                    <p><b id="e_inactive">3</b> equipos inactivo</p>
                    <p><b id="inactive_pieza">5</b> equipos inactivos por pieza faltante</p>

                </div>

                


            </div>
            
            <div class="col-xl-4 col-lg-4 col-4"  style="background-color: chocolate;">
                <p>Tabla_1</p>
                <p>Tabla_2</p>
                <p>Tabla_3</p>
                <button class="btn btn-danger ">ver todos los equipos</button>

                    
            </div>
            
            <div class="col-xl-4 col-lg-4 col-4 text-center" style="background-color    : darkred;">
                <p><b>Solicitar Os</b></p>
                <button class="btn btn-danger">Solicitar</button>
            </div>
        </div>
    </div>
</div>
