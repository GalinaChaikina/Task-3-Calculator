import {display} from './display.js';
import {butCalculator} from './buttons.js';

const conteiner = document.querySelector('body');
const conteinerMain = document.createElement('div');
conteinerMain.classList.add('conteinerMain');
conteiner.prepend(conteinerMain);

conteinerMain.append(display.element);
    
const conteinerCalculator = document.createElement('div');
conteinerCalculator.classList.add('conteinerCalculator');
conteinerMain.append(conteinerCalculator);

const butMeaning = ['AC', 'DEL', '/', 1, 2, 3, '*', 4, 5, 6, '+', 7, 8, 9, '-', '.', 0, '='];

for (let i = 0; i < butMeaning.length; i+=1) {
    conteinerCalculator.append(butCalculator[i].element);
}
