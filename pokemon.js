import { generateLog, addLog } from './utils.js';

class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);

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

        this.renderHP();

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
    changeHP = (count, player, enemy) => {
        console.log('this count in changeHP: ', count);
        this.hp.current -= count;
        if (this.hp.current <= 0) {
            this.hp.current = 0;
            alert(`Бедный ${this.name} проиграл бой!`);

        }
        this.renderHP();
        const log = generateLog(this, count, player, enemy);
        addLog(log);


    }
}

export default Pokemon;