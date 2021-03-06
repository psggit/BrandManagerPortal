
import React from 'react';
import { Bar } from 'react-chartjs-2'
import { colors } from "Utils/helpers"

export default function GenreBasedUnitsInsightAcrossCompanies(props) {
  const labels = props.data.reduce((a, b) => {
    a.push(b.genre_name)
    return a
  }, [])

  const marketValues = props.data.reduce((a, b) => {
    a.push(b.percentage.toFixed(2))
    return a
  }, [])

  const shareValues = props.data.reduce((a, b) => {
    a.push((100 - b.percentage).toFixed(2))
    return a
  }, [])

  const options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Quantity",
            fontSize: 20
          }
        }
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Genres",
            fontSize: 20
          }
        }
      ]
    }
  }

  // const bgColors = []
  // for (let i = 0; i < props.data.length; i++) {
  //   bgColors.push(colors[i % colors.length])
  // }

  const data = {
    labels,
    datasets: [
      {
        label: "Genre",
        data: marketValues,
        backgroundColor: '#80e4e6'
      },
      {
        label: "Other Companies",
        data: shareValues,
        backgroundColor: '#f3f3f3'
      }
    ]
  }
  return (
    <div className="card">
      <p style={{ marginBottom: "10px" }}>Across Genres</p>
      <Bar
        data={data}
        width={100}
        height={250}
        redraw={false}
        options={options}
      // options={{
      //   maintainAspectRatio: false,
      // }}
      />
    </div>
  )
}