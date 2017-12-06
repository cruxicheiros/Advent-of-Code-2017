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
	highest_number_index = findHighest(data);
	highest_number = data[highest_number_index];
	data[highest_number_index] = 0;
		
	if (highest_number % (data.length) === 0) {
		console.log('a', highest_number, data);
		for (i = 0; i < data.length; i++) {
			data[i] += highest_number / (data.length);
		}
		console.log(data)

	
	} else if (highest_number % (data.length - 1) === 0) {
		console.log('b', highest_number, data);
		for (i = 0; i < data.length; i++) {
			if (i !== highest_number_index) {
				data[i] += highest_number / (data.length - 1);
			}
		}
		console.log(data)
	} else if (highest_number > data.length){
		console.log('c', highest_number, data);
		remainder = (highest_number % (data.length - 1));
		for (i = 0; i < data.length; i++) {
			if (i === highest_number_index) {
				data[i] += remainder;
			} else {
				data[i] += (highest_number - remainder) / (data.length - 1);
			}
		}
		console.log(data)

	}
	
	return data
	
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
