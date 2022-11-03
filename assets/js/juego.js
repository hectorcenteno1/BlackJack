/**
 * 2C = Two of Club
 * 2D = Two of Diaminds
 * 2H = Two of Hearts
 * 2S = Two of Spadess 
 */



const miModulo = (() => {

    'use strict';

    let deck = [];

    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];


    // Referencias del HTML

    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');


    
    const inicializarJuego = (numJugadores = 2 ) => {

            deck = crearDeck();

            puntosJugadores  = [];

            for (let i = 0 ; i < numJugadores ; i++) {
                puntosJugadores.push(0);
            }

            puntosHTML.forEach (elem => elem.innerText = 0  );
            divCartasJugadores.forEach (elem => elem.innerHTML = '');

            btnPedir.disabled = false;
            btnDetener.disabled = false;
    }

    // function shuffle1(array) {
    //     let currentIndex = array.length, temporaryValue, randomIndex;
      
    //     // Mientras queden elementos a mezclar...
    //     while (0 !== currentIndex) {
      
    //       // Seleccionar un elemento sin mezclar...
    //       randomIndex = Math.floor(Math.random() * currentIndex);
    //       currentIndex -= 1;
      
    //       // E intercambiarlo con el elemento actual
    //       temporaryValue = array[currentIndex];
    //       array[currentIndex] = array[randomIndex];
    //       array[randomIndex] = temporaryValue;
    //     }
      
    //     return array;
    //   }

    // esta funcion crea una nueva baraja
    
    const crearDeck = () => {

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }
        
        return  _.shuffle(deck); //devuelve una copia mezclada del array
    }

    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el Deck';
        }
        return  deck.pop();
    }

    // esta funciona se utiliza para obtner el valor de la carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);

        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;

    }

    // Turno: 0 = primer jugador y el ultimo es la computadora 
    const acumularPuntos = (carta , turno ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        
        return puntosJugadores[turno];

    }

    const crearCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
        
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        
        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gano :( ');
            } else if (puntosMinimos > 21) {
                alert('La computadora gana ');
            } else if (puntosComputadora > 21) {
                alert(' El Jugador Gana ');
            }
            else {
                alert('La computadora Gana');
            }

        }, 100);
    }

    const turnoComputadora = (puntosMinimos) => {
         

        let puntosComputadora = 0;

        do {

            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1); 
            console.log('puntosJugadores', puntosJugadores) ;
            console.log('puntosMinimos', puntosMinimos) ;
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    }

    //Eventos 

    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);


    });

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn('Lo siento , Perdiste!!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('21 puntos, Genial!! ');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }


    });

    btnNuevo.addEventListener('click', () => {

        inicializarJuego();

    });


    return {
        nuevoJuego: inicializarJuego
    };
})();
