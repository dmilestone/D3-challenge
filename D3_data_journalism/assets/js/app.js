var svgWidth = 960;
var svgHeight = 500;


// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
    .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

// Append an svg group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


//Read the data
d3.csv("assets/data/data.csv").then(function(stateData) {
  stateData.forEach(function(data) {
    data.age=+data.age;
    data.income=+data.income;
  });
  console.log(stateData);

  // create scales
    var xTimeScale = d3.scaleTime()
      .domain(d3.extent(stateData, d => d.age))
      .range([0, width]);

      var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(stateData, d => d.income)])
        .range([height, 0]);
        
  // // create ticks
    var xAxis = d3.axisBottom(xTimeScale).ticks(6);
    var yAxis = d3.axisLeft(yLinearScale).ticks(6);
  
  // append axes
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    chartGroup.append("g")
      .call(yAxis);

  // append circles
      var circlesGroup = chartGroup.selectAll("circle")
        .data(stateData)
        .enter()
        .append("circle")
        .attr("cx", d => xTimeScale(d.age))
        .attr("cy", d => yLinearScale(d.income))
        .attr("r", "10")
        .attr("fill", "gold")
        .attr("stroke-width", "1")
        .attr("stroke", "black");

 var tool_tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-8, 0])
      .html(function(d) {'<strong>${d.age}</strong>'});
    svg.call(tool_tip);
    
    // Now render the SVG scene, connecting the tool tip to each circle.
    circlesGroup.on('mouseover', tool_tip.show)
      .on('mouseout', tool_tip.hide);

       // Step 1: Append a div to the body to create tooltips, assign it a class
  // =======================================================
  var toolTip = d3.select("body").append("div")
    .attr("class", "tooltip");
// call the toolTip function.
  circlesGroup.call(toolTip);


    // Step 3: Add an onmouseout event to make the tooltip invisible
    // .on("mouseout", function() {
    //   toolTip.style("display", "none");
    // });
 }).catch(function(error) {
   console.log(error);
 });


// }
// );


// // When the browser loads, makeResponsive() is called.
// makeResponsive();

// // When the browser window is resized, makeResponsive() is called.
// d3.select(window).on("resize", makeResponsive);


// // Add dots
// svg.append('g')
//   .selectAll("dot")
//   .data([stateData])
//   .enter()
//   .append("circle")
//     .attr("cx", function (d) { return x(d.age); } )
//     .attr("cy", function (d) { return y(d.income); } )
//     .attr("r", 1.5)
//     .style("fill", "#69b3a2")
