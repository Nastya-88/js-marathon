(function () {
    const $btn = document.getElementById('btn-kick');
    const $btnFang = document.getElementById('btn-fang');

    function renderHP() {
        this.elHP.innerText = this.damageHP + " / " + this.defaultHP;
        this.elProgressbar.style.width = this.damageHP + "%";

    };
    function changeHP(count) {
        if (this.damageHP < count) {
            this.damageHP = 0
            alert("Бедный " + this.name + " проиграл бой!");
            $btn.disabled = true;
            $btnFang.disabled = true;
        } else {
            this.damageHP -= count;
        }

        this.renderHP(this.name);
    };

    const character = {
        name: 'Pikachu',
        defaultHP: 100,
        damageHP: 100,
        elHP: document.getElementById('health-character'),
        elProgressbar: document.getElementById('progressbar-character'),

        renderHP: renderHP,
        changeHP: changeHP,
    };

    const enemy = {
        name: 'Charmander',
        defaultHP: 100,
        damageHP: 100,
        elHP: document.getElementById('health-enemy'),
        elProgressbar: document.getElementById('progressbar-enemy'),

        renderHP: renderHP,
        changeHP: changeHP,
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
    }

    init();
})();
