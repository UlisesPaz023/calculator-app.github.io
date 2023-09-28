const elements = document.querySelectorAll('*');
const calculatorBtns = document.querySelector('.calculator__buttons');
const calculatorSection = document.querySelectorAll('.calculator__section');
const calculatorInput = document.querySelector('.calculator__input');
const numberButtons = document.querySelectorAll('.btn__number');
const operatorButtons = document.querySelectorAll('.btn__operator')
const calculatorButtons = document.querySelector('.calculator__buttons');
const buttons = document.querySelectorAll('.btn');
const resetButton = document.querySelector('.btn__reset');
const delButton = document.querySelector('.btn__del');
const equalButton = document.querySelector('.btn__equal');
const toggleDot = document.querySelectorAll('.toggle__dot');
const selectorRange = document.querySelector('.selector__range');
const validNumber = /^[0-9+*\-\/.]*$/;

const colors = [
    [
        'var(--t1veryDarkBlueMain)',
        'white',
        'var(--t1veryDarkBlueToggle)',
        'var(--t1veryDarkBlueScreen)',
        'var(--t1veryDarkBlueToggle)',
        'var(--t1lightGrayishOrange)',
        'var(--t1veryDarkBlueKeyShadow)',
        'var(--t1grayishOrange)',
        'var(--t1veryDarkBlueKeyBG)',
        'white',
        'var(--t1veryDarkBlueKeyShadow)',
        'var(--t1red)',
        'var(--t1darkRed)',
        'var(--t1veryLightBlueKeyBG)',
        'var(--t1lightRed)',
    ],
    [
        'var(--t2lightGray)',
        'var(--t2veryDarkGrayishYellow)',
        'var(--t2grayishRed)',
        'var(--t2veryLightGray)',
        'var(--t2grayishRed)',
        'var(--t2lightGrayishYellow)',
        'var(--t2veryDarkGrayishYellow)',
        'var(--t2darkGrayishOrange)',
        'var(--t2darkModerateCyan)',
        'white',
        'var(--t2veryDarkCyan)',
        'var(--t2orange)',
        'var(--t2darkOrange)',
        'var(--t2lightCyan)',
        'var(--t2lightOrange)',
    ],
    [
        'var(--t3veryDarkViolet)',
        'var(--lightYellow)',
        'var(--t3veryDarkViolet2)',
        'var(--t3veryDarkViolet2)',
        'var(--t3veryDarkViolet2)',
        'var(--t3veryDarkViolet3)',
        'var(--lightYellow)',
        'var(--t3darkMagenta)',
        'var(--t3darkViolet)',
        'white',
        'var(--t3magenta)',
        'var(--t3pureCyan)',
        'var(--t3softCyan)',
        'var(--t3lightViolet)',
        'var(--t3lightCyan)',
    ]
];

let currentNumber = '';
let previousNumber = '';
let operation = null;
let rangeValue = 0;

numberButtons.forEach((button, index)=> {
    button.addEventListener('click', ()=>{
        currentNumber += button.textContent;
        calculatorInput.value = currentNumber;
        button.style.backgroundColor = colors[rangeValue][7];
        setTimeout(()=> {
            button.style.backgroundColor = colors[rangeValue][5];
        }, 150);
    });
    if(operation === null){
        calculatorInput.value = '';
    }
});

operatorButtons.forEach((button, index) => {
    button.addEventListener('click', ()=>{
        if(currentNumber !== ''){
            previousNumber = currentNumber;
            currentNumber = '';
            operation = button.value;
        }
        button.style.backgroundColor = colors[rangeValue][7];
        setTimeout(()=> {
            button.style.backgroundColor = colors[rangeValue][5];
        }, 150);
    });
});

equalButton.addEventListener('click', ()=> {
    performCalculation();
    equalButton.style.backgroundColor = colors[rangeValue][14];
    setTimeout(()=> {
        equalButton.style.backgroundColor = colors[rangeValue][11];
    }, 150);
});

const performCalculation = () => {
    if(previousNumber !== '' && currentNumber !== '' && operation){
        const result = performOperation(
            parseFloat(previousNumber),
            parseFloat(currentNumber),
            operation
        );
        currentNumber = result.toString();
        previousNumber='';
        operation = null;
        calculatorInput.value=currentNumber;
    }
};

const performOperation = (num1, num2, operator) => {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        default:
            return num2;
    }
};

resetButton.addEventListener('click', ()=>{
    currentNumber = '';
    previousNumber = '';
    operation = null;
    calculatorInput.value = '';
    resetButton.style.backgroundColor = colors[rangeValue][13];
    setTimeout(()=> {
        resetButton.style.backgroundColor = colors[rangeValue][8];
      }, 150);
});

delButton.addEventListener('click', ()=> {
    currentNumber = currentNumber.slice(0,-1);
    calculatorInput.value = currentNumber;
    delButton.style.backgroundColor = colors[rangeValue][13];
    setTimeout(()=> {
        delButton.style.backgroundColor = colors[rangeValue][8];
      }, 150);
});

calculatorInput.addEventListener('input', (event)=>{
    const inputValue = event.target.value;

    if(!validNumber.test(inputValue)){
        event.target.value = inputValue.slice(0, -1);
    }
});

const applyStyles = (index) => {

    elements.forEach((element, i) => {
        element.style.backgroundColor = colors[index][0];
        element.style.color = colors[index][1];
    });
    selectorRange.style.backgroundColor = colors[index][2];
    calculatorInput.style.backgroundColor = colors[index][3];
    calculatorButtons.style.backgroundColor = colors[index][4];
    buttons.forEach((button)=> {
        button.style.backgroundColor = colors[index][5];
        button.style.color = colors[index][6];
        button.style.borderBottom = `.3rem ${colors[index][7]} solid`;
    });
    resetButton.style.backgroundColor = colors[index][8];
    resetButton.style.color = colors[index][9];
    resetButton.style.borderBottom = `.3rem ${colors[index][10]} solid`;
    delButton.style.backgroundColor = colors[index][8];
    delButton.style.color = colors[index][9];
    delButton.style.borderBottom = `.3rem ${colors[index][10]} solid`;
    equalButton.style.backgroundColor = colors[index][11];
    equalButton.style.color = colors[index][9];
    equalButton.style.borderBottom = `.3rem ${colors[index][12]} solid`;
};

toggleDot.forEach((dot, index)=>{
    dot.addEventListener('click', ()=>{
        selectorRange.value = index;
        applyStyles(index);
    });
});

selectorRange.addEventListener("input",(e)=>{
    rangeValue = parseInt(e.target.value);
    applyStyles(rangeValue);
    selectorRange.style.setProperty("--webkit-slider-thumb-color", colors[rangeValue][7]);
    setTimeout(()=> {
        selectorRange.style.setProperty("--webkit-slider-thumb-color", colors[rangeValue][11]);
    }, 150);
    toggleDot.forEach((dot, index)=>{
        dot.checked=false;
    });

    if (rangeValue >= 0 && rangeValue < toggleDot.length) {
        toggleDot[rangeValue].checked = true;
    }
});

const widthCalculatorBtns = calculatorBtns.offsetWidth;

calculatorSection.forEach((eachSection, index) => {
    calculatorSection[index].style.width = widthCalculatorBtns + 'px';
});
