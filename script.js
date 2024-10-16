const calcBtns = document.querySelectorAll("button"); 
const opBtns = document.querySelectorAll(".operator");
const screenText = document.querySelector(".screen");

let num1;
let num2;
let operator;
let currOpBtn;
let result;

let isWaitingForNum2 = false;
let hasCalculated = false;

const orange = "#FF9500";
const grey = "#333333cb";
const lightGrey = "rgba(201, 201, 201, 0.603)";
const midGrey = "rgb(170, 170, 170)";

addEventListener("keydown", event => {
    key = event.key;
    if (!isNaN(key)) {
        inputNumber(document.querySelector(`.number[data-value = "${key}"]`));
    } else if (key === ".") {
        inputDecimal(document.querySelector(".decimal"));
    } else if (key === "Escape") {
        clearScreen();
    }
});

calcBtns.forEach(btn => {
    btn.addEventListener("click", (event) => {
        switch(btn.className) {
            case "number":
                inputNumber(event.target);
                break;
            case "decimal":
                inputDecimal(event.target);
                break;
            case "operator":
                selectOperator(event.target);
                break;
            case "function clear":
                clearScreen();
                break;
            case "function plus-minus":
                invertSign();
                break;
            case "function percent":
                convertPercent();
                break;
            case "equals":
                selectEquals(event.target);
                break;
        }
    });
});

function inputNumber(numBtn) {
    buttonColorFlash(numBtn, grey, lightGrey);
    hasCalculated = false;
    const num = numBtn.textContent;
    if (isWaitingForNum2) {
        screenText.textContent = num;
        currOpBtn.style.backgroundColor = orange;
        currOpBtn.style.color = "white";
        isWaitingForNum2 = false;
    } else {
        screenText.textContent = screenText.textContent === "0" ? num : screenText.textContent + num;
    }
}

function inputDecimal(decimalBtn) {
    buttonColorFlash(decimalBtn, grey, lightGrey);
    if(!screenText.textContent.includes(".")) {
        screenText.textContent += ".";
    }
}

function selectOperator(opBtn) {
    currOpBtn = opBtn;
    opBtns.forEach (currBtn => {
        currBtn.style.backgroundColor = orange;
        currBtn.style.color = "white";
    });
    opBtn.style.backgroundColor = "white";
    opBtn.style.color = orange;
    isWaitingForNum2 = true;
    if(!hasCalculated) {
        if (num1 == undefined) { 
            // Allows for chained calculations.
            num1 = parseFloat(screenText.textContent);
         } else {
            num2 = parseFloat(screenText.textContent);
            result = Math.round(parseFloat(operate(operator, num1, num2)) * 100000) / 100000;
            num1 = result;
            screenText.textContent = result;
        }
        operator = opBtn.textContent;
        hasCalculated = true;
    } else {
        operator = opBtn.textContent;
    }
}

function clearScreen() {
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
    result = undefined; 
    hasCalculated = false;
    screenText.textContent = 0; 
    currOpBtn.style.backgroundColor = orange;
    currOpBtn.style.color = "white";
}

function convertPercent() { 
    screenText.textContent = parseFloat(screenText.textContent) / 100;
}

function invertSign() {
    screenText.textContent = parseFloat(screenText.textContent) * -1;
}

function selectEquals(equalBtn) {
    if(!hasCalculated) {
        hasCalculated = true;
        buttonColorFlash(equalBtn, orange, "white", "white", orange);
        num2 = parseFloat(screenText.textContent);
        result = Math.round(parseFloat(operate(operator, num1, num2)) * 100000) / 100000; // Rounds the results to 5 decimal places
        screenText.textContent = result;
        num1 = result; // Allows for chained calculations.
    }
}

function operate(op, a, b) {
    switch(op) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "×":
            return a * b;
        case "÷":
            if (b !== 0) {
                return a / b;
            } else {
                window.alert("Error: Division by 0 is not allowed.");
                return 0;
            }
    }
}

function buttonColorFlash(button, bgColor1, bgColor2, textColor1 = null, textColor2 = null) {
    button.style.backgroundColor = bgColor2;
    if (textColor1 && textColor2) {
        button.style.color = textColor2;
    }
    setTimeout(() => {
        button.style.backgroundColor = bgColor1; 
        if (textColor1 && textColor2) {
            button.style.color = textColor1;
        }
    }, 200);
}