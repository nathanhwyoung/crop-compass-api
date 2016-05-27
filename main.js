var margin = {
    top: 20,
    right: 50,
    bottom: 30,
    left: 70
}

var width = 1000 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var countyName = "Washington";
	// var countyName = document.getElementById('countySelect');

d3.json("http://api.cropcompass.org/data/nass_commodity_area?region=" + countyName, function(d) {
		d.data.sort(function(a,b) {
			return b.acres - a.acres;
		});

		console.log(d.data[0].commodity + " " +
					d.data[1].commodity + " " +
					d.data[2].commodity + " " +
					d.data[3].commodity + " " +
					d.data[4].commodity);

		// d3.select("#countySelect").on("input", function() {
		// 	update(+this.value);
		// });
    })
