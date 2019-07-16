import React from "react"
import { useEffect, useState } from "react"
import { fetchPromoters, updatePromoterStatus, fetchSalesAndRevenueDistr } from "../Api"
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

export default function ListPromoters(props) {
  const pageNo = parseInt(getQueryParamByName("page")) || 1
  const searchValue = getQueryParamByName("search") || ""
  const limit = 20
  const [promoters, setPromoters] = useState([])
  const [promotersCount, setPromotersCount] = useState(0)
  const [activePage, setActivePage] = useState(pageNo)
  const [activeOffset, setActiveOffset] = useState(getOffsetUsingPageNo(pageNo, limit))
  const [toggleData, setToggleData] = useState(false)

  /** 
   * filterValue will change for onChange event, but
   * finalFilterValue will be used for applying filter 
   * */
  const [filterValue, setFilterValue] = useState(searchValue)
  const [finalFilterValue, setFinalFilterValue] = useState(searchValue)

  const reset = () => {
    props.history.push("/admin/promoters")
  }

  /** Filter will be applie[].push(selectedCity)d only on submit  */
  const handleFilterSubmit = e => {
    e.preventDefault()
    setFinalFilterValue(filterValue)
    /** reset pagination if filter is applied */
    setActiveOffset(0)
    setActivePage(1)
    props.history.push(`/admin/promoters?search=${filterValue}&page=${1}`)
  }

  /** change url based on pagination/search  */
  const handlePageUrl = (searchValue, pageNo) => {
    const queryObj = {}
    if (searchValue.length) {
      queryObj.search = searchValue
    }
    if (pageNo) {
      queryObj.page = pageNo
    }
    props.history.push(`/admin/promoters${getQueryUri(queryObj)}`)
  }

  const fetchPromotersReq = {
    limit: limit,
    offset: activeOffset
  }

  if (filterValue.length === 0 && finalFilterValue.length) {
    reset()
  }

  /** attach filter in fetchCosumerReq object if is there */
  if (finalFilterValue.length > 0) {
    /** Check whether the filter text is phone no. or email */
    const isPhoneNo = isNaN(filterValue) === false
    fetchPromotersReq.filter = {
      filterBy: isPhoneNo ? "Mobile" : "Email",
      value: filterValue
    }
  }

  /** Api call for fetching promoters  */
  // useEffect(() => {
  //   fetchSalesAndRevenueDistr()
  //     .then(res => {
  //       console.log(res)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }, [activeOffset, finalFilterValue, toggleData])

  return (
    <div>
      <Filters history={props.history} />
      <Container>
        <div>
          <SalesRevenueDistr history={props.history} />
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