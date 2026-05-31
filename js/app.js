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
.forEach(btn => {

    btn.addEventListener("click", () => {

        const pagina = btn.dataset.page;

        switch(pagina){

            case "inicio":
                cargarInicio();
                break;

            case "tienda":
                cargarTienda();
                break;

        }

    });

});

cargarInicio();

async function cargarTienda(){

    const respuesta = await fetch("data/juegos.json");
    const juegos = await respuesta.json();

    let html = `
        <h1>Tienda</h1>
        <br>
        <div class="games-grid">
    `;

    juegos.forEach(juego => {

        html += `
            <div class="game-card">

                <img src="${juego.portada}">

                <div class="game-info">

                    <h3>${juego.nombre}</h3>

                    <div class="game-price">
                        ${juego.precio} 🪙
                    </div>

                    <button onclick="canjearJuego(${juego.id})">
                        Canjear
                    </button>

                </div>

            </div>
        `;

    });

    html += "</div>";

    contenido.innerHTML = html;
}

let monedas = 1000;

function canjearJuego(id){

    alert("Canjeando juego ID: " + id);

}