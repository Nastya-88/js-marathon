//first task
const firstRow = 'мама мыла раму';
const secondRow = 'собака друг человека';
let firstCounter;
let secondCounter;

function getRow(firstRow, secondRow) {

    for (let i = 0; i < firstRow.length; i++) {
        if (firstRow.charAt(i) != 'а') {
            continue;
        }
        firstCounter += firstRow.charAt(i);
    }

    for (let j = 0; j < secondRow.length; j++) {
        if (secondRow.charAt(j) != 'а') {
            continue;
        }
        secondCounter += firstRow.charAt(j);
    }

    if (firstCounter.length < secondCounter.length) {
        return secondRow;
    } else if (firstCounter.length > secondCounter.length) {
        return firstRow;
    }
};

console.log(getRow(firstRow, secondRow));

// second task

let phone = '+71234567890';

function formattedPhone(pnone) {
    var result = '';
    phone += '';
    for (let i = 0; i < pnone.length; i++) {
        if (i === 1) {
            result += pnone.charAt(i) + ' (';
        } else if (i === 4) {
            result += pnone.charAt(i) + ') ';
        } else if (i === 7 || i === 9) {
            result += pnone.charAt(i) + '-';
        } else {
            result += pnone[i];
        }
    }
    return result;
};

console.log(formattedPhone('+71234567890'));