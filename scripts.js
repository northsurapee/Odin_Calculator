// DEFINE STATE
const DEFAULT       = 'DEFAULT'
const INT_NUM1      = 'INT_NUM1'
const FLOAT_NUM1    = 'FLOAT_NUM1'
const NUM2_NUM1     = 'NUM2_NUM1'
const INT_NUM2      = 'INT_NUM2'
const FLOAT_NUM2    = 'FLOAT_NUM2'
const SHOW          = 'SHOW'

// DEFINE GLOBAL VARIABLE
let num1            = ''
let num2            = ''
let result          = ''
let operation       = ''
let state           = DEFAULT

// CREATE REFERENCE VARIABLES
const btn0 = document.querySelector('#btn0');
const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btn3 = document.querySelector('#btn3');
const btn4 = document.querySelector('#btn4');
const btn5 = document.querySelector('#btn5');
const btn6 = document.querySelector('#btn6');
const btn7 = document.querySelector('#btn7');
const btn8 = document.querySelector('#btn8');
const btn9 = document.querySelector('#btn9');
const btnDot = document.querySelector('#btnDot');
const btnPlus = document.querySelector('#btnPlus');
const btnMinus = document.querySelector('#btnMinus');
const btnMultiply = document.querySelector('#btnMultiply');
const btnDivide = document.querySelector('#btnDivide');
const btnEqual = document.querySelector('#btnEqual');
const btnClear = document.querySelector('#btnClear');
const display = document.querySelector('#display')

// ADD EVENT LISTENER
btn0.addEventListener('click', () => stateTransition('0'))
btn1.addEventListener('click', () => stateTransition('1'))
btn2.addEventListener('click', () => stateTransition('2'))
btn3.addEventListener('click', () => stateTransition('3'))
btn4.addEventListener('click', () => stateTransition('4'))
btn5.addEventListener('click', () => stateTransition('5'))
btn6.addEventListener('click', () => stateTransition('6'))
btn7.addEventListener('click', () => stateTransition('7'))
btn8.addEventListener('click', () => stateTransition('8'))
btn9.addEventListener('click', () => stateTransition('9'))
btnDot.addEventListener('click', () => stateTransition('.'))
btnPlus.addEventListener('click', () => stateTransition('+'))
btnMinus.addEventListener('click', () => stateTransition('-'))
btnMultiply.addEventListener('click', () => stateTransition('×'))
btnDivide.addEventListener('click', () => stateTransition('÷'))
btnEqual.addEventListener('click', () => stateTransition('='))
btnClear.addEventListener('click', () => stateTransition('clear'))

// CALCULATOR LOGIC : implemented using state machine approach
function holdOperationButton(input) {
    // Clear what holding now
    btnPlus.style.backgroundColor = ''
    btnMinus.style.backgroundColor = ''
    btnMultiply.style.backgroundColor = ''
    btnDivide.style.backgroundColor = ''

    if(state === NUM2_NUM1 && ['+','-','×','÷'].includes(input)) {
        switch (input) {
            case '+':
                btnPlus.style.backgroundColor = 'var(--btn-blue)'
                break
            case '-':
                btnMinus.style.backgroundColor = 'var(--btn-blue)'
                break
            case '×':
                btnMultiply.style.backgroundColor = 'var(--btn-blue)'
                break
            case '÷':
                btnDivide.style.backgroundColor = 'var(--btn-blue)'
                break
        }
    }
}

// Show number on calculator display according to current state
function show() {
    if(state === DEFAULT) {
        display.textContent = '0'
        console.log("show default")
    } else if ([INT_NUM1, FLOAT_NUM1, NUM2_NUM1].includes(state)) {
        display.textContent = num1
    } else if ([INT_NUM2, FLOAT_NUM2].includes(state)) {
        display.textContent = num2
    } else if (state === SHOW) {
        display.textContent = result
    } else {
        console.log("not display anything")
    }
}

// See state machine for more understanding
function stateTransition(input) {
    if(input === 'clear') { // Asynchronous clear
        result = '0'
        num1 = '0'
        num2 = '0'
        state = DEFAULT
    } else if(state === DEFAULT && input.match(/\d/)) { // RegEx to check if input is string '0'-'9'
        num1 = input
        state = INT_NUM1
    } else if(state === DEFAULT && input === '.') { // RegEx to check if input is string '0'-'9'
        num1 = '0.'
        state = FLOAT_NUM1
    } else if(state === INT_NUM1 && input.match(/\d/)) {
        num1 += input
        state = INT_NUM1
    } else if((state === INT_NUM1 || state === DEFAULT) && input === '.') {
        num1 += input
        state = FLOAT_NUM1
    } else if(state === FLOAT_NUM1 && input.match(/\d/)) {
        num1 += input
        state = FLOAT_NUM1
    } else if((state === INT_NUM1 || state === FLOAT_NUM1) && ['+','-','×','÷'].includes(input)) {
        operation = input
        num2 = num1
        state = NUM2_NUM1
    } else if(state === NUM2_NUM1 && ['+','-','×','÷'].includes(input)) {
        operation = input
        state = NUM2_NUM1
    } else if(state === NUM2_NUM1 && input.match(/\d/)) {
        num2 = input
        state = INT_NUM2
    } else if(state === NUM2_NUM1 && input === '.') {
        num2 = '0.'
        state = FLOAT_NUM2
    } else if(state === INT_NUM2 && input.match(/\d/)) {
        num2 += input
        state = INT_NUM2
    } else if(state === INT_NUM2 && input === '.') {
        num2 += input
        state = FLOAT_NUM2
    } else if(state === FLOAT_NUM2 && input.match(/\d/)) {
        num2 += input
        state = FLOAT_NUM2
    } else if((state === INT_NUM2 || state === FLOAT_NUM2) && input === '=') {
        calculate(num1, num2, operation)
        state = SHOW
    } else if ((state === INT_NUM2 || state === FLOAT_NUM2) && ['+','-','×','÷'].includes(input)) {
        operation = input
        calculate(num1, num2, operation)
        num1 = result
        state = NUM2_NUM1
    } else if (state === SHOW && input.match(/\d/)) {
        num1 = input
        state = INT_NUM1
    } else if (state === SHOW && input === '.') {
        num1 = '0.'
        state = FLOAT_NUM1
    } else if (state === SHOW && input === '=') {
        calculate(result, num2, operation)
        state = SHOW
    } else if (state === SHOW && ['+','-','×','÷'].includes(input)) {
        operation = input
        num1 = result
        state = NUM2_NUM1
    }
    show()
    holdOperationButton(input)
}

// Calculate result according to operation given
function calculate(num1, num2, operation) {
    num1 = parseFloat(num1)
    num2 = parseFloat(num2)
    if(operation === '+') {
        result = num1 + num2
    } else if (operation === '-') {
        result = num1 - num2
    } else if (operation === '×') {
        result = num1 * num2
    } else if (operation === '÷') {
        result = num1 / num2
    }
    result = result.toString()
    num1 = num1.toString()
    num2 = num2.toString()
}

// INITIAL SETUP
show()


