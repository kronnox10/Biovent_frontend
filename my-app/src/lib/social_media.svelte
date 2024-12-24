<div class="social-icons">
    <a href="https://www.facebook.com/p/BioVent-Ingenieria-Biomedica-100054220942221" class="facebook" target="_blank" aria-label="Icono de facebook"> 
        <i class="fab fa-facebook-f" id="facebook" style="font-size: 3em; color: white;"></i>
    </a>


    <a href="https://www.instagram.com/biovent.ingbiomedica/" class="instagram" target="_blank" aria-label="Icono de instagram">
        <i
            class="fab fa-instagram"
            id="instagram"
            style="font-size: 3em; color:white;"
        ></i>
    </a>

    <a href="https://www.whatsapp.com/" class="whatsapp" target="_blank" aria-label="Icono de whats">
        <i
            class="fab fa-whatsapp"
            id="whatsapp"
            style="font-size: 3em; color: #white;"
        ></i>
    </a>
</div>

<style>
    .social-icons {
        position: fixed;
        right: -2%;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1000;
    }

    .social-icons a {
        display: block;
        margin-bottom: 15px;
        padding: 15px;
        border: 3px solid black;
        border-radius: 50%;
        color: white;
        text-align: center;
        font-size: 12px;
        transition: all 0.5s ease; /* Añadir transición para suavizar el movimiento */
        position: relative;
    }

    .social-icons a.facebook {
        background-color: #127bbe;
    }
    .social-icons a.instagram {
        background-color: #127bbe;
    }

    .social-icons a.whatsapp {
        background-color: #127bbe;
    }
    
    .social-icons a:hover {
       transform: translateX(-22%); 
    }

    .social-icons a:hover {
        background-color: #000000; /* Change to a lighter color on hover */
    }

</style>