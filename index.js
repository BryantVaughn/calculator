let firstNum;
let secondNum;

const nums = document.querySelectorAll('#num');

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
	return a / b;
};

const operate = function (operator, a, b) {
	return operator(a, b);
};

const updateDisplay = function (val) {};

nums.forEach((num) => {
	num.addEventListener('click', (e) => {
		updateDispaly(e.target.value);
	});
});
