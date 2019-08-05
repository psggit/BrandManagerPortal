
import React from 'react';
import { Bar } from 'react-chartjs-2'
import { colors } from "Utils/helpers"

export default function GenreBasedUnitsInsightAcrossCompanies(props) {
  const labels = props.data.reduce((a, b) => {
    a.push(b.genre_name)
    return a
  }, [])

  const marketValues = props.data.reduce((a, b) => {
    a.push(b.market.toFixed(2))
    return a
  }, [])

  const shareValues = props.data.reduce((a, b) => {
    a.push(b.share.toFixed(2))
    return a
  }, [])

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
        label: "Genre",
        data: marketValues,
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
        options={{
          maintainAspectRatio: false
        }}
      />
    </div>
  )
}