const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let resultDisplayed = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    handleInput(action);
  });
});

document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (/[\d+\-*/%.]/.test(key)) {
    handleInput(key);
  } else if (key === 'Enter') {
    handleInput('=');
  } else if (key === 'Backspace') {
    handleInput('delete');
  } else if (key.toLowerCase() === 'c') {
    handleInput('all-clear');
  }
});

function handleInput(input) {
  if (input === 'all-clear') {
    currentInput = '';
    display.value = '0';
  } else if (input === 'delete') {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput || '0';
  } else if (input === '=') {
    try {
      currentInput = eval(currentInput).toString();
      display.value = currentInput;
      resultDisplayed = true;
    } catch {
      display.value = 'Error';
      currentInput = '';
    }
  } else if (input === 'percent') {
    if (currentInput) {
      currentInput = (parseFloat(currentInput) / 100).toString();
      display.value = currentInput;
    }
  } else if (input === 'plus-minus') {
    if (currentInput) {
      currentInput = (parseFloat(currentInput) * -1).toString();
      display.value = currentInput;
    }
  } else {
    if (resultDisplayed && /[\d.]/.test(input)) {
      currentInput = input;
      resultDisplayed = false;
    } else {
      currentInput += input;
    }
    display.value = currentInput;
  }
}
