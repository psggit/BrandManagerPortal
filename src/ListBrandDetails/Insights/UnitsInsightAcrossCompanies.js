
import React from 'react';
import { Doughnut } from 'react-chartjs-2'
import { colors } from "Utils/helpers"

export default function UnitsInsightAcrossCompanies(props) {
  var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
  Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
    draw: function () {
      originalDoughnutDraw.apply(this, arguments);

      var chart = this.chart.chart;
      var ctx = chart.ctx;
      var width = chart.width;
      var height = chart.height;

      var fontSize = (height / 150).toFixed(2);
      ctx.font = fontSize + "em Verdana";
      ctx.textBaseline = "middle";

      var text = chart.config.data.text.split("\ "),
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;

      ctx.fillText(text[0] ? text[0] : "", width / 1.83 - (ctx.measureText(text[0]).width), textY);
      ctx.fillText(text[1] ? text[1] : "", width / 1.86 - (ctx.measureText(text[0]).width), height / 1.7);
    }
  });

  const labels = props.data.reduce((a, b) => {
    a.push(b.company_name)
    return a
  }, [])

  const values = props.data.reduce((a, b) => {
    a.push(b.percentage.toFixed(2))
    return a
  }, [])

  const bgColors = []
  for (let i = 0; i < props.data.length; i++) {
    bgColors.push(colors[i % colors.length])
  }

  const data = {
    labels,
    datasets: [{
      data: values,
      backgroundColor: bgColors,
      hoverBackgroundColor: bgColors
    }],
    text: "Store Pickup"
  }

  return (
    <div className="card">
      {/* <p style={{ marginBottom: "10px" }}>Revenue across genres</p> */}
      <Doughnut data={data} />
    </div>
  )
}