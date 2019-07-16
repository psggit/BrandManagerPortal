import React, { useEffect, useState } from "react"
import HorizontalBar from "Components/HorizontalBar"
import { colors } from "Utils/helpers"

export default function InsightAcrossUnits(props) {
  return (
    <div style={{ width: "50%" }}>
      <p style={{ marginBottom: "10px" }}>Across Units Sold</p>
      {props.data.map((item, i) => {
        return (
          <div style={{
            marginBottom: "15px",
            display: "flex",
            alignItems: "center"
          }}>
            <div style={{ width: "calc(100% - 300px)" }}>
              <HorizontalBar color={colors[[i % props.data.length]]} width={item.total_brand_units_per + "%"} />
            </div>
            <p style={{ width: "300px" }}>{`${item.total_brand_units_per.toFixed(2)}% ${item.brand_name}`}</p>
          </div>
        )
      })}
    </div>
  )
}