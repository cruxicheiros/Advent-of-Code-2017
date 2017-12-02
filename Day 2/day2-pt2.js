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

function parseData(data) {
    return new Promise(resolve => {
        let structuredData = [];
        let row = [];
        let element = "";

        for (i = 0; i < data.length; i++) {
            if (data[i] === "\t") {
                row.push(parseInt(element, 10));
                element = "";
            } else if (data[i] === "\n" || i === data.length - 1) {
                element += data[i];
                row.push(parseInt(element, 10));
                structuredData.push(row);
                row = [];
                element = "";
            } else {
                element += data[i];
            }
        }

        resolve(structuredData);

    });
}

function genChecksum(data) {
    let sum = 0;

    return new Promise(resolve => {
        for (i = 0; i < data.length; i++) {
            let sorted_row = data[i].sort(function(a, b) {return a-b});
            row_loop:
                for (j = 0; j < sorted_row.length; j++) {
                    for (k = j + 1; k < sorted_row.length; k++) { // There's no point dividing a number by a number that is bigger than it
                        if (sorted_row[k] % sorted_row[j] === 0) {
                            sum += sorted_row[k] / sorted_row[j]
                            break row_loop;
                        }
                    }
                }
        }

        resolve(sum);
    });
}

readFile('input.txt').then(function (raw_input) {
    parseData(raw_input).then(function (structured_data) {
        genChecksum(structured_data).then(function (checksum) {
                console.log(checksum);
            }
        )
    })
});
