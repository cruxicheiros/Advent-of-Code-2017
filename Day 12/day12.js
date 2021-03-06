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

    for (i = 0; i < data_list.length; i++) {
        data_list[i] = data_list[i].match(/\d+/g).slice(1);

        for (j = 0; j < data_list[i].length; j++) {
            data_list[i][j] = parseInt(data_list[i][j]);
        }
    }

    return data_list;
}

function countConnections(data, index) {
    let connections = [];
    connections.push(...data[index]);

    for (let i of connections) {
        for (let j of data[i]) {
            if (connections.includes(j) === false) {
                connections.push(j)
            }
        }
    }

    return connections.length;
}


readFile('input.txt').then(function (data) {
   console.log(countConnections(structureData(data), 0));
});