import React, { useState, useEffect } from "react"
import InsightAcrossRevenue from "./AcrossRevenue"
import { fetchSalesInsight } from "../../Api"
import RevenueInsightAcrossGenres from "./RevenueInsightAcrossGenres";
import UnitsInsightAcrossGenres from "./UnitsInsightAcrossGenres"
import InsightAcrossUnits from "./AcrossUnits";
import "./insights.scss"

export default function Insight() {
  const [acrossRevenue, setAcrossRevenue] = useState([])
  const [revenueAcrossGenres, setRevenueAcrossGenres] = useState([])
  const [unitsAcrossGenres, setUnitsAcrossGenres] = useState([])

  useEffect(() => {
    fetchSalesInsight({})
      .then(json => {
        setRevenueAcrossGenres(json.insights.across_genres.revenue)
        setUnitsAcrossGenres(json.insights.across_genres.units)
        setAcrossRevenue(json.insights.across_revenue_and_units_sold)
      })
  }, [])

  return (
    <div>
      <div className="flex--row">
        <div className="flex--col across--revenue">
          <InsightAcrossRevenue data={acrossRevenue} />
        </div>
        <div className="flex--col across--units">
          <InsightAcrossUnits data={acrossRevenue} />
        </div>
      </div>
      <div className="flex--row">
        <div className="flex--col across--genres__revenue">
          <RevenueInsightAcrossGenres data={revenueAcrossGenres} />
        </div>
        <div className="flex--col across--genres__units">
          <UnitsInsightAcrossGenres data={unitsAcrossGenres} />
        </div>
      </div>
    </div>
  )
}