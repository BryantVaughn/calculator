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
		this.current = this.current.toString().slice(0, -1);
	}

	updateNumber(num) {
		if (num === '.' && this.current.includes('.')) return;
		if (this.reset) {
			this.current = num.toString();
			this.reset = false;
		} else {
			if (num == 0 && this.current.includes('0') && this.current.length == 1) {
				return;
			} else if (this.current.includes('0') && this.current.length == 1) {
				this.current = num.toString();
			} else {
				this.current = this.current.toString() + num.toString();
			}
		}
	}

	selectOperation(op) {
		if (this.current === '') return;
		if (this.previous !== '') this.operate();

		this.operation = op;
		this.previous = this.current;
		this.current = '';
	}

	operate() {
		let computation;
		const prev = parseFloat(this.previous);
		const curr = parseFloat(this.current);
		if (isNaN(prev) || isNaN(curr)) return;
		switch (this.operation) {
			case '+':
				computation = parseFloat((prev + curr).toFixed(12));
				break;
			case '-':
				computation = parseFloat((prev - curr).toFixed(12));
				break;
			case 'x':
				computation = parseFloat((prev * curr).toFixed(12));
				break;
			case '÷':
				if (curr === 0) computation = 'Err';
				else computation = parseFloat((prev / curr).toFixed(12));
				break;
			case '%':
				if (curr === 0) computation = 'Err';
				else computation = parseFloat((prev % curr).toFixed(12));
				break;
			default:
				return;
		}
		this.current = computation;
		this.operation = undefined;
		this.previous = '';
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

const equationScrn = document.querySelector('#equation');
const solutionScrn = document.querySelector('#solution');
const numBtns = document.querySelectorAll('[data-number]');
const opBtns = document.querySelectorAll('.op');
const equalBtn = document.querySelector('[data-equals]');
const clearBtn = document.querySelector('[data-clear]');
const deleteBtn = document.querySelector('[data-delete]');

const calc = new Calculator(equationScrn, solutionScrn);

numBtns.forEach((num) => {
	num.addEventListener('click', () => {
		calc.updateNumber(num.textContent);
		calc.updateDisplay();
	});
});

opBtns.forEach((op) => {
	op.addEventListener('click', () => {
		calc.selectOperation(op.textContent);
		calc.updateDisplay();
	});
});

deleteBtn.addEventListener('click', () => {
	calc.backspace();
	calc.updateDisplay();
});

equalBtn.addEventListener('click', () => {
	calc.operate();
	calc.updateDisplay();
	calc.reset = true;
});

clearBtn.addEventListener('click', () => {
	calc.clearMemory();
	calc.updateDisplay();
});

window.addEventListener('keydown', (e) => {
	const code = e.keyCode;
	switch (true) {
		case (code >= 48 && code <= 57) ||
			(code >= 96 && code <= 105) ||
			code === 108 ||
			code === 110 ||
			code === 190 ||
			code === 194:
			calc.updateNumber(e.key);
			break;
		case code === 106 ||
			code === 107 ||
			code === 109 ||
			code === 111 ||
			code === 187:
			calc.selectOperation(e.key);
			break;
		case code === 13 || code === 61:
			calc.operate();
			calc.reset = true;
			break;
		case code === 8 || code === 46:
			calc.backspace();
			break;
		case code === 27:
			calc.clearMemory();
			break;
		default:
			return;
	}
	calc.updateDisplay();
});
