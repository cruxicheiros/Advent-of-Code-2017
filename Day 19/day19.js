const fs = require('fs');
var cowsay = require("cowsay");


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

function create2dArrayFromInput(data) {
	let grid = data.split('\n');
	for (let i = 0; i < grid.length; i++) {
		grid[i] = grid[i].split('');
	}
	
	return grid;
}

readFile('input.txt').then(function (raw_input) {
	const path_characters = ['+', '|', '-'];
	const direction_vectors = {
		'down' : {
			'x' : 0,
			'y' : 1
		},
		'up' : {
			'x' : 0,
			'y' : -1
		},
		'left' : {
			'x' : -1,
			'y' : 0
		},
		'right' : {
			'x' : 1,
			'y' : 0
		}
	}
	
    let grid = create2dArrayFromInput(raw_input);
	let grid_width = grid[0].length;
	let grid_height = grid.length;
	let cursor_x = grid[0].indexOf('|');
	let cursor_y = 0;
	let sequence = [];
	let direction = 'down';
	let end_of_line = false;
	let steps = 0;
	
	while (end_of_line === false) {
		let next_x = cursor_x + direction_vectors[direction].x;
		let next_y = cursor_y + direction_vectors[direction].y;
				
		if (grid[cursor_y][cursor_x] !== '+') {
			cursor_x = next_x;
			cursor_y = next_y;
			
		} else {
			if (grid[next_y] === undefined || grid[next_y][next_x] === ' ') {
				if (direction === 'up' || direction === 'down') {
					if (grid[cursor_y][cursor_x - 1] !== ' ' && cursor_x !== 0) {
						cursor_x--;
						direction = 'left';
					} else if (grid[cursor_y][cursor_x + 1] !== ' ' && cursor_x + 1 !== grid_width) {
						cursor_x++;
						direction = 'right';
					} else {
						end_of_line = true;
					}
				} else {
					if (grid[cursor_y - 1][cursor_x] !== ' ' && cursor_y !== 0) {
						cursor_y--;
						direction = 'up';
					} else if (grid[cursor_y + 1][cursor_x] !== ' ' && cursor_y + 1 !== grid_height) {
						cursor_y++;
						direction = 'down';
					} else {
						end_of_line = true;
					}
				}
			}
		}
		
		if (path_characters.includes(grid[cursor_y][cursor_x]) === false) {
			if (grid[cursor_y][cursor_x] === ' ') {
				end_of_line = true;
			} else {
				sequence.push(grid[cursor_y][cursor_x]);
			}
		}
		
		steps++;
	}
	
	console.log(cowsay.say({text: sequence.join('') + ' in ' + steps + ' steps '}));
	
});