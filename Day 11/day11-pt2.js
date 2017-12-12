const fs = require('fs');

function readFile(filename) {
    return new Promise (resolve => {
        fs.readFile(__dirname + '/' + filename, function (err, data) {
            if (err) {
                reject(err);
            }

            resolve(data.toString().split(','));
        });
    });
}

function getDistanceFromCenter (x, y) {
    let x_delta = Math.abs(x);
    let y_delta = Math.abs(y);
    let z_delta = Math.abs(-x - y);


    return Math.max(x_delta, y_delta, z_delta);
}

const velocities = {
    'n' : [0, -1],
    'ne' : [1, -1],
    'se' : [1, 0],
    's' : [0, 1],
    'sw' : [-1, +1],
    'nw' : [-1, 0]
};

readFile('input.txt').then(function (path) {
    let current_position = [0, 0];
    let furthest = 0;

    for (let i of path) {
        current_position[0] += velocities[i][0];
        current_position[1] += velocities[i][1];

        let distance = getDistanceFromCenter(...current_position);
        if (distance > furthest) {
            furthest = distance;
        }
    }

    console.log(furthest);

});

