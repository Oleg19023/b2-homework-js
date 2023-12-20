function numberToWords() {
    const inputNumber = document.getElementById("inputNumber").value;
    const outputWords = document.getElementById("outputWords");

    if (inputNumber === "") {
        outputWords.textContent = "Введите число";
        return;
    }

    const number = parseInt(inputNumber);

    if (isNaN(number) || number < 1 || number > 999999999999) {
        outputWords.textContent = "Введите корректное число от 1 до 999 999 999 999";
        return;
    }

    const units = ["", "одна", "две", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"];
    const teens = ["десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"];
    const tens = ["", "", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"];
    const hundreds = ["", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот"];
    const thousands = ["", "тысяча", "миллион", "миллиард"];

    function convert(num, idx) {
        if (!num) return '';
        let str = '';
        if (num > 99) str += hundreds[Math.floor(num / 100)] + ' ';
        if (num % 100 > 9 && num % 100 < 20) return str + teens[num % 10] + ' ' + thousands[idx] + ' ';
        if (num % 100 > 9) str += tens[Math.floor((num % 100) / 10)] + ' ';
        if (idx && num % 10 > 1 && num % 10 < 5) str += units[num % 10] + 'и' + ' ' + thousands[idx] + ' ';
        else str += units[num % 10] + ' ' + thousands[idx] + ' ';
        return str;
    }

    function getCurrencyDeclension(num) {
        const lastDigit = num % 10;
        const lastTwoDigits = num % 100;
        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
            return "гривен";
        } else if (lastDigit === 1) {
            return "гривна";
        } else if (lastDigit >= 2 && lastDigit <= 4) {
            return "гривны";
        } else {
            return "гривен";
        }
    }

    let words = '';
    let arr = [];
    let tempNumber = number;
    while (tempNumber > 0) {
        arr.push(tempNumber % 1000);
        tempNumber = Math.floor(tempNumber / 1000);
    }
    for (let i = arr.length - 1; i >= 0; i--) {
        words += convert(arr[i], i) + ' ';
    }

    outputWords.textContent = words.trim() + " " + getCurrencyDeclension(number);
}

document.getElementById("inputNumber").addEventListener("input", numberToWords);
