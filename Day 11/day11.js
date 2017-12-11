const inverses = {
    'n' : 's',
    'ne' : 'sw',
    'se' : 'nw',
    's' : 'n',
    'sw' : 'ne',
    'nw' : 'se'
};

const adjacents = {
    'n' : ['nw', 'ne'],
    'ne' : ['n', 'se'],
    'se' : ['ne', 's'],
    's' : ['se', 'sw'],
    'sw' : ['s', 'nw'],
    'nw' : ['sw', 'n']
};

class HexNode {
    constructor(x, y, n = null, ne = null, nw = null, s = null, se = null, sw = null) {
        this.x = 0;
        this.y = 0;

        this.connections = {
            'n' : n,
            'ne' : ne,
            'nw' : nw,
            's' : s,
            'se' : se,
            'sw' : sw
        }
    }

    checkConnection(direction) {
        let connected = false;

        if (this.connections[direction] === null) { //If I can't find a connection, I need to check that there isn't one.
            let left_adjacent = this.connections[adjacents[direction][0]];
            let right_adjacent = this.connections[adjacents[direction][1]];
            let centre_node = null;

            if (left_adjacent !== null) { // Checks the 'left' adjacent node.
                centre_node = left_adjacent.connections[adjacents[direction][1]]; //The node to the right of the left adjacent will be the one I'm looking for.
            }
            if (right_adjacent !== null && centre_node === null) { // Checks the 'right' adjacent node, if the centre hasn't already been found
                centre_node = right_adjacent.connections[adjacents[direction][0]]; //The node to the left of the right adjacent will be the one I'm looking for.
            }

            if (centre_node !== null) {
                this.connections[direction] = centre_node;
                centre_node.connections[inverses[direction]] = this;
                connected = true
            }
        } else {
            connected = true;
        }

        return connected;
    }
}


class Graph {
    constructor() {
        this.nodes = [new HexNode()];
    }

    addNode(parent, direction) {
        let new_node = new HexNode();

        new_node.connections[inverses[direction]] = parent;
        parent.connections[direction] = new_node;

        this.nodes.push(new_node);
    }
}

let graph = new Graph();
let steps = ['ne','ne','ne'];
let current_node = graph.nodes[0];

for (let i of steps) {
    if (current_node.checkConnection(i)) {
        current_node = current_node.connections[i];
    } else {
        graph.addNode(current_node, i);
        current_node = current_node.connections[i];
    }
}

console.log(graph.nodes);