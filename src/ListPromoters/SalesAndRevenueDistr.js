import React, { useState, useEffect } from "react"
import Table from "Components/Table"
import { fetchSalesAndRevenueDistr, fetchGenres, fetchSalesInsight } from "../Api";
import { getQueryParamByName } from "../utils/helpers";

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


export default function SalesAndRevenueDistr() {
  const limit = 10
  const [isLoaded, setLoadingState] = useState(true)
  const [salesData, setSalesData] = useState([])
  const [genres, setGenres] = useState([])
  const [totalVolume, setTotalVolume] = useState(0)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    fetchGenres()
      .then(res => {
        setGenres(res.genres)
      })
  }, [])

  const salesAndRevenueDistrReq = {
    limit,
    offset,
    filters: {}
  }

  useEffect(() => {
    fetchSalesAndRevenueDistr(salesAndRevenueDistrReq)
      .then(res => {
        setSalesData(res.sales_data)
        setTotalVolume(res.total_volume)
      })
  }, [])
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
          <select>
            {genres.map(item => <option value={item.genre_id} key={item.genre_id}>{item.genre_name}</option>)}
          </select>

        </div>

      </div>
      <Table
        data={salesData}
        columns={tableColumns}
        isLoaded={isLoaded}
      />
    </div>
  )
}