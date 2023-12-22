const units = ["", "одна", "две", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"];
const units2 = ["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"];
const teens = ["десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"];
const tens = ["", "", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"];
const hundreds = ["", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот"];
const thousands = ["", "тысяча", "тысячи", "тысяч"];
const millions = ["", "миллион", "миллиона", "миллионов"];
const billions = ["", "миллиард", "миллиарда", "миллиардов"];

function CommaDot(numberString) {
    return /[,.]/.test(numberString);
}

function Hundreds(number, flag = false) {
    let words = '';
    words = words + hundreds[Math.floor(number / 100)] + ' ';
    number = number % 100;
    if (number >= 10 && number <= 19) {
        words = words + teens[number - 10] + ' ';
    } else {
        words = words + tens[Math.floor(number / 10)] + ' ' + (flag ? units2[number % 10] : units[number % 10]) + ' ';
    }
    return words.trim();
}

function numberToWords(number) {
    let grug = '';
    let inputNumber = parseInt(number);

    if (isNaN(inputNumber) || inputNumber < 0 || inputNumber > 999999999999 || CommaDot(number)) {
        return false;
    }
    if (inputNumber === 0) {
        return ['ноль', grug];
    }

    let words = '';
    words = convert(Math.floor(inputNumber / 1000000000), billions, true);
    inputNumber %= 1000000000;
    words += convert(Math.floor(inputNumber / 1000000), millions, true);
    inputNumber %= 1000000;
    words += convert(Math.floor(inputNumber / 1000), thousands);
    inputNumber %= 1000;
    words += Hundreds(inputNumber);

    const numb = inputNumber % 10;
    switch (true) {
        case (numb == 1 && (number<11 || number>14)):
            grug = ' гривна';
            break;
        case (numb >= 2 && numb <= 4 && (number<11 || number>14)):
            grug = ' гривни';
            break;
        case (numb >= 5 && numb <= 9 || numb == 0 || (number>=11 && number<=14)):
            grug = ' гривен';
            break;
    }
    return [words.trim(), grug];
}

function convert(number, suffixArray, flag = false) {
    if (number === 0) return '';
    let words = Hundreds(number, flag);
    let numb = number % 10; console.log(numb, number);

    switch (true) {
        case (numb == 1 && (number<11 || number>14)):
            words += ` ${suffixArray[1]} `;
            break;
        case (numb >= 2 && numb <= 4 && (number<11 || number>14)):
            words += ` ${suffixArray[2]} `;
            break;
        case (numb >= 5 && numb <= 9 || numb == 0 || (number>=11 && number<=14)):
            words += ` ${suffixArray[3]} `;
            break;
    }
    return words;
}

document.getElementById("inputNumber").addEventListener("input", function () {
    const inputValue = document.getElementById("inputNumber").value;

    if (inputValue.trim()) {
        const result = numberToWords(inputValue);

        if (result) {
            const [resultWords, resultGrug] = result;
            const finalResult = `${resultWords} ${resultGrug}`;

            document.getElementById("outputWords").textContent = finalResult;
        } else {
            document.getElementById("outputWords").textContent = "Слишком много";
        }
} else {
    document.getElementById("outputWords").textContent = "Введите число";
}
});



//////////////////////////////* OLD CODE *///////////////////////////////////


// function numberToWords() {
//     const inputNumber = document.getElementById("inputNumber").value;
//     const outputWords = document.getElementById("outputWords");

//     if (inputNumber === "") {
//         outputWords.textContent = "Введите число";
//         return;
//     }

//     const number = parseInt(inputNumber);

//     if (isNaN(number) || number < 1 || number > 999999999999) {
//         outputWords.textContent = "Введите корректное число от 1 до 999 999 999 999";
//         return;
//     }

//     const units = ["", "одна", "две", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"];
//     const teens = ["десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"];
//     const tens = ["", "", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"];
//     const hundreds = ["", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот"];
//     const thousands = ["", "тысяча", "миллион", "миллиард"];

//     function convert(num, idx) {
//         if (!num) return '';
//         let str = '';
//         if (num > 99) str += hundreds[Math.floor(num / 100)] + ' ';
//         if (num % 100 > 9 && num % 100 < 20) return str + teens[num % 10] + ' ' + thousands[idx] + ' ';
//         if (num % 100 > 9) str += tens[Math.floor((num % 100) / 10)] + ' ';
//         if (idx && num % 10 > 1 && num % 10 < 5) str += units[num % 10] + 'и' + ' ' + thousands[idx] + ' ';
//         if (idx && num % 10 > 1 && num % 10 < 5) str += units[num % 10] + '' + ' ' + thousands[idx] + ' ';
//         else str += units[num % 10] + ' ' + thousands[idx] + ' ';
//         return str;
//     }

//     function getCurrencyDeclension(num) {
//         const lastDigit = num % 10;
//         const lastTwoDigits = num % 100;
//         if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
//             return "гривен";
//         } else if (lastDigit === 1) {
//             return "гривна";
//         } else if (lastDigit >= 2 && lastDigit <= 4) {
//             return "гривны";
//         } else {
//             return "гривен";
//         }
//     }

//     let words = '';
//     let arr = [];
//     let tempNumber = number;
//     while (tempNumber > 0) {
//         arr.push(tempNumber % 1000);
//         tempNumber = Math.floor(tempNumber / 1000);
//     }
//     for (let i = arr.length - 1; i >= 0; i--) {
//         words += convert(arr[i], i) + ' ';
//     }

//     outputWords.textContent = words.trim() + " " + getCurrencyDeclension(number);
// }

// document.getElementById("inputNumber").addEventListener("input", numberToWords);
