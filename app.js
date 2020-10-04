
const romaji_dict = {"0": "zero", "1": "ichi", "2": "ni", "3": "san", "4": "yon", "5": "go", "6": "roku", "7": "nana",
    "8": "hachi", "9": "kyuu", "10": "juu", "100": "hyaku", "1000": "sen", "10000": "man", "100000000": "oku",
    "300": "sanbyaku", "600": "roppyaku", "800": "happyaku", "3000": "sanzen", "8000":"hassen"};

const hiragana_dict = {"0": "ゼロ", "1": "いち", "2": "に", "3": "さん", "4": "よん", "5": "ご", "6": "ろく", "7": "なな", 
    "8": "はち", "9": "きゅう", "10": "じゅう", "100": "ひゃく", "1000": "せん", "10000": "まん", "100000000": "おく",
    "300": "さんびゃく", "600": "ろっぴゃく", "800": "はっぴゃく", "3000": "さんぜん", "8000":"はっせん" };

const numberToHiragana = (n = parseInt(n)) => {
    let textResult = "";

    if (n === 0) {
        hiragana_dict["0"];
    }

    while (n > 0) {
        const stringNumber = `${n}`;
        const unitOrder = Math.pow(10, stringNumber.length - 1);
        const digit = Math.floor(n / unitOrder);
        const largestDigit = digit * unitOrder;

        if (hiragana_dict[largestDigit] !== undefined) {
            textResult += hiragana_dict[largestDigit];
        } else {
            textResult += hiragana_dict[digit] + hiragana_dict[largestDigit / digit];
        }
    
        n -= largestDigit;
    }
    
    return textResult;
}

const isNumeric = (n) => {
    try {
        return !isNaN(parseInt(n));
    } catch {
        return true;
    }
}

let numeros = [];
const numeretesForm = $("#numeretes");

for (let i = 0 ; i < 10 ; i++) {
    const randomNumber = Math.floor(Math.random() * 1000);
    const inputDiv = $(`<div class="input-div"></div>`);

    inputDiv.append(`<label for="hiragana-${i}">${numberToHiragana(randomNumber)}</label>`);
    inputDiv.append(`<br>`);
    inputDiv.append(`<input name="hiragana-${i}" id="hiragana-${i}" maxlength=5 autocomplete="off" />`);
    inputDiv.append(`<br>`);
    inputDiv.append(`<br>`);

    numeretesForm.append(inputDiv);

    numeros[i] = randomNumber;
}

const showResults = () => {
    const inputDivs = $(".input-div");
    for (let i = 0; i < inputDivs.length ; i ++) {
        const currentInput = inputDivs[i];
        const correctValue = numeros[i];

        $(currentInput).find("span").remove();
        $(currentInput).append(`<span class="correction">Correcto: ${correctValue}</span>`);
    }
}

        
numeretesForm.append('<button type="submit" id="submitBtn">Aceptar</button>');
numeretesForm.append('<button id="resultsButton" onclick="showResults()">Ver resultados correctos</button>');

numeretesForm.submit((e) => {
    e.preventDefault();
    const inputDivs = $(".input-div");
    for (let i = 0; i < inputDivs.length ; i ++) {
        const currentInput = inputDivs[i];
        const userValue = $(currentInput).find("input").val();
        const correctValue = numeros[i];

        $(currentInput).removeClass("incorrect");
        $(currentInput).removeClass("correct");

        if (!isNumeric(userValue) || parseInt(userValue) !== correctValue) {
            $(currentInput).addClass("incorrect");
        } else {
            $(currentInput).addClass("correct");
        }
    }

})