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
                a = this.value;
                clickNumber(a); 
            }
            if ((this.value === '+') || (this.value === '-') || (this.value === '*') || (this.value === '/')) {
                b = this.value;
                clickOperator(b);
                console.log(`display.value ${display.value}, memoryCurrentNumber ${memoryCurrentNumber}, memoryOperator ${memoryOperator}, b ${b}, memoryNewNumber ${memoryNewNumber}`);
            }
            if (this.value === 'AC') {
                display.clear();
                memoryNewNumber = false;
                memoryCurrentNumber = 0;
                memoryOperator = '';
                console.log(`display.value ${display.value}, memoryCurrentNumber ${memoryCurrentNumber}, memoryOperator ${memoryOperator}, b ${b}, memoryNewNumber ${memoryNewNumber}`);
            }
            if (this.value === 'DEL') {
                clickDel(); 
                console.log(`display.value ${display.value}, memoryCurrentNumber ${memoryCurrentNumber}, memoryOperator ${memoryOperator}, b ${b}, memoryNewNumber ${memoryNewNumber}`);
            }
            if (this.value === '.') {
                clickTochka(); 
                console.log(`display.value ${display.value}, memoryCurrentNumber ${memoryCurrentNumber}, memoryOperator ${memoryOperator}, b ${b}, memoryNewNumber ${memoryNewNumber}`);
            }
            if (this.element.value === '=') {
                clickOperator(b);
            }
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
let a;
let b;

let memoryCurrentNumber = 0; // текущее значение числа
let memoryNewNumber = false; // новое значение числа (нет/да)
let memoryOperator = ''; // операция в памяти
   
function clickNumber(a) {
    if (memoryNewNumber) { 
        display.value = a;
        memoryNewNumber = false;  
    } else {
        if (display.value =='0') {
            display.value = String(a);
        } else {
            display.value += String(a);
        }
    }
    display.showValue();
}

function clickOperator(b) {
    let globalNumber = display.value;
    if (memoryNewNumber && memoryOperator != '=') {
        display.value = memoryCurrentNumber;
    } else {
        memoryOperator = b;
        memoryNewNumber = true;
        if (memoryOperator === '+') {
            memoryCurrentNumber += parseFloat(globalNumber);
        } else if (memoryOperator === '-') {
            memoryCurrentNumber -= parseFloat(globalNumber);
        } else if (memoryOperator === '*') {
            memoryCurrentNumber *= parseFloat(globalNumber);  
        } else if (memoryOperator === '/') {
            memoryCurrentNumber /= parseFloat(globalNumber);
        } else {
            memoryCurrentNumber = parseFloat(globalNumber);
            // memoryOperator = '';
            // display.value = memoryCurrentNumber;
        }
        display.value = memoryCurrentNumber;
    }
    display.showOperator(b);
    display.showValue();
    
    
    console.log(`display.value ${display.value}, memoryCurrentNumber ${memoryCurrentNumber}, memoryOperator ${memoryOperator}, b ${b}` );
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
        if (numberDisplay.indexOf('.') === -1)
        numberDisplay += '.';
    }
    display.value = numberDisplay;
    display.showValue();
    
}

export {butCalculator}
