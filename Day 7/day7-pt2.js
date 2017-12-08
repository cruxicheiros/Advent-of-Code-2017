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
            return tree[i]
        }
    }
}

function getBranchWeight(start_node) {
	let branch_weight = start_node.weight
	let queue = [start_node]
	
	for (let i of queue) {
		for (let j of Object.keys(i.connections)) {
			queue.push(i.connections[j]);
			branch_weight += i.connections[j].weight;
		}
		
	}
	
	return branch_weight;
}

function findBadNode(tree) {
	let root_node = findRoot(tree);
	let queue = [root_node];
	let weight_history = [];
	
	for (let i of queue) {
		let weight_branches = {};
		let branch_weight = 0;

		for (let j of Object.keys(i.connections)) {
			branch_weight = getBranchWeight(i.connections[j]);
			if (weight_branches[branch_weight]) {
				weight_branches[branch_weight].push(i.connections[j]);
			} else {
				weight_branches[branch_weight] = [i.connections[j]];
			}
		}
		
		weight_history.push(weight_branches);
		
		if (Object.keys(weight_branches).length > 1) {
			for (j of Object.keys(weight_branches)) {
				if (weight_branches[j].length === 1) {
					queue.push(weight_branches[j][0]);
				}
			}
		} else {
			previous_weights = weight_history[queue.length - 2];
			weight_difference = Math.abs(Object.keys(previous_weights)[0] - Object.keys(previous_weights)[1])
			fixed_weight = i.weight - weight_difference;
			return (i.name + " should weigh " + fixed_weight);
		}
	}
	
}

readFile('input.txt').then(function (raw_input) {
    populateTree(raw_input).then(function (nodes) {
        connectTree(nodes).then(function (connected_tree) {
            console.log(findBadNode(connected_tree));
        });
    });

});