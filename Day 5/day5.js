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
        let structured_data = data.match(/[^\r\n]+/g);
		for (i = 0; i < structured_data.length; i++) {
			structured_data[i] = parseInt(structured_data[i])
		}
        resolve(structured_data);

    });
}

function processList(data) {
	position = 0;
	steps = 0;
	out = false;
	
    while (out === false) {
		last_position = position;
		position += data[position];
		data[last_position] ++;
		steps ++;
				
		if (position >= data.length || position < 0) {
			out = true
		}
	}
	
	return steps
}

readFile('input.txt').then(function (raw_input) {
    parseData(raw_input).then(function (structured_data) {
        console.log(processList(structured_data));
    });
});
