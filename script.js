const numBtns = document.querySelectorAll(".num-button");
const opBtns = document.querySelectorAll(".operator-button");
const equalBtn = document.querySelector(".equals-button");
const clearBtn = document.querySelector(".clear-button");
const screenText = document.querySelector(".screen");
let displayValue = document.querySelector(".screen").textContent;
let num1;
let num2;
let operator;

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
        numBtn.addEventListener("click", (event) => {
            if(screenText.textContent !== "0") {
                screenText.textContent += numBtn.textContent; 
            } else {
                screenText.textContent = numBtn.textContent;
            }
            displayValue = document.querySelector(".screen").textContent;
        });
    });
}

function selectOperator() {
    opBtns.forEach(opBtn => {
        opBtn.addEventListener("click", (event) => {
            operator = event.target.textContent;
            if(num1 === undefined)
            {
                num1 = parseFloat(displayValue);
            }
            screenText.textContent = 0;
        }
    )});
}

function selectEquals() {
    equalBtn.addEventListener("click", (event) => {
        num2 = parseFloat(displayValue);
        screenText.textContent = operate(operator, num1, num2);
    });
}

function clear() {
    clearBtn.addEventListener("click", (event) => {
        num1 = undefined;
        num2 = undefined;
        operator = undefined;
        screenText.textContent = 0;
    });
}

selectNumber();
selectOperator();
selectEquals();
clear();