import { generateLog } from './main.js';

class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({ name, type, weakness, resistance, defaultHP, damageHP, selectors }) {
        super(selectors);

        this.name = name;
        this.type = type;
        this.weakness = weakness;
        this.resistance = resistance;
        this.defaultHP = defaultHP;
        this.damageHP = damageHP;
        this.renderHP();
    }
    renderHP = () => {
        this.renderHPLife();
        this.renderProgressBarHP();
    }

    renderHPLife = () => {
        this.elHP.innerText = this.damageHP + " / " + this.defaultHP;
    }
    renderProgressBarHP = () => {
        this.elProgressbar.style.width = (this.damageHP / (this.defaultHP / 100)) + "%";

    }
    changeHP = (count, cb, player1, player2) => {
        const log = this === player1 ? generateLog(this, player1, count) : generateLog(this, player2, count);
        const $p = document.createElement('p');
        $p.innerText = log;
        const $logs = document.querySelector('#logs');
        $logs.insertBefore($p, $logs.children[0]);
        this.damageHP -= count;
        if (this.damageHP <= 0) {
            this.damageHP = 0;
        }

        this.renderHP();
        cb && cb(count);
    }
    showCountClicked = (btn, count = 7) => {
        const innerText = btn.innerText;
        btn.innerText = `${innerText} Осталось ударов: ${count}`;

        return function () {
            count--;
            console.log(count);
            if (count === 0) {
                alert(`Количество ударов закончилось!`);
                btn.disabled = true;
            }
            btn.innerText = `${innerText} Осталось ударов: ${count}`;
            return count;
        }
    }
}

export default Pokemon;