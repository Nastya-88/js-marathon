import Pokemon from './pokemon.js';
import random from './random.js';
import showCountClicked from './showCountClicked.js';

const player1 = new Pokemon({
    name: 'Pikachu',
    type: 'electric',
    weakness: ['fighting', 'water'],
    resistance: ['steel'],
    defaultHP: 500,
    damageHP: 500,
    selectors: 'character'
});


const player2 = new Pokemon({
    name: 'Charmander',
    type: 'fire',
    weakness: ['fighting', 'water'],
    resistance: ['steel'],
    defaultHP: 400,
    damageHP: 400,
    selectors: 'enemy'
});
console.log(player1);
console.log(player2);

const $btn = $getElById('btn-kick');
const $btnFang = $getElById('btn-fang');

function $getElById(id) {
    return document.getElementById(id);
};

$btn.addEventListener('click', function () {
    btnCountJolt();
    player1.changeHP(random(10), function (count) {
        console.log(count);
        generateLog(player1, player2, count);

    });

    player2.changeHP(random(20), function (count) {
        console.log(count);
        generateLog(player1, player2, count);
    });
});
$btnFang.addEventListener('click', function () {
    btnCountElectro();
    player1.changeHP(random(10), function (count) {

        console.log(count);
        generateLog(player1, player2, count);

    });
    player2.changeHP(random(20), function (count) {
        console.log(count);
        generateLog(player1, player2, count);
    });
});
const btnCountJolt = showCountClicked($btn, 8);
const btnCountElectro = showCountClicked($btnFang, 11);

export function generateLog({ name, damageHP, defaultHP } = player1, { name: secondName } = player2, count) {
    const logs = [
        `${name} вспомнил что-то важное, но неожиданно ${secondName}, не помня себя от испуга, ударил в предплечье врага.  -${count} [${damageHP}/${defaultHP}]`,
        `${name}  поперхнулся, и за это ${secondName} с испугу приложил прямой удар коленом в лоб врага. -${count}[${damageHP}/${defaultHP}]`,
        `${name}  забылся, но в это время наглый ${secondName}, приняв волевое решение, неслышно подойдя сзади, ударил. -${count}[${damageHP}/${defaultHP}]`,
        `${name}  пришел в себя, но неожиданно ${secondName} случайно нанес мощнейший удар. -${count}[${damageHP}/${defaultHP}]`,
        `${name}  поперхнулся, но в это время ${secondName} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${count}[${damageHP}/${defaultHP}]`,
        `${name}  удивился, а ${secondName} пошатнувшись влепил подлый удар. -${count}[${damageHP}/${defaultHP}]`,
        `${name}  высморкался, но неожиданно ${secondName} провел дробящий удар. -${count}[${damageHP}/${defaultHP}]`,
        `${name}  пошатнулся, и внезапно наглый ${secondName} беспричинно ударил в ногу противника. -${count}[${damageHP}/${defaultHP}]`,
        `${name}  расстроился, как вдруг, неожиданно ${secondName} случайно влепил стопой в живот соперника. -${count}[${damageHP}/${defaultHP}]`,
        `${name}  пытался что-то сказать, но вдруг, неожиданно ${secondName} со скуки, разбил бровь сопернику. -${count}[${damageHP}/${defaultHP}]`
    ];

    return logs[random(logs.length) - 1];
};



