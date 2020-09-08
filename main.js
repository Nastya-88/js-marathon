import Game from './game.js';
import { pokemons } from './pokemons.js';
import Pokemon from './pokemon.js';
import showCountClicked from './showCountClicked.js';
import { random } from './utils.js';

const start = new Game();
start.beginStart();

const pokemonRandom1 = pokemons[random(pokemons.length) - 1];
const pokemonRandom2 = pokemons[random(pokemons.length) - 1];

let player1 = new Pokemon({
    ...pokemonRandom1,
    selectors: 'player1'
});

let player2 = new Pokemon({
    ...pokemonRandom2,
    selectors: 'player2'
});

export function renderPlayer() {

    const $control = document.querySelector('.control');

    player1.attacks.forEach(item => {
        // console.log(item);
        const $btn = document.createElement('button');
        $btn.classList.add('button');
        $btn.innerText = item.name;
        const btnCount = showCountClicked($btn, item.maxCount);
        $btn.addEventListener('click', () => {
            console.log('click button', $btn.innerText);
            btnCount();
            player1.changeHP(random(item.maxCount), function (count) {
                generateLog(player1, player2, count);
            });
            player2.changeHP(random(item.maxCount), function (count) {
                generateLog(player2, player1, count);
            });
        })
        $control.appendChild($btn);
    });
}


export function generateLog({ name, hp: { current, total } } = player1, { name: secondName } = player2, count) {
    const logs = [
        `${name} вспомнил что-то важное, но неожиданно ${secondName}, не помня себя от испуга, ударил в предплечье врага.  -${count} [${current}/${total}]`,
        `${name}  поперхнулся, и за это ${secondName} с испугу приложил прямой удар коленом в лоб врага. -${count}[${current}/${total}]`,
        `${name}  забылся, но в это время наглый ${secondName}, приняв волевое решение, неслышно подойдя сзади, ударил. -${count}[${current}/${total}]`,
        `${name}  пришел в себя, но неожиданно ${secondName} случайно нанес мощнейший удар. -${count}[${current}/${total}]`,
        `${name}  поперхнулся, но в это время ${secondName} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${count}[${current}/${total}]`,
        `${name}  удивился, а ${secondName} пошатнувшись влепил подлый удар. -${count}[${current}/${total}]`,
        `${name}  высморкался, но неожиданно ${secondName} провел дробящий удар. -${count}[${current}/${total}]`,
        `${name}  пошатнулся, и внезапно наглый ${secondName} беспричинно ударил в ногу противника. -${count}[${current}/${total}]`,
        `${name}  расстроился, как вдруг, неожиданно ${secondName} случайно влепил стопой в живот соперника. -${count}[${current}/${total}]`,
        `${name}  пытался что-то сказать, но вдруг, неожиданно ${secondName} со скуки, разбил бровь сопернику. -${count}[${current}/${total}]`
    ];

    return logs[random(logs.length) - 1];
};



