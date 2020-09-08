import logs from './logs.js';
import { game } from './main.js';


export const random = (min, max) => Math.ceil(Math.random() * (max - min) + min);

export const addLog = (logStr) => {
    const $body = document.querySelector('.body');
    const $fitstLog = document.querySelector('p');
    const $secondLog = document.createElement('p');

    $secondLog.innerText = logStr;
    $body.insertBefore($secondLog, $fitstLog);

};

export const generateLog = (character, count, player1, player2) => {
    const logStr = character === player2 ? logs(character.name, player1.name) : logs(character.name, player2.name);
    return `${logStr[random(0, logStr.length - 1)]} - ${count} [${character.hp.current}/${character.hp.total}]`;
};

const disableButton = (button) => {
    let count = 0;

    return function (clickLimit) {
        count += 1;

        if (count >= clickLimit) {
            button.disabled = true
        };
        if (count === 0) {
            alert(`Количество ударов закончилось!`);
            button.disabled = true;
        }
    }
};

const damage = async () => {
    const getDamage = async () => {
        const responce = await fetch('https://reactmarathon-api.netlify.app/api/fight?player1id=25&attackId=1&player2id=1');
        const body = await responce.json();
        return body;
    };

    return await getDamage();
}

export const btnClicked = (attack, enemy, player) => {
    const $control = document.querySelector('.control');
    const $btn = document.createElement('button');
    $btn.classList.add('button');
    $btn.innerText = attack.name;

    const btnCount = disableButton($btn);
    $btn.addEventListener('click', async () => {
        const { kick } = await damage();

        btnCount(attack.maxCount);
        player.changeHP(kick.player1, player, enemy);
        enemy.changeHP(kick.player2, enemy, player);

        if (player.hp.current === 0) {
            game.endGame();
        } else if (enemy.hp.current === 0) {
            game.endGame();
        };


    })
    $control.appendChild($btn);
}

export const renderPlayer = (player1, player2) => {
    player1.renderHP();
    player2.renderHP();

    const $namePl1 = document.querySelector('#name-player1');
    $namePl1.innerText = player1.name;
    const $namePl2 = document.querySelector('#name-player2');
    $namePl2.innerText = player2.name;

    const $imgPl1 = document.querySelector('.player1 > img');
    $imgPl1.setAttribute('src', player1.img)
    const $imgPl2 = document.querySelector('.player2 > img');
    $imgPl2.setAttribute('src', player2.img)
}

