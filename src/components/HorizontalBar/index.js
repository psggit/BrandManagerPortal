import React from "react"
import "./HorizontalBar.scss"

export default function HorizontalBar(props) {
  return <div style={{ width: props.width, background: props.color }} className="horizontal--bar"></div>
}