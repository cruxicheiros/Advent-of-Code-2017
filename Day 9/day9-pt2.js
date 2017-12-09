const fs = require('fs');

function clearNots(data) {
    let nots_count = 0;
    let cleared_data = "";

    for (let i of data) {
        if (i === '!') {
            nots_count++;
        } else if (nots_count % 2 === 1) {
            nots_count = 0;
        } else {
            nots_count = 0;
            cleared_data += i;
        }
    }

    return cleared_data;
}

function countGarbage(data) {
    let in_garbage = false;
    let garbage_amount = 0;

    for (let i of data) {
        if (in_garbage) {
            if (i === '>') {
                in_garbage = false;
            } else {
                garbage_amount++;
            }
        } else if (i === '<') {
            in_garbage = true;
        }
    }

    return garbage_amount;
}

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


readFile('input.txt').then(function (raw_input) {
    let answer = countGarbage(clearNots(raw_input));

    console.log(answer);
});