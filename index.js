let firstNum;
let secondNum;

const display = document.querySelector('.display');
const numBtns = document.querySelectorAll('#num');
const clearBtn = document.querySelector('.clear');

const add = function (a, b) {
	return a + b;
};

const subtract = function (a, b) {
	return a - b;
};

const multiply = function (a, b) {
	return a * b;
};

const divide = function (a, b) {
	if (b === 0) {
		alert('Cannot divide by 0.');
		return 'Error';
	}
	return a / b;
};

const operate = function (operation, a, b) {
	return operation(a, b);
};

const updateDisplay = function (val) {
	display.textContent += val;
};

const clearDisplay = function () {
	display.textContent = 0;
};

numBtns.forEach((num) => {
	num.addEventListener('click', () => {
		updateDisplay(num.innerText);
	});
});

clearBtn.addEventListener('click', clearDisplay);

class Calculator {
	constructor(equation, solution) {
		this.equation = equation;
		this.solution = solution;
		this.reset = true;
		this.clearMemory();
	}

	clearMemory() {
		this.current = '';
		this.previous = '';
		this.opperation = undefined;
	}

	backspace() {
		this.current = this.current.toString().splice(0, -1);
	}

	add(a, b) {
		return a + b;
	}

	subtract(a, b) {
		return a - b;
	}

	multiply(a, b) {
		return a * b;
	}

	divide = function (a, b) {
		if (b === 0) {
			alert('Cannot divide by 0.');
			return 'Error';
		}
		return a / b;
	};

	operate(operation, a, b) {
		return operation(a, b);
	}
}
