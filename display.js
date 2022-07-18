import {butCalculator} from './buttons.js';

class Display {
    constructor() {
        this.value = 0;
        this.operator = '';
        this.init();
    }

    init() {
        this.element = document.createElement('div');
        this.element.classList.add('conteinerResult');
        this.operatorElement = document.createElement('div');
        this.operatorElement.classList.add('resultOperation');
        this.valueElement = document.createElement('div');
        this.valueElement.classList.add('resultNumber');
        this.element.append(this.operatorElement, this.valueElement);
    }

    // меняет value и ShowValue(data)
    changeValue(numbers) {
        this.value = numbers;
        this.showValue();
    }
    
    // выводит значение number на экране
    showValue() {
        this.valueElement.innerHTML = display.value;
    }

    // отображает оператор на экране
    showOperator(operators) {
        this.operatorElement.innerHTML = operators;
    }

    // меняет значение на 0 и отображает на экране 0
    clear() {
        this.value = '0';
        this.operator = '';
        this.showValue(this.value);
        this.showOperator(this.operator);
    }
}

const display = new Display();
display.init();
display.changeValue(0);

const displayField = document.createElement('div');
displayField.append(display.element);
console.log(display);

export {display}