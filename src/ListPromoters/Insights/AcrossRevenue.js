import React, { useEffect, useState } from "react"
import HorizontalBar from "Components/HorizontalBar"
import { colors } from "Utils/helpers"
console.log("debug")
export default function InsightAcrossRevenue(props) {
  return (
    <div className="card">
      <p style={{ marginBottom: "10px" }}>Across Revenue</p>
      {props.data.map((item, i) => {
        return (
          <div style={{
            marginBottom: "15px",
            display: "flex",
            alignItems: "center"
          }}>
            <div style={{ width: "calc(100% - 300px)" }}>
              <HorizontalBar color={colors[i % colors.length]} width={item.total_brand_revenue_per + "%"} />
            </div>
            <p style={{ width: "300px" }}>
              <span style={{ display: "inline-block", width: "60px" }}>{`${item.total_brand_revenue_per.toFixed(2)}%`}</span>
              <span style={{ marginLeft: "20px" }}>{item.brand_name}</span>
            </p>
          </div>
        )
      })}
    </div>
  )
}