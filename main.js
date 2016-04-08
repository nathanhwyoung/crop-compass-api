// var margin = {
//   top: 20,
//   right: 50,
//   bottom: 30,
//   left: 70
// }
//
// var width = 1000 - margin.left - margin.right;
// var height = 500 - margin.top - margin.bottom;
//
// var dataset;
//
// d3.json("http://api.cropcompass.org/data/subsidy_dollars", function(error, json) {
//   if (error) return console.warn(error);
//   dataset = json;
//   console.log(dataset);
// });

// d3.select("#content")
//   .selectAll("div")
//     .data(dataset)
//   .enter().append("div")
//     .style("width", function(d) { return d.subsidy_dollars + "px"; })
//     .text(function(d) { return d; });

//begin script when window loads
window.onload = initialize();

//the first function called once the html is loaded
function initialize() {
    setMap();
};

//set choropleth map parameters
function setMap() {
    //use queue.js to parallelize asynchronous data loading
    queue()
        // .defer(d3.csv, “data / unitsData.csv”) //load attributes from csv
        .defer(d3.json, “data / oregon.topojson”) //load
        .await(callback); //trigger callback function once data is loaded

    function callback(error, csvData, europeData, franceData) {
        console.log();
    };
}
