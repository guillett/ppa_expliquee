var signs = [1, 1, 1, -1, -1, -1];

function generateWaterfallData(raw) {
  return d3.zip(raw, signs).map(function(pair) {
    return Object.assign({}, pair[0], { value: pair[0].value * pair[1] });
  }).reduce(function(accum, current) {
    var previous = accum[accum.length - 1];
    var next = { start: previous.end, end: previous.end + current.value };
    if (next.start < next.end) {
      next.side = 1;
      next.down = next.start;
      next.up = next.end;
    } else {
      next.side = -1;
      next.down = next.end;
      next.up = next.start;
    }
    accum.push(Object.assign(next, current));
    return accum;
  }, [{ end: 0 }]).slice(1);
}

function waterfallChart(parent, dimensions) {
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

  function waterfallChart() { }

  waterfallChart.data = function(_) {
      return arguments.length ? (data = _, waterfallChart) : data;
  }

  waterfallChart.refresh = function(data) {
      var waterfall = generateWaterfallData(data);

      x.range([0, dimensions.width / 8 * data.length])
      x.domain(waterfall.map(function(d) { return d.name; }));
      xAxisGroup.call(xAxis);


      xAxisGroup.selectAll(".tick text")
          .call(wrap, x.step());

      svg.select(".title").attr("x", x(waterfall[0].name))

      y.domain([
          d3.min(waterfall, function(d) { return d3.min([d.start, d.end]); }),
          d3.max(waterfall, function(d) { return d3.max([d.start, d.end]); })
      ]);
      yAxisGroup.call(yAxis);


      var elements = svg.selectAll(".bar")
          .data(waterfall, function(d) { return d.name; })


      function apply(elements) {
          elements.attr("class", function(d) { return "bar " + (d.side>=0 ? 'positive' : 'negative'); })
              .attr("x", function(d) { return x(d.name); })
              .attr("width", x.bandwidth())
              .attr("y", function(d) { return y(d.up); })
              .attr("height", function(d) { return y(d.down) - y(d.up); });
      }

      elements.enter().append("rect").call(apply);
      elements.call(apply);
      elements.exit().remove();

      return waterfallChart;
  }

  waterfallChart.title = function(_) {
    return arguments.length ? (title.text(_), waterfallChart) : title.text();
  };

  return waterfallChart;
}
