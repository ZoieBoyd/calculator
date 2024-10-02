const numBtns = document.querySelectorAll(".num-button");
const opBtns = document.querySelectorAll(".operator-button");
const funcBtns = document.querySelectorAll(".function-button");
const decimalBtn = document.querySelector(".decimal-button");
const equalBtn = document.querySelector(".equals-button");
const clearBtn = document.querySelector(".clear-button");
const plusMinusBtn = document.querySelector(".plus-minus-button")
const percentBtn = document.querySelector(".percent-button");
const screenText = document.querySelector(".screen");
let displayValue = document.querySelector(".screen").textContent;

let num1;
let num2;
let operator;
let operatorBtn;

let isWaitingForNum2 = false;

const orange = "#FF9500";
const grey = "#333333cb";
const lightGrey = "rgba(201, 201, 201, 0.603)";
const midGrey= "rgb(170, 170, 170)";

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(op, a, b) {
    switch(op) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "×":
            return multiply(a, b);
        case "÷":
            return divide(a, b);
    }
}

function selectNumber() {
    numBtns.forEach(numBtn => {
        numBtn.addEventListener("click", () => {
            const numValue = numBtn.textContent;
            buttonColorFlash(numBtn, grey, lightGrey);
            if (isWaitingForNum2) {
                screenText.textContent = numValue;
                isWaitingForNum2 = false;
                operatorBtn.style.backgroundColor = orange;
                operatorBtn.style.color = "white";

            } else {
                screenText.textContent = screenText.textContent === "0" ? numValue : screenText.textContent + numValue;
            }
            displayValue = screenText.textContent;
        });
    });
}

function selectDecimal() {
    decimalBtn.addEventListener("click", () => { 
        if (!displayValue.includes(".")){
            screenText.textContent += ".";
            displayValue = screenText.textContent;
        }
    })
}

function selectOperator() {
    opBtns.forEach(opBtn => {
        opBtn.addEventListener("click", (event) => {
            opBtns.forEach(opBtn => {
                opBtn.style.backgroundColor = orange;
                opBtn.style.color = "white";
            });
            operator = event.target.textContent;
            operatorBtn = event.target;
            event.target.style.backgroundColor = "white";
            event.target.style.color = orange;
            isWaitingForNum2 = true; 
            if (num1 === undefined || num1 && num2) {
                num1 = parseFloat(displayValue);
            } else {
                num2 = parseFloat(displayValue);
            }
        }
    )});
}

function selectEquals() {
    equalBtn.addEventListener("click", () => {
        buttonColorFlash(equalBtn, orange, "white", "white", orange);
        num2 = parseFloat(displayValue);
        screenText.textContent = operate(operator, num1, num2);
        displayValue = screenText.textContent;
        num1 = parseFloat(displayValue);
    });
}

function clear() {
    clearBtn.addEventListener("click", () => {
        num1 = undefined;
        num2 = undefined;
        operator = undefined;
        screenText.textContent = 0;
    });
}

function selectFuncBtn(){
    funcBtns.forEach(funcBtn => {
        funcBtn.addEventListener("click", () => {
            buttonColorFlash(funcBtn, midGrey, "white");
        });
    });
}

function selectPlusMinusBtn() {
    plusMinusBtn.addEventListener("click", () => {
        screenText.textContent =  parseFloat(screenText.textContent) * -1;
        displayValue = screenText.textContent; 
    });
}

function selectPercentBtn() {
    percentBtn.addEventListener("click", () => {
        screenText.textContent = parseFloat(screenText.textContent) / 100;
        displayValue = screenText.textContent;
    });
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

function init() {
    selectNumber();
    selectOperator();
    selectEquals();
    clear();
    selectFuncBtn();
    selectPlusMinusBtn();
    selectPercentBtn();
    selectDecimal();
}

init();