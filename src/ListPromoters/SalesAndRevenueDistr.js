import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react"
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
    name: "Sku",
    mapping: "sku_volume"
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


const SalesAndRevenueDistr = forwardRef((props, ref) => {
  const limit = 10
  const [isLoaded, setLoadingState] = useState(false)
  const [salesData, setSalesData] = useState([])
  const [genres, setGenres] = useState([])
  const [brands, setBrands] = useState([])
  const [skus, setSkus] = useState([])
  const [activeGenre, setActiveGenre] = useState("0")
  const [activeBrand, setActiveBrand] = useState("0")
  const [activeSku, setActiveSku] = useState("0")
  const [totalVolume, setTotalVolume] = useState(0)
  const [activeOffset, setActiveOffset] = useState(0)
  const [activePage, setActivePage] = useState(1)
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

  // exposing reset method to parent
  useImperativeHandle(ref, () => ({ reset }))

  const reset = () => {
    setActiveOffset(0)
    setActivePage(1)
  }

  useEffect(() => {
    fetchGenres()
      .then(res => {
        setGenres(res.genres)
      })
  }, [])

  const handleGenreChange = e => {
    reset()
    setActiveGenre(e.target.value)
    const fetchBrandsReq = {
      genre_id: e.target.value
    }
    fetchBrands(fetchBrandsReq)
      .then(json => {
        setBrands(json.brands)
      })
  }

  const handleBrandsChange = e => {
    reset()
    setActiveBrand(e.target.value)
    const fetchSkusReq = {
      brand_id: parseInt(e.target.value)
    }
    fetchSkus(fetchSkusReq)
      .then(json => {
        setSkus(json.skus)
      })
  }

  const handleSkusChange = e => {
    reset()
    setActiveSku(e.target.value)
  }

  const salesAndRevenueDistrReq = {
    limit,
    offset: activeOffset,
    body: {}
  }

  if (props.city_id || (props.from_date && props.to_date) || props.state_short_name) {
    if (props.state_short_name.length > 0) {
      salesAndRevenueDistrReq.body.state_short_name = props.state_short_name
    }

    if (props.city_id != 0) {
      salesAndRevenueDistrReq.body.city_id = parseInt(props.city_id)
    }

    if (typeof props.from_date == "object" && typeof props.to_date == "object") {
      salesAndRevenueDistrReq.body.from_date = props.from_date.toJSON().slice(0, 10)
      salesAndRevenueDistrReq.body.to_date = props.to_date.toJSON().slice(0, 10)
    }
  }

  if (activeGenre != "0" || activeBrand != "0" || activeSku != "0") {
    salesAndRevenueDistrReq.body.filter = {}

    if (activeGenre != "0") {
      salesAndRevenueDistrReq.body.filter.genre_id = parseInt(activeGenre)
    } else {
      setActiveBrand("0")
      setActiveSku("0")
    }
    if (activeBrand != "0") {
      salesAndRevenueDistrReq.body.filter.brand_id = parseInt(activeBrand)
    } else {
      setActiveSku("0")
    }
    if (activeSku != "0") {
      salesAndRevenueDistrReq.body.filter.sku_id = parseInt(activeSku)
    }
  }

  useEffect(() => {
    fetchSalesAndRevenueDistr(salesAndRevenueDistrReq)
      .then(res => {
        setLoadingState(true)
        setSalesData(res.sales_data)
        setTotalVolume(res.total_volume)
        setSalesDataCount(res.count)
      })
  }, [
      props.city_id,
      props.from_date,
      props.to_date,
      props.state_short_name,
      activeGenre,
      activeBrand,
      activeSku,
      activeOffset
    ])

  return (
    <div>
      <h3 className="heading">Sales and revenue distribution by volume - overall</h3>
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
              <option value="0">--All Genres--</option>
              {genres.map(item => <option value={item.genre_id} key={item.genre_id}>{item.genre_name}</option>)}
            </select>

            <select onChange={handleBrandsChange} style={{ margin: "0 10px" }}>
              <option value="0">--All Brands--</option>
              {brands.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}
            </select>

            <select onChange={handleSkusChange}>
              <option value="0">--All Skus--</option>
              {skus.map(item => <option value={item.id} key={item.id}>{item.volume}</option>)}
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
            setActiveOffset(getOffsetUsingPageNo(active, limit))
            setActivePage(active)
          }}
        />
      </div>
    </div>
  )
})

export default SalesAndRevenueDistr