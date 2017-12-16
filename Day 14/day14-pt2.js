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
    let lengths = [];

    for (i = 0; i < data.length; i++) {
        lengths.push(data[i].charCodeAt(0));
    }

    lengths.push(17, 31, 73, 47, 23);
    return lengths;
}

function getNextPoint(current_position, length, max, skip_size) {
    let next_point = current_position + length + skip_size;

    if (next_point >= max) {
        next_point -= max*(Math.floor(next_point/max));
    }

    return next_point;
}

function modifyList(list, start_point, end_point) {
    let sublist = [];

    if (start_point >= end_point) {
        sublist.push(...list.slice(start_point));
        sublist.push(...list.slice(0, end_point));
    } else {
        sublist.push(...list.slice(start_point, end_point));
    }


    for (i = 0; i < sublist.length; i++) {
        let next_position = end_point - i - 1;

        if (next_position < 0) {
            next_position += list.length*(Math.ceil(Math.abs(next_position)/list.length));
        }

        list[next_position] = sublist[i];
    }


    return list;
}

function generateList(size) {
    let list = [];
    for (i = 0; i < size; i++) {
        list.push(i)
    }
    return list;
}

function genSparseHash(list, lengths) {
    let start_point = 0;
    let skip_size = 0;
    let end_point;

    for (round = 0; round < 64; round++) {
        for (let i of lengths) {
            if (i === 0) {
                end_point = start_point;
            } else {
                end_point = getNextPoint(start_point, i, list.length, 0);

                list = modifyList(list, start_point, end_point);
            }

            start_point = getNextPoint(start_point, i, list.length, skip_size);
            skip_size++;

        }
    }

    return list;
}

function genDenseHash(sparse_hash) {
    let dense_hash = [];

    for (i = 0; i < 16; i++) {
        let slice = sparse_hash.slice(i * 16, (i * 16) + 16);
        let knot = parseInt(slice[0]);

        for (j = 1; j < 16; j++) {
            knot = knot ^ parseInt(slice[j]);
        }

        dense_hash.push(knot);
    }

    return dense_hash;
}

function genHexString(hash) {
    let hex = "";

    for (let i of hash) {
        let hex_byte = i.toString(16);

        if (hex_byte.length === 1) {
            hex_byte = '0' + hex_byte;
        }
        hex += hex_byte;
    }

    return hex;
}

function genBinString(hash) {
    let bin = "";

    for (let i of hash) {
        let bin_byte = i.toString(2);

        while (bin_byte.length < 8) {
            bin_byte = '0' + bin_byte;
        }

        bin += bin_byte;
    }

    return bin;
}

function genGrid(hash) {
    let grid = [];

    for (let i = 0; i < 128; i++) {
        let lengths = parseData(hash + '-' + parseInt(i, 10));
        let list = generateList(256);
        let sparse_hash = genSparseHash(list.slice(), lengths);
        let dense_hash = genDenseHash(sparse_hash);

        grid.push(genBinString(dense_hash).split(''));
    }

    return grid;
}

function labelPixel(grid, labels, max, row, col) {
    let left_pixel;
    let left_pixel_label;
    let top_pixel;
    let top_pixel_label;
    let label;

    if (row === 0) {
        top_pixel = 0;
        top_pixel_label = 0;
    } else {
        top_pixel = grid[row - 1][col];
        top_pixel_label = labels[row - 1][col];
    }

    if (col === 0) {
        left_pixel = 0;
        left_pixel_label = 0;
    } else {
        left_pixel = grid[row][col - 1];
        left_pixel_label = labels[row][col - 1];
    }


    if (left_pixel === 0 && top_pixel === 0) {
        label = max + 1;

    } else if ((left_pixel === 1) && (top_pixel === 1)) {
        if (left_pixel_label < top_pixel_label) {
            label = left_pixel_label;

        } else {
            label = top_pixel_label;
        }

    } else if (left_pixel === 1) {
        label = left_pixel_label;

    } else {
        label = top_pixel_label;
    }

    return label;
}

function findRegions(grid) {
    let labels = [];
    let max = 0;

    for (let i = 0; i < 128; i++) {
        let row = [];
        for (let j = 0; j < 128; j++) {
            row.push(0);
        }
        labels.push(row);
    }

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === '1') {
                let next_label = labelPixel(grid, labels, max, row, col);
                labels[row][col] = next_label;

                if (max < next_label) {
                    max = next_label;
                }
                console.log(max);
            }
        }
    }

    return labels[0].toString();
}

readFile('input.txt').then(function (raw_input) {
    console.log(findRegions(genGrid(raw_input)));

});