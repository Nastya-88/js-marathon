function showCountClicked(btn, count = 7) {
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
};
export default showCountClicked;