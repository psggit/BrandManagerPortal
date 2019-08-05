import React, { useState, useEffect } from "react"
import InsightAcrossRevenue from "./AcrossRevenue"
import { fetchSalesInsight } from "../../Api"
import RevenueInsightAcrossGenres from "./RevenueInsightAcrossGenres";
import UnitsInsightAcrossGenres from "./UnitsInsightAcrossGenres"
import InsightAcrossUnits from "./AcrossUnits";
import UnitsSoldAcrossCompanies from "./UnitsInsightAcrossCompanies";
import GenreBasedUnitsSoldAcrossCompanies from "./GenreBasedUnitsInsightAcrossCompanies";
import "./insights.scss"

export default function Insight(props) {
  const [acrossRevenue, setAcrossRevenue] = useState([])
  const [revenueAcrossGenres, setRevenueAcrossGenres] = useState([])
  const [unitsAcrossGenres, setUnitsAcrossGenres] = useState([])
  const [unitsAcrossCompanies, setUnitsAcrossCompanies] = useState([])
  const [genreBasedUnitsAcrossCompanies, setGenreBasedUnitsAcrossCompanies] = useState([])

  const salesInsightReq = {
    body: {}
  }

  if (props.city_id || (props.from_date && props.to_date) || props.state_short_name) {
    if (props.state_short_name.length > 0) {
      salesInsightReq.body.state_short_name = props.state_short_name
    }

    if (props.city_id != 0) {
      salesInsightReq.body.city_id = parseInt(props.city_id)
    }

    if (typeof props.from_date == "object" && typeof props.to_date == "object") {
      salesInsightReq.body.from_date = props.from_date.toJSON().slice(0, 10)
      salesInsightReq.body.to_date = props.to_date.toJSON().slice(0, 10)
    }
  }

  useEffect(() => {
    fetchSalesInsight(salesInsightReq)
      .then(json => {
        setRevenueAcrossGenres(json.insights.across_genres.revenue)
        setUnitsAcrossGenres(json.insights.across_genres.units)
        setAcrossRevenue(json.insights.across_revenue_and_units_sold)
        setUnitsAcrossCompanies([
          {
            company_name: json.insights.company_name,
            percentage: json.insights.share
          },
          {
            company_name: 'others',
            percentage: 100 - json.insights.share
          }
        ])
        setGenreBasedUnitsAcrossCompanies(json.insights.genre_distribution)
      })
  }, [
      props.city_id,
      props.state_short_name,
      props.from_date,
      props.to_date
    ])

  return (
    <div>
      <h3 className="heading">Sales and revenue distribution</h3>
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
      <div className="flex--row">
        {/* <div className="flex--col across--genres__revenue">
          <UnitsSoldAcrossCompanies data={unitsAcrossCompanies} />
        </div>
        <div className="flex--col across--genres__units">
          <GenreBasedUnitsSoldAcrossCompanies data={genreBasedUnitsAcrossCompanies} />
        </div> */}
      </div>
    </div>
  )
}