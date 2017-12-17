const fs = require('fs');

class danceGroup {
    constructor(members) {
        this.members = members.split('');
    }

    parseInstruction(instruction) {
        if (instruction[0] === 's') {
            this.spin(parseInt(instruction.slice(1), 10));

        } else if (instruction[0] === 'x') {
            let params = instruction.slice(1).split('/');
            this.exchange(parseInt(params[0], 10), parseInt(params[1], 10));

        } else if (instruction[0] === 'p') {
            this.partner(instruction[1], instruction[3]);
        }
    }

    spin(num) {
        let to_spin = this.members.slice(this.members.length - num);
        this.members = this.members.slice(0, this.members.length - num);

        this.members.unshift(...to_spin);
    }

    exchange(a_position, b_position) {
        let a = this.members[a_position];
        let b = this.members[b_position];

        this.members[a_position] = b;
        this.members[b_position] = a;
    }

    partner(a, b) {
        let a_index = this.members.indexOf(a);
        let b_index = this.members.indexOf(b);

        this.members[a_index] = b;
        this.members[b_index] = a;
    }
}


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

readFile('input.txt').then(function (dance_moves) {
    let dancers = new danceGroup('abcdefghijklmnop');
    for (let i of dance_moves) {
        dancers.parseInstruction(i);
    }

    console.log(dancers.members.join(''));
});

