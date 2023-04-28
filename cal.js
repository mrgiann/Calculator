// Obtener los elementos de la calculadora
const display = document.getElementById('result');
const numbers = document.getElementsByName('data-number');
const operators = document.getElementsByName('data-opera');
const equal = document.getElementsByName('data-igual')[0];
const erase = document.getElementsByName('data-delete')[0];

// Inicializar variables
let prevNumber = '';
let currentNumber = '';
let operation = undefined;

// Función para añadir un número al display
function addNumber(num) {
    currentNumber = currentNumber.toString() + num.toString();
    if (operation) {
      display.value = prevNumber + ' ' + operation + ' ' + currentNumber;
    } else {
      display.value = currentNumber;
    }
  }
  

// Función para actualizar el display con el número actual
function updateDisplay() {
  display.value = currentNumber;
}

// Función para seleccionar una operación
function selectOperation(op) {
  if (currentNumber === '') return;
  if (prevNumber !== '') {
    compute();
  }
  operation = op;
  prevNumber = currentNumber;
  currentNumber = '';
}

// Función para realizar la operación
function compute() {
  let computation;
  const prev = parseFloat(prevNumber);
  const current = parseFloat(currentNumber);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case 'x':
      computation = prev * current;
      break;
    case '/':
      computation = prev / current;
      break;
    default:
      return;
  }
  currentNumber = computation;
  operation = undefined;
  prevNumber = '';
  updateDisplay();
}

// Función para borrar todo
function clearAll() {
  currentNumber = '';
  prevNumber = '';
  operation = undefined;
  updateDisplay();
}

// Event listeners para los botones de números
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', function() {
    addNumber(numbers[i].innerHTML);
  });
}

// Event listeners para los botones de operaciones
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener('click', function() {
    selectOperation(operators[i].innerHTML);
  });
}

// Event listener para el botón de igual
equal.addEventListener('click', function() {
  compute();
});

// Event listener para el botón de borrar
erase.addEventListener('click', function() {
  clearAll();
});
