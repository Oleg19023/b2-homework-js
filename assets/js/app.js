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


    // const units = ["", "одна", "две", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"];
    // const units2 = ["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"];
    // const teens = ["десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"];
    // const tens = ["", "", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"];
    // const hundreds = ["", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот"];

    // const thousands = ["", "тысяча", "тысячи", "тысяч"];
    // const millions = ["", "миллион", "миллиона", "миллионов"];
    // const billions = ["", "миллиард", "миллиарда", "миллиардов"];


    function convert(num, idx) {
        if (!num) return '';
        let str = '';
        if (num > 99) str += hundreds[Math.floor(num / 100)] + ' ';
        if (num % 100 > 9 && num % 100 < 20) return str + teens[num % 10] + ' ' + thousands[idx] + ' ';
        if (num % 100 > 9) str += tens[Math.floor((num % 100) / 10)] + ' ';
        if (idx && num % 10 > 1 && num % 10 < 5) str += units[num % 10] + '' + ' ' + thousands[idx] + ' ';
        else str += units[num % 10] + ' ' + thousands[idx] + ' ';
        return str;
    }

    
    /* OPTION-1 */

    // function convert(num, idx) {
    //     if (!num) return '';
    //     let str = '';
    //     if (num > 99) str += hundreds[Math.floor(num / 100)] + ' ';
    //     if (num % 100 > 9 && num % 100 < 20) return str + teens[num % 10] + ' ' + (idx === 0 ? thousands[2] : idx === 1 ? millions[2] : billions[2]) + ' ';
    //     if (num % 100 > 9) str += tens[Math.floor((num % 100) / 10)] + ' ';
    //     if (idx === 0 && num % 10 > 1 && num % 10 < 5) str += units[num % 10] + ' ' + thousands[1] + ' ';
    //     else if (idx === 0) str += units[num % 10] + ' ' + thousands[num % 10 === 1 ? 0 : 2] + ' ';
    //     else str += units2[num % 10] + ' ' + (idx === 1 ? millions[num % 10 === 1 ? 0 : num % 10 > 1 && num % 10 < 5 ? 1 : 2] : billions[num % 10 === 1 ? 0 : num % 10 > 1 && num % 10 < 5 ? 1 : 2]) + ' ';
    //     return str;
    // }


    /* OPTION-2 */

    // function convert(num, idx) {
    //     if (!num) return '';
    //     let str = '';
    //     if (num > 99) str += hundreds[Math.floor(num / 100)] + ' ';
    //     if (num % 100 > 9 && num % 100 < 20) return str + teens[num % 10] + ' ' + (idx === 0 ? thousands[2] : idx === 1 ? millions[2] : billions[2]) + ' ';
    //     if (num % 100 > 9) str += tens[Math.floor((num % 100) / 10)] + ' ';
    //     switch (true) {
    //         case (num % 10 === 1):
    //             str += (idx === 0 ? units[num % 10] : units2[num % 10]) + ' ' + (idx === 0 ? thousands[0] : idx === 1 ? millions[0] : billions[0]) + ' ';
    //             break;
    //         case (num % 10 >= 2 && num % 10 <= 4):
    //             str += (idx === 0 ? units[num % 10] : units2[num % 10]) + ' ' + (idx === 0 ? thousands[1] : idx === 1 ? millions[1] : billions[1]) + ' ';
    //             break;
    //         default:
    //             str += (idx === 0 ? units[num % 10] : units2[num % 10]) + ' ' + (idx === 0 ? thousands[2] : idx === 1 ? millions[2] : billions[2]) + ' ';
    //     }
    //     return str;
    // }

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
