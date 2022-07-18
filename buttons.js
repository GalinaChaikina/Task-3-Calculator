import {display} from './display.js';

class DigitButton {

    constructor(value) {
        this.value = value;
        this.type = typeof this.value;
        this.init();
        this.selectValue();
    }

    init() {
        this.element = document.createElement('button');
        this.element.classList.add('buttonNum');
        this.element.value = this.value;
        this.element.innerHTML = this.value; 
    } 

    selectValue() {
        this.element.addEventListener('click', () => {
            if (this.type === 'number') {
                numbers = this.value;
                clickNumber(numbers); 
            }
            if ((this.value === '+') || (this.value === '-') || (this.value === '*') || (this.value === '/')) {
                operators = this.value;
                clickOperator(operators);
            }
            if (this.value === 'AC') {
                display.clear();
                memoryNewNumber = false;
                memoryCurrentNumber = 0;
                memoryOperator = '';
            }
            if (this.value === 'DEL') {
                clickDel(); 
            }
            if (this.value === '.') {
                clickTochka(); 
            }
            if (this.element.value === '=') {
                clickOperator(operators);
            }
            clickAudio();
        })
    }
}

//заполнение массива кнопок
const butCalculator = [];
const butMeaning = ['AC', 'DEL', '/', 1, 2, 3, '*', 4, 5, 6, '+', 7, 8, 9, '-', '.', 0, '='];

for (let i = 0; i < butMeaning.length; i+=1) {
    butCalculator[i] = new DigitButton(butMeaning[i]);
}

// калькулятор расчеты
let numbers;
let operators;

let memoryCurrentNumber = 0; // текущее значение числа
let memoryNewNumber = false; // новое значение числа (нет/да)
let memoryOperator = ''; // операция в памяти
   
function clickNumber(numbers) {
    if (memoryNewNumber) { 
        display.value = numbers;
        memoryNewNumber = false;  
    } else {
        if (display.value =='0') {
            display.value = String(numbers);
        } else {
            display.value += String(numbers);
        }
    }
    display.showValue();
}

function clickOperator(operators) {
    let globalNumber = display.value;
    if (memoryNewNumber && memoryOperator != '=') {
        display.value = memoryCurrentNumber;
    } else {
        memoryNewNumber = true;
        if (memoryOperator == '+') {
            memoryCurrentNumber += parseFloat(globalNumber);
        } else if (memoryOperator == '-') {
            memoryCurrentNumber -= parseFloat(globalNumber);
        } else if (memoryOperator == '*') {
            memoryCurrentNumber *= parseFloat(globalNumber);  
        } else if (memoryOperator == '/') {
            memoryCurrentNumber /= parseFloat(globalNumber);
        } else {
            memoryCurrentNumber = parseFloat(globalNumber);
            display.value = memoryCurrentNumber;
            memoryOperator = operators;
        }
    }
    display.value = memoryCurrentNumber;
    memoryOperator = operators;
    display.showOperator(operators);
    display.showValue();
}

function clickDel() {
    display.value = (String(display.value)).slice(0, -1);
    display.showValue();
}

function clickTochka() {
    let numberDisplay = display.value;
    if (memoryNewNumber) {
        numberDisplay = '0.';
        memoryNewNumber = false;
    } else {
        if (String(numberDisplay).indexOf('.') === -1) {
            numberDisplay += '.';
        }
    }
    display.value = numberDisplay;
    display.showValue();
}

function clickAudio () {
    const myAudio = new Audio('./knopka-zvuk.mp3');
    myAudio.paused ? myAudio.play() : myAudio.paused();
}

export {butCalculator}
