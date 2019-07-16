import React, { useState, useEffect } from "react"
import InsightAcrossRevenue from "./AcrossRevenue"
import { fetchSalesInsight } from "../../Api"
import InsightAcrossGenres from "./AcrossGenres";
import InsightAcrossUnits from "./AcrossUnits";
import "./insights.scss"

export default function Insight() {
  const [acrossRevenue, setAcrossRevenue] = useState([])
  const [acrossGenres, setAcrossGenres] = useState([])
  useEffect(() => {
    fetchSalesInsight({})
      .then(json => {
        setAcrossGenres(json.insights.across_genres)
        setAcrossRevenue(json.insights.across_revenue_and_units_sold)
      })
  }, [])

  return (
    <div>
      <div className="flex--row">
        <div className="flex--col across--revenue">
          <InsightAcrossRevenue data={acrossRevenue} />
        </div>
        <div className="flex--col across--genres">
          <InsightAcrossUnits data={acrossRevenue} />
        </div>
      </div>
      <InsightAcrossGenres data={acrossGenres} />
    </div>
  )
}