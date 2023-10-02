import * as d3 from 'd3';
import axios from 'axios';
import '../App.css';
import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
function Homepage() {
  useEffect (() =>{
    function Chart_create (data){
            
      console.log(data);
      // Set up the dimensions and radius for the pie chart
      var width = 400;
      var height = 400;
      var radius = Math.min(width, height) / 2;

      // Create an SVG element
      var svg = d3.select("#chart")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      // Define a color scale
      var color = d3.scaleOrdinal()
          .range(["#ffcd56", "#ff6384", "#36a2eb", "#fd6b19", "#000080", "#800080", "#808080", "#a52a2a", "#5f9ea0"]);

      // Define the pie layout
      var pie = d3.pie()
          .value(function(d) { return d.budget; });

      // Create an arc generator
      var arc = d3.arc()
          .innerRadius(0)
          .outerRadius(radius);

      // Bind the data to the SVG elements
      var arcs = svg.selectAll("arc")
          .data(pie(data))
          .enter()
          .append("g");

      // Append the arcs to the SVG and add colors
      arcs.append("path")
          .attr("d", arc)
          .attr("fill", function(d) { return color(d.data.title); });

      // Add labels to the arcs
      arcs.append("text")
          .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
          .attr("text-anchor", "middle")
          .text(function(d) { return d.data.title; });
  }
    var dataSource = {
      datasets: [
          {
              data: [],
              backgroundColor: [
                  '#ffcd56',
                  '#ff6384',
                  '#36a2eb',
                  '#fd6b19',
              ]
          }
      ],
      labels: []
  };

function createChart() {
  var ctx = document.getElementById('myChart').getContext('2d');
  const prevchart=Chart.getChart(ctx);
  if (prevchart) {prevchart.destroy();}
 new Chart(ctx, {
      type: 'pie',
      data: dataSource
  });
  
}

function getBudget() {
  axios.get('http://localhost:8000/budget')
  .then(function (res) {
      for (var i = 0; i < res.data.myBudget.length; i++) {
          dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
          dataSource.labels[i] = res.data.myBudget[i].title;
          createChart();
          Chart_create(res.data.myBudget)
      }
  });
}

getBudget();
  })
  return (
    <main className="center" id="main">

    <div className="page-area">

        <article>
            <h1>Stay on track</h1>
            <p>
                Ever wondered where your money goes? It's easy to lose track, but effective budget management relies on real data. Our app is here to assist you in gaining clarity about your spending habits!
            </p>
        </article>

        <article>
            <h1>Alerts</h1>
            <p>
                "Imagine running out of your clothing budget unexpectedly. With our app, you'll receive timely alerts to ensure you never exceed your budgetary limits."                </p>
        </article>

        <article>
            <h1>Results</h1>
            <p>
                Individuals who diligently follow a financial plan, carefully tracking their expenses, find themselves on a faster path to financial freedom. Moreover, they enjoy a more content and worry-free life, spending without anxiety or guilt, knowing their finances are well-managed and secure.
            </p>
        </article>

        <article>
            <h1>Free</h1>
            <p>
                This application is entirely cost-free! Plus, you have full control over your data, ensuring your privacy and security.                </p>
        </article>

        

        <article>
            
        </article>

        

        <article>
            <h1>Chart</h1>
            <p>
                <canvas id="myChart" width="20" height="20"></canvas>
                 <li><a href="chart.html">"Click here to view the budget chart "</a></li> 
            </p>
                
        </article>
        <div id="chart"></div>
    </div>

</main>
  );
}

export default Homepage;