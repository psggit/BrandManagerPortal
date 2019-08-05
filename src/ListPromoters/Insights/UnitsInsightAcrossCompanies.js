
import React from 'react';
import { Doughnut } from 'react-chartjs-2'
import { colors } from "Utils/helpers"

export default function UnitsInsightAcrossCompanies(props) {
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