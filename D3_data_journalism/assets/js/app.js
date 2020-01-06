var svgWidth = 980;
var svgHeight = 620;


// set the dimensions and margins of the graph
var margin = {top: 60, right: 40, bottom: 100, left: 100};

var width = svgWidth - margin.right - margin.left;
var height = svgHeight - margin.top - margin.bottom;

var chart = d3.select("#scatter").append("div").classed("chart", true);

// append the svg object to the body of the page
var svg = chart.append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append an svg group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//TRYING THIS
d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);


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

  // text label for the x axis
  svg.append("text")             
      .attr("transform",
            "translate(" + (svgWidth/2) + " ," + 
                           (height + margin.top + 40) + ")")
      .style("text-anchor", "end")
      .text("Age (Years)");

    chartGroup.append("g")
      .call(yAxis);

               // text label for the y axis
   svg.append("text")
   .attr("transform", "rotate(-90)")
   .attr("cy", 0 - margin.left + 40)
   .attr("cx", 0 - (height))
   .attr("dy", "1em")
   .attr("text-anchor", "end")
   .text("Income in US Dollars ($)")
  // svg.append("text")
  // .attr("text-anchor", "end")
  // .attr("transform", "rotate(-90)")
  // .attr("cy", -margin.left+20)
  // .attr("cx", -margin.top)
  // .text("Income")

  // append circles
      var circlesGroup = chartGroup.selectAll("circle")
        .data(stateData)
        .enter()
        .append("circle")
        .attr("cx", d => xTimeScale(d.age))
        .attr("cy", d => yLinearScale(d.income))
        .attr("r", "10")
        .attr("fill", "cyan")
        .attr("stroke-width", "1")
        .attr("stroke", "black");

 var tool_tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-8, 0])
      .html(function(d) {`<strong>${d.age}</strong>`});
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
