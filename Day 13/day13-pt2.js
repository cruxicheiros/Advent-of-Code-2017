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

function structureData(data) {
    let data_list = data.split('\r\n');
    let structured_data = [];

    for (i = 0; i < data_list.length; i++) {
        data_list[i] = data_list[i].match(/\d+/g);
        structured_data[parseInt(data_list[i][0])] = parseInt(data_list[i][1]) - 1;
    }

    return structured_data;
}

function locateScanner(height, iteration) {
    let scanner_pos = iteration % height;
    //console.log(iteration, height)

    if (Math.floor(iteration === 0)) {
        scanner_pos = 0;
    } else if (Math.floor(iteration / height) % 2 === 1) { // If on an even rotation, the direction is up
        scanner_pos = height - scanner_pos;
    }

    return scanner_pos;
}

readFile('input.txt').then(function (data) {
    let structured_data = structureData(data);
    let severity = 0;
    let delay = 0;
    let delay_found = false;

    while (delay_found === false) {
        delay += 1;
        for (i = 0; i < structured_data.length; i++) {
            delay_found = true;
            if (structured_data[i] !== undefined) {
                if (locateScanner(structured_data[i], i + delay) === 0) {
                    delay_found = false;
                    break
                }
            }
        }

    }
    console.log(delay);
});