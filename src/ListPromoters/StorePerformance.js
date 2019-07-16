import React, { useState, useEffect } from "react"
import Table from "Components/Table"
import { fetchStoreRevenue, fetchGenres } from "../Api";

const tableColumns = [
  {
    name: "Store",
    mapping: "retailer_name"
  },
  {
    name: "City",
    mapping: "city_name"
  },
  {
    name: "Units Sold",
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


export default function StorePerformance() {
  const limit = 10
  const [isLoaded, setLoadingState] = useState(true)
  const [retailersData, setRetailersData] = useState([])
  const [retailersCount, setRetailersCount] = useState(0)
  const [genres, setGenres] = useState([])
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    fetchGenres()
      .then(res => {
        setGenres(res.genres)
      })
  }, [])

  const storePerformanceReq = {
    limit,
    offset,
    filters: {}
  }

  useEffect(() => {
    fetchStoreRevenue(storePerformanceReq)
      .then(res => {
        setRetailersData(res.retailer_data)
        setRetailersCount(res.retailer_count)
      })
  }, [])
  return (
    <div style={{ background: "#fff", padding: "20px 0" }}>
      <div style={{
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <p>Total Stores: {retailersCount} </p>

        <div style={{ display: "flex" }}>
          <select>
            {genres.map(item => <option value={item.genre_id} key={item.genre_id}>{item.genre_name}</option>)}
          </select>

        </div>

      </div>
      <Table
        data={retailersData}
        columns={tableColumns}
        isLoaded={isLoaded}
      />
    </div>
  )
}