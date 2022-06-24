//La primera carta seleccionada tiene que tener 
//exactamente 1 menor al numero de la 2 carta cliqueada
//y el color tiene que ser diferente

// const primeraCartaCliqueada = {
//     numero: 1,
//     color: "rojo",
//     tipo: "corazons"
// }

// const segundaCartaCliqueada = {
//     numero: 13,
//     color: "negro",
//     tipo: "trebol"
// }

// console.log(primeraCartaCliqueada.color == segundaCartaCliqueada.color)

//Constantes y tipos

let mazo = [];
let barajado = [];
let pilas = [];
let cartasServidas = [];
let cartasAComprobar = [];
let casas = [[], [], [], []];

const tipos = ["trebol", "diamante", "corazon", "espada"];
const colores = {
    corazon: "rojo",
    diamante: "rojo",
    espada: "negro",
    trebol: "negro",
};

//Elementos HTML

const botonEmpezarJuego = document.querySelector(".empezar");
const pilaInicial = document.querySelector("#pila-inicial");
const cartaMazo = document.querySelector(".carta-mazo");
const seleccionada = document.querySelector("#seleccionada");

//Funciones para crear el juego

const crearMazo = () => {
    mazo = [];
    for (let i = 1; i <= 13; i++) {
        for (let j = 0; j < tipos.length; j++) {
        const carta = {
            numero: i,
        tipo: tipos[j],
            color: colores[tipos[j]],
            estaDadaVuelta: true,
            img: `${i}_de_${tipos[j]}`,
          id: i * j,
        };
        mazo.push(carta);
        }
    }
};

const barajar = () => {
    barajado = mazo
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const servir = () => {
    //quitar una carta de barajado
    //agregarla a una pila
    //y repetir esto muchas veces
    pilas = [];
    for (let i = 1; i < 8; i++) {
        pilas.push([]);
        for (let j = 0; j < i; j++) {
        if (j === i - 1) {
            barajado[0].estaDadaVuelta = false;
        }
        pilas[i - 1].push(barajado[0]);
        barajado.shift();
        }
    }
    ponerCartasEnLaPilaInicial();
    ponerCartasEnLasPilas();
};


const ponerCartasEnLasPilas = () => {
    //agarrar las cartas en las pilas
    //construir a partir de ellas un elemento de html
    //agregarles la imagen correspondiente
    //y guardarlas en el elemento de html correspondiente

    for (let i = 0; i < pilas.length; i++) {
        const pila = document.querySelector(`#pila-${i}`);
        for (let j = 0; j < pilas[i].length; j++) {
            const carta = pilas[i][j]
            const cartaHTML = document.createElement("div")
            const imagen = document.createElement("img")
            imagen.src = carta.img
            cartaHTML.appendChild(imagen)
            pila.appendChild(cartaHTML)
        }
    }
}

const ponerCartasEnLasCasas = () => {
    for (let i = 0; i < casas.length; i++) {
        const div = document.querySelector(`#casa-${i}`);
        div.innerHTML = "";
        for (let j = 0; j < casas[i].length; j++) {
        const carta = crearCarta(casas[i][j]);
        carta.dataset.pila = null;
        carta.dataset.casa = `casa-${i}`;
        div.appendChild(carta);
        }
    }
}

const crearCarta = (carta) => {
    const cartaHTML = document.createElement("div");
    const imagen = document.createElement("img");
    imagen.src = `img/${carta.estaDadaVuelta ? "dorso" : carta.img}.png`;
    cartaHTML.dataset.numero = carta.numero;
    cartaHTML.dataset.tipo = carta.tipo;
    cartaHTML.dataset.color = carta.color;
    cartaHTML.dataset.id = carta.id;
    cartaHTML.dataset.img = carta.img;
    cartaHTML.dataset.pila = carta.pila || "barajado";
    cartaHTML.classList.add("carta");
    cartaHTML.appendChild(imagen);
    cartaHTML.onclick = (e) => {
        e.stopPropagation();
        comprobarClickEnCarta(cartaHTML);
    };
    return cartaHTML;
};


botonEmpezarJuego.onclick = () => {
    crearMazo()
    barajarMazo()
    servir()
    ponerCartasEnLasPilas()
}