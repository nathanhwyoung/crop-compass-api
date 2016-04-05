var margin = {
  top: 20,
  right: 50,
  bottom: 30,
  left: 70
}

var width = 800 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var filerId = 931;

var url = 'http://54.213.83.132/hackoregon/http/current_candidate_transactions_in/' + filerId + '/';

// note that I changed this to d3.json to show there's no difference
d3.json(url, function(json) {
  var data = json;
  var parseDate = d3.time.format('%Y-%m-%d').parse;
  var dataSet = data.map(function(item) {
    return {
      date: parseDate(item.tran_date),
      amount: +item.amount
    }
  })

  // we did not do this in class but when using d3.extent it's handy for min/max
  var dates = _.map(dataSet, 'date');
  // var amounts = _.map(dataSet, 'amount'); // only necessary if we use extent

  // defining the x and y values
  var x = d3.time.scale() // determined through d3.time.scale function
    .domain(d3.extent(dates)) // using the extent method on dates array
    .range([0, width]);
  var y = d3.scale.linear() // determined through d3.scale.linear function
    .domain([0, d3.max(dataSet, function(d) { // we tried this in class - it works
      return d.amount; // is there a difference though? try extent below and see
    })])
    // .domain(d3.extent(amounts)) // we had this in an array in class like [d3.extent...] and it should not have been
    .range([height, 0]);

  // we didn't get to this in class but this should be familiar
  var xAxis = d3.svg.axis().scale(x)
    .orient('bottom').ticks(6);
  var yAxis = d3.svg.axis().scale(y)
    .orient('left').ticks(10);

  // we attach the svg to the html here
  var svg = d3.select('#content').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  // .append('path') // we did this later but it can be chained here

  // we defined the domain here originally but it could have been above too so I did that to illustrate. Think of why that is and discuss on slack!
  // x.domain(d3.extent(dates))
  // y.domain([d3.extent(amounts)]) // should not have been an array

/*
* Our definition of path was originally on line 33
* Since there's confusion about placement, I want you to think about
* why it doesn't matter if we have this here or move it back to line 33
*/

/***** Start of path definition *****/

  // defining path function to draw the line
  var path = d3.svg.line() // using d3's line layout here
    .x(function(d) {
      return x(d.date) // Mistake was we had return d.date
    })
    .y(function(d) {
      return y(d.amount) // Mistake was we had return d.amount
    })

/*
*  If in the future you get intermittent NaN errors in your data,
*  we can use 2 d3 tools with .defined and !isNan methods below.
*  It should go before the interpolate after you return datum values.
*  !isNan() will give us only numbers
*/
    // .defined(function(d){ return !isNaN(d.value); })
    .interpolate('basis')

/***** End of path definition *****/

  // now we append the path to the svg - note the 2 different options
  svg.append('path') // if you append path above, this should be just svg
    // .datum(dataSet) // if you append the path above, you HAVE to do this
    .attr('class', 'line')
    .attr('d', path(dataSet)) // if you append the path above, you only pass in path function like .attr('d', path)

/*
*  Think about what happened on lines 90-93.
*  Discuss on slack.
*/

  // towards the end of the code we add the axes
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);
})
