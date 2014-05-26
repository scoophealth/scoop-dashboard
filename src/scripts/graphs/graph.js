// This is an abstract class meant to be extended and implemented.
class Graph {
    // Initialize Graph.
    constructor(config) {
        if (config instanceof Config) {
            this.config = config;
        } else {
            // This will fail if the config is invalid.
            this.config = new Config(config);
        }
    }

    // (Re)draws the graph.
    draw() {}
    remove() {}
}

var config = new Config();
var graph = new Graph(config);
console.log(graph.config);