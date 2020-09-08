import Pokemon from './pokemon.js';
import { renderPlayer, btnClicked, addLog } from './utils.js';

class Game {
    constructor(name) {
        this.name = name;
        this.$playground = document.querySelector('.playground');
        this.$header = document.querySelector('header');
        this.$pokemons = document.querySelectorAll('.pokemon');
        this.$startButton = document.createElement('button');
        this.$resetButton = document.createElement('button');

    }
    getPokemons = async () => {
        const responce = await fetch('https://reactmarathon-api.netlify.app/api/pokemons?random=true');
        const body = await responce.json();
        return body;
    };

    start = async () => {

        this.$playground.style.display = 'none';

        this.$startButton.textContent = 'Start Game';
        this.$startButton.classList.add('button', 'button-start');
        this.$header.appendChild(this.$startButton);
        this.$startButton.addEventListener('click', () => {
            this.playGame();
            this.$startButton.remove();
            console.log(this.$startButton);
        });


    }
    playGame = async () => {

        this.$playground.style.display = 'flex';
        const pokemon1 = await this.getPokemons();
        const pokemon2 = await this.getPokemons();

        const player1 = new Pokemon({
            ...pokemon1,
            selectors: 'player1',
        });

        const player2 = new Pokemon({
            ...pokemon2,
            selectors: 'player2',
        });
        console.log(player1);
        console.log(player2);

        renderPlayer(player1, player2);
        player1.attacks.forEach(attack => btnClicked(attack, player1, player2));

    };
    endGame = (log) => {
        const allButtons = document.querySelectorAll('.control .button');
        allButtons.forEach($item => $item.remove());
        log.textContent = '';
        game.playGame();
    };

};

export const game = new Game();
game.start();