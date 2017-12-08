const fs = require('fs');

function readFile(filename) {
    return new Promise (resolve => {
        fs.readFile(__dirname + '/' + filename, function (err, data) {
            if (err) {
                reject(err);
            }

            resolve(data.toString());
        });
    });
}

function listRegisters(statements) {
    let registers = {};
    for (let i of statements) {
        registers[i['arithmetic']['register']] = 0;
        registers[i['logic']['register']] = 0;
    }
    return registers;
}

function evaluateArithmetic(registers, expression) {
    const operators = {'inc' : function(a, b) {return a + b;},
                    'dec' : function(a, b) {return a - b;}
    };

    registers[expression['register']] = operators[expression['operator']](registers[expression['register']], expression['operand']);
    return registers;
}

function evaluateLogic(registers, expression) {
    const operators = {'>' : function (a, b) {return a > b;},
                 '>=' : function (a, b) {return a >= b;},
                 '<' : function (a, b) {return a < b;},
                 '<=' : function (a, b) {return a <= b;},
                 '==' : function (a, b) {return a === b;},
                 '!=' : function (a, b) {return a !== b;}
    };

    return operators[expression['operator']](registers[expression['register']], expression['operand']);
}

function parseInstruction(registers, statement) {
    if (evaluateLogic(registers, statement['logic']) === true) {
        registers = evaluateArithmetic(registers, statement['arithmetic'])
        console.log(statement);
    }

    return registers;
}

function structureData(data) {
    let statements_list = data.match(/[^\r\n]+/g);
    let structured_data = [];
    for (let i of statements_list) {
        let split_statement = i.split(" ");

        let structured_statement = {
            'arithmetic': {
                'register': split_statement[0], // split_statement[3] is 'if', so it's skipped
                'operator': split_statement[1],
                'operand': parseInt(split_statement[2])
            },
            'logic': {
                'register': split_statement[4],
                'operator': split_statement[5],
                'operand': parseInt(split_statement[6])
            }
        };

        structured_data.push(structured_statement);
    }

    return structured_data;
}

function evaluateAllStatements(statements) {
    let registers = listRegisters(statements);
    for (let i of statements) {
        registers = parseInstruction(registers, i);
    }

    return registers;
}

function findHighestRegister(registers) {
    let keys = Object.keys(registers);
    let highest_value = registers[keys[0]];

    for (let i of keys) {
        if (registers[i] > highest_value) {
            highest_value = registers[i];
        }
    }

    return highest_value;
}

function findAllTimeHighest(statements) {
    let registers = listRegisters(statements);
    let keys = Object.keys(registers);

    let highest_value = registers[keys[0]];

    for (let i of statements) {
        registers = parseInstruction(registers, i);
        let high_value = findHighestRegister(registers);

        if (high_value > highest_value) {
            highest_value = high_value;
        }
    }

    return highest_value;
}

readFile('input.txt').then(function (raw_input) {
    let structured_data = structureData(raw_input);
    console.log(findAllTimeHighest(structured_data));

});