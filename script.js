let numbers = document.querySelectorAll('.num');
let history = document.querySelector('.history');
let allClear = document.querySelector('.clear');
let point = document.querySelector('.point');
let operators = document.querySelectorAll('.operator');
let equal = document.querySelector('.equal');
let result = document.querySelector('.result');
let backspace = document.querySelector('.backspace');

let operator1 = '+'; 
let operator2 = '+'; 
let num1 = 0, num2 = 0;
backspace.disabled = true;

disableOperators();

backspace.addEventListener('click', () => {
    num2 = num2.slice(0, -1);
    history.textContent = history.textContent.slice(0, -1);
    console.log(num2);
})
operators.forEach(function(operator) {
    operator.addEventListener('click', () => {
        if (operator.value == '=') {
            backspace.disabled = true;
            enableOperators();
            disableNumbers();
            equal.disabled = true;
            operate(operator1);
            console.log(operator.value);
            point.disabled = true;
            console.log(num1);
            console.log(num2);
            operator1 = '+'; 
            operator2 = '+'; 
            return;
        } else {
            backspace.disabled = true;
            disableOperators();
            enableNumbers();
            operator2 = operator.value;
            console.log(operator.value);
            history.textContent += operator.value;
            point.disabled = false;
            operate(operator1);
            operator1 = operator2;
        }
    });
});

allClear.addEventListener('click', () => {
    history.textContent = '';
    num1 = 0;
    num2 = 0;
    result.textContent = '';
    point.disabled = false;
    operator1 = '+'; 
    operator2 = '+';
    enableNumbers();
    disableOperators();
});
numbers.forEach(function(num) {
    num.addEventListener('click', () => {
        enableOperators();
        backspace.disabled = false;
        if (num.value == '.') {
            point.disabled = true;
        }
        displayHistory(num.value);
        num2 += num.value;
        console.log(num2);
    });
});

function operate(perform) {
    if (perform == '+') {
        num1 = roundToThreeDecimalPlaces(parseFloat(num1) + parseFloat(num2));
        num2 = 0;
        console.log(num1);
        result.textContent = num1;
    } else if (perform == '-') {
        num1 = roundToThreeDecimalPlaces(parseFloat(num1) - parseFloat(num2));
        num2 = 0;
        console.log(num1);
        result.textContent = num1;
    } else if (perform == '*') {
        num1 = roundToThreeDecimalPlaces(parseFloat(num1) * parseFloat(num2));
        num2 = 0;
        console.log(num1);
        result.textContent = num1;
    } else if (perform == '/') {
        num1 = roundToThreeDecimalPlaces(parseFloat(num1) / parseFloat(num2));
        num2 = 0;
        console.log(num1);
        result.textContent = num1;
    }
}
function displayHistory(x) {
    history.textContent += x;
}

function enableOperators() {
    operators.forEach(function(operator) {
        operator.disabled = false;
    });
}

function disableOperators() {
    operators.forEach(function(operator) {
        operator.disabled = true;
    });
}
function disableNumbers() {
    numbers.forEach(function(num) {
        num.disabled = true;
    });
}

function enableNumbers() {
    numbers.forEach(function(num) {
        num.disabled = false;
    });
}

function roundToThreeDecimalPlaces(num) {
    return Math.round(num * 1000) / 1000;
}

