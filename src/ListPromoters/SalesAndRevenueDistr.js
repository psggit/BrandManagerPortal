import React, { useState, useEffect } from "react"
import Table from "Components/Table"
import { fetchSalesAndRevenueDistr, fetchGenres, fetchSalesInsight, fetchBrands, fetchSkus } from "../Api"
import Pagination from "react-js-pagination"
import {
  getOffsetUsingPageNo,
  getQueryParamByName,
  getQueryUri
} from "../utils/helpers"

const tableColumns = [
  {
    name: "Brand",
    mapping: "brand_name"
  },
  {
    name: "City",
    mapping: "city_name"
  },
  {
    name: "Unit Sold",
    mapping: "total_brand_units"
  },
  {
    name: "Cashback",
    mapping: "total_brand_cashback"
  },
  {
    name: "Volume",
    mapping: "total_brand_volume"
  },
  {
    name: "Revenue",
    mapping: "total_brand_revenue"
  }
]


export default function SalesAndRevenueDistr(props) {
  const pageNo = parseInt(getQueryParamByName("page")) || 1
  const limit = 20
  const [isLoaded, setLoadingState] = useState(true)
  const [salesData, setSalesData] = useState([])
  const [genres, setGenres] = useState([])
  const [brands, setBrands] = useState([])
  const [skus, setSkus] = useState([])
  const [activeGenre, setActiveGenre] = useState("0")
  const [activeBrand, setActiveBrand] = useState("0")
  const [activeSku, setActiveSku] = useState("0")
  const [totalVolume, setTotalVolume] = useState(0)
  const [activeOffset, setActiveOffset] = useState(0)
  const [activePage, setActivePage] = useState(pageNo)
  const [salesDataCount, setSalesDataCount] = useState(0)

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

  useEffect(() => {
    fetchGenres()
      .then(res => {
        setGenres(res.genres)
      })
  }, [])

  const salesAndRevenueDistrReq = {
    limit,
    offset: activeOffset,
    body: {}
  }

  if (props.city_id || (props.from_date && props.to_date)) {
    if (props.city_id) {
      salesAndRevenueDistrReq.body.city_id = parseInt(props.city_id)
    }

    if (props.from_date && props.to_date) {
      salesAndRevenueDistrReq.body.from_date = props.from_date
      salesAndRevenueDistrReq.body.to_date = props.to_date
    }
  }

  const handleGenreChange = e => {
    fetchBrands()
      .then(json => {
        setBrands(json.brands)
      })
  }

  const handleBrandsChange = e => {
    const fetchSkusReq = {
      brand_id: 1
    }
    fetchSkus(fetchSkusReq)
      .then(json => {
        console.log(json)
      })
  }

  useEffect(() => {
    fetchSalesAndRevenueDistr(salesAndRevenueDistrReq)
      .then(res => {
        setSalesData(res.sales_data)
        setTotalVolume(res.total_volume)
      })
  }, [props.city_id, props.from_date, props.to_date])
  return (
    <div className="card">
      <div style={{
        padding: "20px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <p>Total: {totalVolume} (in ml)</p>

        <div style={{ display: "flex" }}>
          <select onChange={handleGenreChange}>
            {genres.map(item => <option value={item.genre_id} key={item.genre_id}>{item.genre_name}</option>)}
          </select>

          <select style={{ margin: "0 10px" }}>
            <option>--All Brands--</option>
            {brands.map(item => <option value={item.genre_id} key={item.genre_id}>{item.genre_name}</option>)}
          </select>

          <select>
            <option>--All Skus--</option>
            {skus.map(item => <option value={item.genre_id} key={item.genre_id}>{item.genre_name}</option>)}
          </select>
        </div>

      </div>
      <Table
        data={salesData}
        columns={tableColumns}
        isLoaded={isLoaded}
      />
      <Pagination
        activePage={activePage}
        itemsCountPerPage={limit}
        totalItemsCount={salesDataCount}
        pageRangeDisplayed={5}
        onChange={(active) => {
          handlePageUrl(searchValue, active)
          setActiveOffset(getOffsetUsingPageNo(active, limit))
          setActivePage(active)
        }}
      />
    </div>
  )
}