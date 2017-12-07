const fs = require('fs');

class Node {
    constructor(name, weight, connections) {
        this.name = name;
        this.weight = weight;
        this.connections = {};
        for (let c of connections) {
            this.connections[c] = null;
        }
    }
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

function populateTree(data) {
    return new Promise (resolve => {
        tree = {};
        node_strings = data.match(/[^\r\n]+/g);

        for (let i of node_strings) {
            node_array = i.match(/[^\s()\->,]+/g);
            connections = node_array.slice(2);
            tree[node_array[0]] = new Node(node_array[0], parseInt(node_array[1]), connections);
        }

        resolve(tree);
    })
}

function connectTree(tree) {
    return new Promise (resolve => {
        tree_nodes = Object.keys(tree);

        for (let i of tree_nodes) {
            connected = (Object.keys(tree[i].connections));

            for (let j of connected) {
                tree[i].connections[j] = tree[j];
            }
        }

        resolve(tree);
    })
}

function findRoot(tree) {
    tree_nodes = Object.keys(tree);
    rejected = [];

    for (let i of tree_nodes) {
        for (let j of Object.keys(tree[i].connections)) {
                rejected.push(j);
        }
    }


    for (let i of tree_nodes) {
        if (!(rejected.includes(i))) {
            return i
        }
    }
}

readFile('input.txt').then(function (raw_input) {
    populateTree(raw_input).then(function (nodes) {
        connectTree(nodes).then(function (connected_tree) {
            console.log(findRoot(connected_tree));
        });
    });

});