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
    let lengths = data.split(",");
    for (i = 0; i < lengths.length; i++) {
        lengths[i] = parseInt(lengths[i]);
    }
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


readFile('input.txt').then(function (raw_input) {
    let lengths = parseData(raw_input);
    console.log(lengths);
    let list = generateList(256);
    console.log('[', list.toString(), ']');

    let start_point = 0;
    let skip_size = 0;
    let end_point;

    for (let i of lengths) {
        if (i === 0) {
            end_point = start_point;
        } else {
            end_point = getNextPoint(start_point, i, list.length, 0);

            list = modifyList(list, start_point, end_point);
            console.log('[', list.toString(), ']');

        }
        start_point = getNextPoint(start_point, i, list.length, skip_size);

        skip_size++;

    }

    console.log(list[0] * list[1]);

});