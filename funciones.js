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
