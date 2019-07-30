
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default function UnitInsightAcrossGenres(props) {
  const labels = props.data.reduce((a, b) => {
    a.push(b.genre_name)
    return a
  }, [])

  const values = props.data.reduce((a, b) => {
    a.push(b.percentage)
    return a
  }, [])
  const data = {
    labels,
    datasets: [{
      data: values,
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ]
    }]
  }
  return (
    <div className="card">
      <p style={{ marginBottom: "10px" }}>Units sold across genres</p>
      <Doughnut data={data} />
    </div>
  )
}