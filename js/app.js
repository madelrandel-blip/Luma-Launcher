const contenido = document.getElementById("contenido");

function cargarInicio(){

    contenido.innerHTML = `
        <h1>Bienvenido a Luma Launcher</h1>

        <br>

        <p>
            Tu biblioteca retro moderna.
        </p>
    `;
}

document.querySelectorAll(".sidebar button")
.forEach(btn=>{

    btn.addEventListener("click",()=>{

        const pagina = btn.dataset.page;

        if(pagina==="inicio"){
            cargarInicio();
        }

    });

});

cargarInicio();