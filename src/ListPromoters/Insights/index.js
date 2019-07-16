import React, { useState, useEffect } from "react"
import InsightAcrossRevenue from "./AcrossRevenue"
import { fetchSalesInsight } from "../../Api"
import InsightAcrossGenres from "./AcrossGenres";
import InsightAcrossUnits from "./AcrossUnits";

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
      <InsightAcrossRevenue data={acrossRevenue} />
      <InsightAcrossUnits data={acrossRevenue} />
      <InsightAcrossGenres data={acrossGenres} />
    </div>
  )
}