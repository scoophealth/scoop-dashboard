// This is an abstract class meant to be extended and implemented.
class Bargraph extends Graph {
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

}

var config = new Config();
var bargraph = new Bargraph(config);
console.log(bargraph.config);
