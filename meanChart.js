function meanChart(parent, dimensions) {
  var svg = parent.append("svg")
      .attr("width", dimensions.width + dimensions.margin.left + dimensions.margin.right)
      .attr("height", dimensions.height + dimensions.margin.top + dimensions.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data;

  var x = d3.scaleBand([0, dimensions.width])
      .padding(0.1);

  var y = d3.scaleLinear()
      .range([height, 0]);

  var xAxis = d3.axisBottom()
      .scale(x);

  var yAxis = d3.axisLeft()
      .scale(y)
      .ticks(8);

  var title = svg.append("text")
      .attr("class", "title")
      .attr("y", -26);

  var xAxisGroup = svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")");

  var yAxisGroup = svg.append("g")
      .attr("class", "y axis");

  function meanChart() { }

  meanChart.data = function(_) {
      return arguments.length ? (data = _, meanChart) : data;
  }

  meanChart.refresh = function(data) {
      x.range([0, dimensions.width / 8 * data.length])
      x.domain(data.map(function(d) { return d.name; }));
      xAxisGroup.call(xAxis);


      xAxisGroup.selectAll(".tick text")
          .call(wrap, x.step());

      svg.select(".title").attr("x", x(data[0].name))

      y.domain([
          0,
          d3.max(data, function(d) { return d.value; })
      ]);
      yAxisGroup.call(yAxis);

      var elements = svg.selectAll(".bar")
          .data(data, function(d) { return d.name; })

      function apply(elements) {
        elements.attr("class", function(d) { return "bar " + (d.side<0 ? 'negative' : ''); })
          .attr("x", function(d) { return x(d.name); })
          .attr("width", x.bandwidth())
          .attr("y", function(d) { return y(d.value); })
          .attr("height", function(d) { return y(0) - y(d.value); });

      }

      elements.enter().append("rect").call(apply);
      elements.call(apply);
      elements.exit().remove();

      return meanChart;
  }

  meanChart.title = function(_) {
    return arguments.length ? (title.text(_), meanChart) : title.text();
  };

  return meanChart;
}
