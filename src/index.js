function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let exprNoSpace = expr.trim().split(' ').join('');
    let arr = [];
    let brackets = 0;

    for (let i = 0; i < exprNoSpace.length; i++) {
        for (let j = 0; j < exprNoSpace.length; j++) {
            if (!isNaN(+exprNoSpace[i + j])) continue;
            if (j) {
                arr.push(+exprNoSpace.slice(i, i + j));
            }
            if (i + j < exprNoSpace.length) {
                arr.push(exprNoSpace[i + j])
                if (exprNoSpace[i + j] === '(') {
                    brackets++;
                }
                if (exprNoSpace[i + j] === ')') {
                    brackets--;
                }
                if ((exprNoSpace[i + j] === '/') && (exprNoSpace[i + j + 1] === '0')) {
                    throw "TypeError: Division by zero.";
                }
            }
            i += j;
            break;
        }
    }
    if (brackets) {
        throw "ExpressionError: Brackets must be paired";
    }

    const priority = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
    }

    const resArr = [];
    const temp = [];
    arr.forEach((el, index) => {
        if (!isNaN(el)) {
            resArr.push(el);

        } else {

            if (el !== ")") {
                while (priority[el] <= priority[temp[temp.length - 1]]) {
                    resArr.push(temp.pop());
                }
                temp.push(el);
            } else {
                while (temp[temp.length - 1] !== '(') {
                    resArr.push(temp.pop());
                }
                temp.pop();
            }
        }
    });

    while (temp.length) {
        resArr.push(temp.pop());
    }

    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
    }

    const result = [];

    resArr.forEach(el => {
        if (el in operators) {
            let [b, a] = [result.pop(), result.pop()];
            result.push(operators[el](a, b));
        } else {
            result.push(el);
        }
    })

    return result.pop();

}

module.exports = {
    expressionCalculator
}