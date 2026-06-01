const contenido = document.getElementById("contenido");

let juegos = [];
let monedas = 1000;
let biblioteca = [];

async function cargarJuegos(){

    if(juegos.length > 0){
        return;
    }

    const respuesta = await fetch("data/juegos.json");
    juegos = await respuesta.json();

}

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
            case "biblioteca":
                cargarBiblioteca();
                break;
        }

    });

});

cargarInicio();

async function cargarTienda(){

    await cargarJuegos();

    let html = `
        <h1>Tienda</h1>
        <br>
        <div class="games-grid">
    `;

    juegos.forEach(juego => {

        html += `
            <div class="game-card">

                <img src="${obtenerPortada(juego)}">

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

async function cargarBiblioteca(){

    await cargarJuegos();

    let juegosBiblioteca =
        juegos.filter(j => biblioteca.includes(j.id));

    let html = `
        <h1>Mi Biblioteca</h1>
        <br>
        <div class="games-grid">
    `;

    juegosBiblioteca.forEach(juego => {

        html += `
            <div class="game-card">

                <img src="${obtenerPortada(juego)}">

                <div class="game-info">

                    <h3>${juego.nombre}</h3>

                    <button>
                        Jugar
                    </button>

                </div>

            </div>
        `;
    });

    html += "</div>";

    contenido.innerHTML = html;
}

function canjearJuego(id){

    const juego = juegos.find(j => j.id === id);

    if(!juego){
        return;
    }

    if(biblioteca.includes(id)){
        alert("Ya tienes este juego.");
        return;
    }

    if(monedas < juego.precio){
        alert("No tienes suficientes monedas.");
        return;
    }

    monedas -= juego.precio;

    biblioteca.push(id);

    document.getElementById("coins").textContent =
        `${monedas} 🪙`;

    alert(`${juego.nombre} agregado a tu biblioteca.`);
}

function obtenerPortada(juego){

    return `assets/covers/${juego.coverId}.jpg`;

}