function numberToWords() {
    const inputNumber = document.getElementById("inputNumber").value;
    const outputWords = document.getElementById("outputWords");

    if (inputNumber === "") {
        outputWords.textContent = "Введите число";
        return;
    }

    const number = parseInt(inputNumber);

    if (isNaN(number) || number < 1 || number > 999) {
        outputWords.textContent = "Введите корректное число от 1 до 999";
        return;
    }

    if (number === 0) {
        outputWords.textContent = "ноль гривен";
        return;
    }

    const units = ["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"];
    const teens = ["десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"];
    const tens = ["", "", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"];
    const hundreds = ["", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот"];

    function convertUnits(num) {
        return units[num];
    }

    function convertTeens(num) {
        return teens[num - 10];
    }

    function convertTens(num) {
        if (num >= 10 && num < 20) {
            return convertTeens(num);
        }
        return tens[Math.floor(num / 10)];
    }

    function convertHundreds(num) {
        return hundreds[Math.floor(num / 100)];
    }

    function convertRest(num) {
        if (num === 0) return "";
        if (num < 10) return convertUnits(num);
        if (num < 20) return convertTeens(num);
        const restTens = convertTens(num);
        const restUnits = convertUnits(num % 10);
        return restTens + (restUnits ? ` ${restUnits}` : "");
    }

    let words = "";
    const numArray = number.toString().split("").map(Number);

    if (numArray.length === 1) {
        words = convertUnits(numArray[0]);
    } else if (numArray.length === 2) {
        words = convertRest(number);
    } else if (numArray.length === 3) {
        const restNumber = Number(numArray.slice(1).join(""));
        words = `${convertHundreds(numArray[0])} ${restNumber < 20 ? convertRest(restNumber) : convertRest(Number(numArray.slice(1).join("")))}`
    } else {
        words = "Превышен максимальный предел (999)";
    }

    outputWords.textContent = words + " гривен";
}

document.getElementById("inputNumber").addEventListener("input", numberToWords);
