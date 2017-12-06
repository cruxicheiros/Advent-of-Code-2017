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
        let structured_data = data.match(/[^\t]+/g);
		for (i = 0; i < structured_data.length; i++) {
			structured_data[i] = parseInt(structured_data[i])
		}
        resolve(structured_data);

    });
}

function findHighest(data) {
	let highest_number_index = 0;
	let highest_number = 0;
	
	for (i = 0; i < data.length; i++) {
		if (data[i] > highest_number) {
			highest_number_index = i;
			highest_number = data[i];
		}
	}

	return highest_number_index;
}

function distributeMemory(data) {
	let highest_number_index = findHighest(data);
	let highest_number = data[highest_number_index];
	data[highest_number_index] = 0;

	let cycle = 0;
	let adjusted_iterator = 0;

	for (i = 0; i < highest_number; i++) {
        adjusted_iterator = i - (cycle * (data.length)) + highest_number_index + 1;

        if (adjusted_iterator >= data.length) {
            cycle++;
            adjusted_iterator -= (data.length);
        }

        data[adjusted_iterator]++;

    }

    return data;
}

function findRepeatDistance(data, previous_distributions) {
	distributed_data = distributeMemory(data.slice());

	if (previous_distributions.includes(distributed_data.toString())) {
		return previous_distributions.length;
		
	} else {
		previous_distributions.push(distributed_data.toString());
		return findRepeatDistance(distributed_data, previous_distributions);
	}
	
}

readFile('input.txt').then(function (raw_input) {
    parseData(raw_input).then(function (structured_data) {
        console.log(findRepeatDistance(structured_data.slice(), [structured_data.toString()]));
    });
});
