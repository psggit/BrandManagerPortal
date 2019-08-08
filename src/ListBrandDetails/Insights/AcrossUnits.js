import React, { useEffect, useState } from "react"
import HorizontalBar from "Components/HorizontalBar"
import { colors } from "Utils/helpers"

export default function InsightAcrossUnits(props) {
  return (
    <div className="card">
      <p style={{ marginBottom: "10px" }}>Units sold across brands</p>
      {props.data.map((item, i) => {
        return (
          <div style={{
            marginBottom: "15px",
            display: "flex",
            alignItems: "center"
          }}>
            <div style={{ width: "calc(100% - 300px)" }}>
              <HorizontalBar color={colors[i % colors.length]} width={item.total_brand_units_per + "%"} />
            </div>
            <p style={{ width: "300px" }}>
              <span style={{ display: "inline-block", width: "60px" }}>{`${item.total_brand_units_per.toFixed(2)}%`}</span>
              <span style={{ marginLeft: "20px" }}>{item.brand_name}</span>
            </p>
          </div>
        )
      })}
    </div>
  )
}