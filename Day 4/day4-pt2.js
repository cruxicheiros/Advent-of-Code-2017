const fs = require('fs');

function sortStringAlphabetically(text) {
    return text.split('').sort().join('');
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

function parseData(data) {
    return new Promise(resolve => {
        let structuredData = [];
        let element = "";
        let rows = data.match(/[^\r\n]+/g);

        for (i = 0; i < rows.length; i++) {
            let new_row = [];
            for (j = 0; j < rows[i].length; j++) {
                if (rows[i][j] === " ") {
                    new_row.push(sortStringAlphabetically(element));
                    element = "";
                } else if (j === rows[i].length - 1) {
                    element += rows[i][j];
                    new_row.push(sortStringAlphabetically(element));
                    element = "";
                } else {
                    element += rows[i][j];
                }
            }

            structuredData.push(new_row);
        }

        resolve(structuredData);
    });
}

function validatePhrase(phrase) {
    phrase_length = phrase.length;

    let valid = true;

    for (i = 0; i <= phrase_length; i++) {
        let current_word = phrase.pop();
        if (phrase.includes(current_word)) {
            valid = false;
            break
        }
    }

    return valid;
}

function countValidPhrases(structured_data) {
    let valid_passphrase_count = 0;
    for (let j of structured_data) {
        if (validatePhrase(j.slice())) {
            valid_passphrase_count += 1;
        }
    }

    return(valid_passphrase_count);
}

readFile('input.txt').then(function (raw_input) {
    parseData(raw_input).then(function (structured_data) {
        console.log('The answer is', countValidPhrases(structured_data));
    })
});
