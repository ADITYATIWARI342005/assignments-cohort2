/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
    constructor() {
        this.result = 0;
    }
    // Basic operations
    add(value) {
        this.result += value;
    }

    subtract(value) {
        this.result -= value;
    }

    multiply(value) {
        this.result *= value;
    }

    divide(value) {
        if (value === 0) {
            throw new Error("Division by zero");
        }
        this.result /= value;
    }

    getResult() {
        return this.result;
    }

    clear() {
        this.result = 0;
    }

    // Helper: Tokenize input expression
    tokenize(expression) {
        const tokens = [];
        const tokenRegex = /\s*([\d.]+|\+|\-|\*|\/|\(|\))\s*/g;
        let match;
        while ((match = tokenRegex.exec(expression)) !== null) {
            tokens.push(match[1]);
        }
        return tokens;
    }

    // Helper: Check if token is a number
    isNumber(token) {
        return !isNaN(token);
    }

    // Helper: Convert infix to postfix using shunting yard algorithm
    infixToPostfix(tokens) {
        const precedence = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2,
        };
        const outputQueue = [];
        const operatorStack = [];

        for (let token of tokens) {
            if (this.isNumber(token)) {
                outputQueue.push(token);
            } else if (token === '(') {
                operatorStack.push(token);
            } else if (token === ')') {
                while (
                    operatorStack.length > 0 &&
                    operatorStack[operatorStack.length - 1] !== '('
                    ) {
                    outputQueue.push(operatorStack.pop());
                }
                if (
                    operatorStack.length === 0 ||
                    operatorStack[operatorStack.length - 1] !== '('
                ) {
                    throw new Error('Mismatched parentheses');
                }
                operatorStack.pop(); // Remove '('
            } else if ('+-*/'.includes(token)) {
                while (
                    operatorStack.length > 0 &&
                    operatorStack[operatorStack.length - 1] !== '(' &&
                    precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
                    ) {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.push(token);
            } else {
                throw new Error('Invalid character: ' + token);
            }
        }

        while (operatorStack.length > 0) {
            const op = operatorStack.pop();
            if (op === '(' || op === ')') {
                throw new Error('Mismatched parentheses');
            }
            outputQueue.push(op);
        }

        return outputQueue;
    }

    // Helper: Evaluate postfix expression
    evaluatePostfix(postfixTokens) {
        const stack = [];
        for (const token of postfixTokens) {
            if (this.isNumber(token)) {
                stack.push(parseFloat(token));
            } else if ('+-*/'.includes(token)) {
                if (stack.length < 2) {
                    throw new Error('Invalid expression');
                }
                const b = stack.pop();
                const a = stack.pop();
                let res;
                switch (token) {
                    case '+':
                        res = a + b;
                        break;
                    case '-':
                        res = a - b;
                        break;
                    case '*':
                        res = a * b;
                        break;
                    case '/':
                        if (b === 0) {
                            throw new Error('Division by zero');
                        }
                        res = a / b;
                        break;
                }
                stack.push(res);
            } else {
                throw new Error('Invalid token in postfix expression');
            }
        }
        if (stack.length !== 1) {
            throw new Error('Invalid expression evaluation');
        }
        return stack[0];
    }

    // Main: calculate expression
    calculate(expression) {
        // Validate parentheses count
        const parenthesesCount = (expression.match(/\(/g) || []).length;
        if ((expression.match(/\)/g) || []).length !== parenthesesCount) {
            throw new Error('Mismatched parentheses');
        }

        // Check invalid characters
        if (/[^0-9+\-*/().\s]/.test(expression)) {
            throw new Error('Invalid characters in expression');
        }

        // Tokenize
        const tokens = this.tokenize(expression);

        // Convert to postfix
        const postfix = this.infixToPostfix(tokens);

        // Evaluate postfix
        const value = this.evaluatePostfix(postfix);

        this.result = value;
    }
}

module.exports = Calculator;

