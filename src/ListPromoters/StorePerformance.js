import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import Table from "Components/Table"
import { fetchGenres, fetchBrands, fetchSkus, fetchStoreRevenue, fetchRetailers } from "../Api"
import Pagination from "react-js-pagination"
import {
  getOffsetUsingPageNo,
  getQueryParamByName,
  getQueryUri
} from "../utils/helpers"

const tableColumns = [
  {
    name: "Store",
    mapping: "retailer_name"
  },
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
    mapping: "total_store_units"
  },
  {
    name: "Volume",
    mapping: "total_store_volume"
  },
  {
    name: "Revenue",
    mapping: "total_store_revenue"
  }
]


const StorePerformance = forwardRef((props, ref) => {
  const limit = 10
  const [isLoaded, setLoadingState] = useState(false)
  const [retailerData, setRetailerData] = useState([])
  const [genres, setGenres] = useState([])
  const [brands, setBrands] = useState([])
  const [skus, setSkus] = useState([])
  const [activeGenre, setActiveGenre] = useState("0")
  const [activeBrand, setActiveBrand] = useState("0")
  const [activeSku, setActiveSku] = useState("0")
  const [activeOffset, setActiveOffset] = useState(0)
  const [activePage, setActivePage] = useState(1)
  const [retailerCount, setRetailerCount] = useState(0)
  const [retailers, setRetailers] = useState([])
  const [activeRetailer, setActiveRetailer] = useState("0")

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

  const handleRetailerChange = e => {
    reset()
    setActiveGenre("0")
    setActiveBrand("0")
    setActiveRetailer(e.target.value)
  }

  const handleGenreChange = e => {
    reset()
    setActiveBrand("0")
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

  const storePerformanceReq = {
    limit,
    offset: activeOffset,
    body: {}
  }

  if (props.city_id || (props.from_date && props.to_date) || props.state_short_name) {
    if (props.state_short_name.length > 0) {
      storePerformanceReq.body.state_short_name = props.state_short_name
    }

    if (props.city_id != 0) {
      storePerformanceReq.body.city_id = parseInt(props.city_id)
    }

    if (typeof props.from_date == "object" && typeof props.to_date == "object") {
      storePerformanceReq.body.from_date = props.from_date.toJSON().slice(0, 10)
      storePerformanceReq.body.to_date = props.to_date.toJSON().slice(0, 10)
    }
  }

  if (activeRetailer != "0" || activeGenre != "0" || activeBrand != "0") {
    storePerformanceReq.body.filter = {}

    if (activeGenre != "0") {
      storePerformanceReq.body.filter.genre_id = parseInt(activeGenre)
    }
    if (activeBrand != "0") {
      storePerformanceReq.body.filter.brand_id = parseInt(activeBrand)
    }
    if (activeRetailer != "0") {
      storePerformanceReq.body.filter.retailer_id = parseInt(activeRetailer)
    }
  } else {
    delete storePerformanceReq.body.filter
  }

  useEffect(() => {
    fetchRetailers()
      .then(res => {
        setRetailers(res.retailers)
      })
  }, [])

  useEffect(() => {
    fetchStoreRevenue(storePerformanceReq)
      .then(res => {
        setLoadingState(true)
        setRetailerData(res.retailer_data)
        setRetailerCount(res.count)
      })
  }, [
      props.city_id,
      props.from_date,
      props.to_date,
      props.state_short_name,
      activeGenre,
      activeBrand,
      activeOffset,
      activeRetailer
    ])

  return (
    <div>
      <h3 className="heading">Store performance</h3>
      <div className="card">
        <div style={{
          padding: "20px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <p>Total Stores: {retailerCount} </p>

          <div style={{ display: "flex" }}>
            <select value={activeRetailer} onChange={handleRetailerChange}>
              <option value="0">--All retailers--</option>
              {retailers.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}
            </select>

            <select value={activeGenre} style={{ margin: "0 10px" }} onChange={handleGenreChange}>
              <option value="0">--All Genres--</option>
              {genres.map(item => <option value={item.genre_id} key={item.genre_id}>{item.genre_name}</option>)}
            </select>

            <select value={activeBrand} onChange={handleBrandsChange}>
              <option value="0">--All Brands--</option>
              {brands.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}
            </select>
          </div>

        </div>
        <Table
          data={retailerData}
          columns={tableColumns}
          isLoaded={isLoaded}
        />
        <Pagination
          activePage={activePage}
          itemsCountPerPage={limit}
          totalItemsCount={retailerCount}
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

export default StorePerformance