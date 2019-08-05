
import React from 'react';
import { Doughnut } from 'react-chartjs-2'
import { colors } from "Utils/helpers"

export default function UnitsInsightAcrossCompanies(props) {
  // some of this code is a variation on https://jsfiddle.net/cmyker/u6rr5moq/
  let originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
  Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
    beforeDraw: function () {
      originalDoughnutDraw.apply(this, arguments);

      let chart = this.chart;
      let width = chart.chart.width,
        height = chart.chart.height,
        ctx = chart.chart.ctx;
      // var centerConfig = chart.config.options.elements.center;
      // var sidePadding = centerConfig.sidePadding || 20;
      // var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
      // var stringWidth = ctx.measureText(txt).width;
      // var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      // var widthRatio = elementWidth / stringWidth;
      // var newFontSize = Math.floor(30 * widthRatio);
      // var elementHeight = (chart.innerRadius * 2);

      // Pick a new font size so it will not be larger than the height of label.
      // var fontSizeToUse = Math.min(newFontSize, elementHeight);

      // var fontSize = fontSizeToUse;
      // var fontSize = (height / 114).toFixed(2);
      // ctx.font = fontSize + "em sans-serif";
      // ctx.textBaseline = "middle";

      // var sum = 0;
      // for (var i = 0; i < chart.config.data.datasets[0].data.length; i++) {
      //   sum += chart.config.data.datasets[0].data[i];
      // }

      var text = "Store pickup",
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 1.75;

      ctx.fillText(text, textX, textY);
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
    }]
  }
  return (
    <div className="card">
      {/* <p style={{ marginBottom: "10px" }}>Revenue across genres</p> */}
      <Doughnut data={data} />
    </div>
  )
}