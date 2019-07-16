import React from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
  {
    name: 'Page A', X: 4000
  },
  {
    name: 'Page B', X: 3000
  },
  {
    name: 'Page C', X: 2000
  },
  {
    name: 'Page D', X: 2780
  },
  {
    name: 'Page E', X: 1890
  },
  {
    name: 'Page F', X: 2390
  },
  {
    name: 'Page G', X: 3490, pv: 4300, amt: 2100,
  },
]

export default function RevenueAndUnitsArea() {
  return (
    <div>
      <AreaChart
        width={document.body.offsetWidth - 100}
        height={400}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="X" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </div>
  )
}