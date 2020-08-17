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

	updateNumber(num) {
		if (num === '.' && this.current.includes('.')) return;
		if (this.reset) {
			this.current = num.toString();
			this.reset = false;
		} else {
			if (num === 0 && this.current.includes('0') && this.current.length === 1)
				return;
			else if (this.current.includes('0') && this.current.length === 1)
				this.current = num.toString();
			else this.current = this.current.toString() + num.toString();
		}
	}

	selectOperation(operation) {
		if (this.current === '') return;
		if (this.previous !== '') this.operate();

		this.operation = operation;
		this.previous = this.current;
		this.current = '';
	}

	operate() {
		let opResult;
		const previous = parseFloat(this.previous);
		const current = parseFloat(this.current);
		if (isNaN(previous) || isNaN(current)) return;

		switch (this.operation) {
			case '+':
				opResult = parseFloat(add(previous, current).toFixed(4));
				break;
			case '-':
				opResult = parseFloat(subtract(previous, current).toFixed(4));
				break;
			case 'x':
				opResult = parseFloat(multiply(previous, current).toFixed(4));
				break;
			case '÷':
				opResult = parseFloat(divide(previous, current).toFixed(4));
				break;
			case '%':
				opResult = parseFloat(mod(previous, current).toFixed(4));
				break;
			default:
				return;
		}

		this.current = opResult;
		this.operation = undefined;
		this.previous = '';
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

	divide(a, b) {
		if (b === 0) return 'Error';
		return a / b;
	}

	mod(a, b) {
		if (b === 0) return 'Error';
		return a % b;
	}

	updateDisplay() {
		this.solution.textContent = this.current;
		if (this.operation !== null) {
			if (this.previous === '') this.equation.textContent = '';
			else this.equation.textContent = `${this.previous} ${this.operation}`;
		} else {
			this.equation.textContent = '';
		}
	}
}

const equationScrn = document.querySelector('.equation');
const solutionScrn = document.querySelector('.solution');
const numBtns = document.querySelectorAll('#num');
const opBtns = document.querySelectorAll('#op');
const equalBtn = document.querySelector('.equal');
const clearBtn = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete');
