import React from "react"
import { useEffect, useState } from "react"
import { fetchPromoters, updatePromoterStatus, fetchSalesAndRevenueDistr, fetchGenres } from "../Api"
import Pagination from "react-js-pagination"
import {
  getOffsetUsingPageNo,
  getQueryParamByName,
  getQueryUri
} from "../utils/helpers"

import Container from "./../Container"
import SalesRevenueDistr from "./SalesAndRevenueDistr"
import StorePerformance from "./StorePerformance"
import Filters from "./filters"
import RevenueAndUnitsArea from "./RevenueAndUnitsArea";
import InsightAcrossGenres from "./Insights/AcrossRevenue";
import Insight from "./Insights";

export default function Dasboard(props) {
  const [from_date, setFromDate] = useState("")
  const [to_date, setToDate] = useState("")
  const [city_id, setCityID] = useState(0)

  const setFilters = (filters) => {
    const { from_date, to_date, city_id } = filters
    setFromDate(from_date)
    setToDate(to_date)
    setCityID(city_id)
  }

  return (
    <div>
      <Filters setFilters={setFilters} history={props.history} />
      <Container>
        <div>
          <SalesRevenueDistr
            history={props.history}
            from_date={from_date}
            to_date={to_date}
            city_id={city_id}
          />
        </div>
        <div style={{ marginTop: "40px" }}>
          <StorePerformance />
        </div>

        <div style={{ marginTop: "40px" }}>
          <Insight />
        </div>
      </Container>
    </div>
  )
}