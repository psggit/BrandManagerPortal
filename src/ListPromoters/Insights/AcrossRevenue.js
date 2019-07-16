import React, { useEffect, useState } from "react"
import HorizontalBar from "Components/HorizontalBar"
import { colors } from "Utils/helpers"

export default function InsightAcrossRevenue(props) {
  return (
    <div style={{ width: "50%" }}>
      <p style={{ marginBottom: "10px" }}>Across Revenue</p>
      {props.data.map((item, i) => {
        return (
          <div style={{
            marginBottom: "15px",
            display: "flex",
            alignItems: "center"
          }}>
            <div style={{ width: "calc(100% - 300px)" }}>
              <HorizontalBar color={colors[[i % props.data.length]]} width={item.total_brand_revenue_per + "%"} />
            </div>
            <p style={{ width: "300px" }}>{`${item.total_brand_revenue_per.toFixed(2)}% ${item.brand_name}`}</p>
          </div>
        )
      })}
    </div>
  )
}