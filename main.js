var width = 1000;
var height = 500;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g");
// .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var countyName = "Baker";
// var countyName = document.getElementById('countySelect');



d3.json("http://api.cropcompass.org/data/nass_commodity_area?region=" + countyName, function(d) {
    d.data.sort(function(a, b) {
        return b.acres - a.acres;
    });

	// THIS WILL NEED TO BE CHANGED ONCE TOTAL ACRES IS OUT OF THE RETURNED DATASET
    var dataset = [d.data[1], d.data[2], d.data[3], d.data[4], d.data[5]];

    // THESE VALUES WILL NEED TO BE PLAYED WITH
    var xScale = d3.scale.linear()
        .domain([0, d3.max(dataset)])
        .range([0, 420]);

    var yScale = d3.scale.linear()
        .domain([0, dataset.length])
        .range([0, 100]);

    // console.log(d.data[0].commodity + " " +
    // 			d.data[1].commodity + " " +
    // 			d.data[2].commodity + " " +
    // 			d.data[3].commodity + " " +
    // 			d.data[4].commodity);

    d3.select(".chart")
        .selectAll("div")
        .data(dataset)
        .enter()
		.append("div")
        .style("width", function(d) {
            return (d.acres/100) + "px";
        })
        // .text(function(d) {
        //     return d;
        // });

    // var bars = svg.selectAll("div")
    //     .data(dataset)
    //     .enter()
    //     .append("div")
    // 	.attr({
    // 		'height': '20px',
    // 		'width': function(d) { return xScale(d) + "px"},
    // 		'x': 50,
    // 		'y': 50
    // 	})
    // 	.attr("fill", "black");

    console.log(dataset);

    // d3.select("#countySelect").on("input", function() {
    // 	update(+this.value);
    // });
})
