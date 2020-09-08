import { pokemons } from './pokemons.js';
import { renderPlayer } from './main.js';



class Game {
    constructor(name) {
        this.name = name;
        this.$playground = document.querySelector('.playground');
        this.$header = document.querySelector('header');
        this.$pokemons = document.querySelectorAll('.pokemon');
        this.$startButton = document.createElement('button');
        this.$resetButton = document.createElement('button');

    }
    beginStart = () => {

        pokemons.forEach(item => {
            const { name, img } = item;
            const $character = document.createElement('div');
            $character.classList.add('pokemon');
            $character.innerHTML = `
                    <img src="${img}" class="sprite" />
                    <div class="details">
                        <h2 class="name">${name}</h2>
                    </div>
                `;

            $character.addEventListener('click', () => {
                this.startGame(name);
            })
        });


        this.$playground.style.opacity = 0;

        this.$startButton.textContent = 'Start Game';
        this.$startButton.classList.add('button', 'button-start');
        this.$header.appendChild(this.$startButton);
        this.$startButton.addEventListener('click', () => {
            this.startGame();
            this.$startButton.remove();
            console.log(this.$startButton);
        });

    }

    startGame = () => {
        this.$playground.style.opacity = 1;

        renderPlayer();
    };


}
export default Game;