(function () {

    function $getElById(id) {
        return document.getElementById(id);
    };

    const $btn = $getElById('btn-kick');
    const $btnFang = $getElById('btn-fang');
    const $logs = document.querySelector('#logs');

    const character = {
        name: 'Pikachu',
        type: 'electric',
        weakness: ['fighting', 'water'],
        resistance: ['steel'],
        defaultHP: 100,
        damageHP: 100,
        elHP: $getElById('health-character'),
        elProgressbar: $getElById('progressbar-character'),

        renderHP: renderHP,
        changeHP: changeHP,
        renderHPLife: renderHPLife,
        renderProgressBarHP: renderProgressBarHP,
    };

    const enemy = {
        name: 'Charmander',
        type: 'fire',
        weakness: ['fighting', 'water'],
        resistance: ['steel'],
        defaultHP: 100,
        damageHP: 100,

        elHP: $getElById('health-enemy'),
        elProgressbar: $getElById('progressbar-enemy'),

        renderHP: renderHP,
        changeHP: changeHP,
        renderHPLife: renderHPLife,
        renderProgressBarHP: renderProgressBarHP,
    };

    function renderHP() {
        this.renderHPLife();
        this.renderProgressBarHP();

    };

    function renderHPLife() {
        this.elHP.innerText = this.damageHP + " / " + this.defaultHP;
    };
    function renderProgressBarHP() {
        this.elProgressbar.style.width = this.damageHP + "%";

    };
    function changeHP(count, { damageHP, defaultHP } = character) {
        this.damageHP -= count;
        const log = this === enemy ? generateLog(this, character, count, damageHP, defaultHP) : generateLog(this, enemy, count, damageHP, defaultHP);

        const $p = document.createElement('p');
        $p.innerText = log;
        $logs.insertBefore($p, $logs.children[0]);


        if (this.damageHP <= 0) {
            this.damageHP = 0
            alert(`Бедный ${this.name} проиграл бой!`);
            $btn.disabled = true;
            $btnFang.disabled = true;
        }

        this.renderHP();
    };

    kikedClick($btn, 'click');
    kikedClick($btnFang, 'click');

    function kikedClick(button, event) {
        button.addEventListener(event, function () {
            character.changeHP(random(5));
            enemy.changeHP(random(10));
        })
    }

    function init() {
        console.log('Start game!');
        character.renderHP();
        enemy.renderHP();
    };

    function random(num) {
        return Math.ceil(Math.random() * num);
    };

    function generateLog({ name, damageHP, defaultHP } = character, { name: secondName } = enemy, count) {

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

    init();

})();
