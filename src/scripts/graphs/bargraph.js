// This is an abstract class meant to be extended and implemented.
class Bargraph extends Graph {
    // Initialize Graph.
    constructor(config) {
        super(config);
    }

    // (Re)draws the graph.
    draw() {
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = this.config.width - margin.left - margin.right,
            height = this.config.height - margin.top - margin.bottom;

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], 0.1);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10, "%");

        var svg = d3.select(this.config.element).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(this.config.data.map(function(d) { return d.letter; }));
        y.domain([0, d3.max(this.config.data, function(d) { return d.value; })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Frequency");

        svg.selectAll(".bar")
            .data(this.config.data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.letter); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); });

        function type(d) {
          d.value = +d.value;
          return d;
        }
    }

    remove() {

    }

    // Other
}

var config = new Config();
var bargraph = new Bargraph(config);
bargraph.draw();
console.log(bargraph.config);
