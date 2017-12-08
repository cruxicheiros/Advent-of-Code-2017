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
    for (i of statements) {
        registers[statements['arithmetic']['register']] = 0;
        registers[statements['expression']['register']] = 0;
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
                'operand': split_statement[6]
            }
        };

        structured_data.push(structured_statement);
    }
}

parseInstruction('c dec -10 if a >= 1');