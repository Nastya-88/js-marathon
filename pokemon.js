import { generateLog } from './main.js';
import Game from './game.js';

class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
        this.elName = document.getElementById(`name-${name}`);
        this.elImg = document.getElementById(`img-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({ name, type, hp, selectors, attacks = [], img }) {
        super(selectors);

        this.name = name;
        this.type = type;
        this.hp = {
            current: hp,
            total: hp,
        }
        this.attacks = attacks;
        this.img = img;

        this.renderName();
        this.renderImg();
        this.renderHP();

    }
    renderName = () => {
        this.elName.innerText = this.name;
    }
    renderImg = () => {
        this.elImg.src = this.img;
    }

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressBarHP();
    }

    renderHPLife = () => {
        this.elHP.innerText = this.hp.current + " / " + this.hp.total;
    }
    renderProgressBarHP = () => {
        this.elProgressbar.style.width = (this.hp.current / (this.hp.total / 100)) + "%";
        if (this.hp.current < 60 && this.hp.current > 20) {
            this.elProgressbar.classList.add('low');
        } else if (this.hp.current < 20) {
            this.elProgressbar.classList.add('critical');
        }

    }
    changeHP = (count, cb, player1, player2) => {
        console.log('this count in changeHP: ', count);
        const log = this === player1 ? generateLog(this, player1, count) : generateLog(this, player2, count);
        const $p = document.createElement('p');
        $p.innerText = log;
        const $logs = document.querySelector('#logs');
        $logs.insertBefore($p, $logs.children[0]);
        this.hp.current -= count;
        if (this.hp.current <= 0) {
            this.hp.current = 0;
            alert(`Бедный ${this.name} проиграл бой!`);
            const allButtons = document.querySelectorAll('.control .button');
            allButtons.forEach($item => $item.remove());
            $logs.innerText = '';
            const begin = new Game();
            begin.beginStart();

        }

        this.renderHP();
        cb && cb(count);
    }

}

export default Pokemon;