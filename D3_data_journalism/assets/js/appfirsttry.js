// @TODO: YOUR CODE HERE!
// The code for the chart is wrapped inside a function
// that automatically resizes the chart
function makeResponsive() {

  // if the SVG area isn't empty when the browser loads, remove it
  // and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");
  if (!svgArea.empty()) {
    svgArea.remove();
  }

  // SVG wrapper dimensions are determined by the current width
  // and height of the browser window.
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };

  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;

  // data
  d3.csv("../data/data.csv").then(function(stateData) {
    // Step 4: Parse the data
  
    // Format the data
    stateData.forEach(function(data) {
      data.age = +data.age;
      data.income = +data.income;
      data.state = +data.state;
      console.log(data.state)
    });
  });

  // append svg and group
  var svg = d3.select(".scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // scales
  var xScale = d3.scaleLinear()
    .domain([0, d3.extent(stateData, d => d.age)])
    .range([0, width]);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(smurfData, d => d.income)])
    .range([height, 0]);

  // append circles to data points
  var circlesGroup = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => xScale(i))
    .attr("cy", d => yScale(d))
    .attr("r", "5")
    .attr("fill", "red");

  // Step 1: Append a div to the body to create tooltips, assign it a class
  // =======================================================
  var toolTip = d3.select("body").append("div")
    .attr("class", "tooltip");

  // Step 2: Add an onmouseover event to display a tooltip
  // ========================================================
  circlesGroup.on("mouseover", function(d, i) {
    toolTip.style("display", "block");
    toolTip.html(`State: <strong>${data.state[i]}</strong>`)
      .style("left", d3.event.pageX + "px")
      .style("top", d3.event.pageY + "px");
  })
    // Step 3: Add an onmouseout event to make the tooltip invisible
    .on("mouseout", function() {
      toolTip.style("display", "none");
    });
}
// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, responsify() is called.
d3.select(window).on("resize", makeResponsive);