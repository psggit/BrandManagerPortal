import React, { useState } from "react"
import "./filters.scss"
import Input from "Components/Input"
import { mountModal } from "Components/ModalBox/api"
import DatePickerModal from "./DatePickerModal"

export default function Filters() {
  const [from_date, setFromDate] = useState(null)
  const [to_date, setToDate] = useState(null)

  const setDateFilter = function (from_date, to_date) {
    // console.log(from_date.toJSON())
    setFromDate(from_date)
    setToDate(to_date)
  }

  return (
    <div className="dashboard--filters">
      <h1>dashboard</h1>
      <div className="row">

        <div className="col">
          <select className="primary">
            <option>Tamilnadu</option>
          </select>
        </div>

        <div className="col">
          <select className="primary">
            <option>Bengaluru</option>
          </select>
        </div>

        <div className="col">
          <Input
            value={
              from_date
                ? `${from_date.toJSON().slice(0, 10)} - ${to_date.toJSON().slice(0, 10)}`
                : "Date"
            }
            readOnly={from_date && to_date}
            onFocus={() => {
              mountModal(DatePickerModal({
                setDateFilter: setDateFilter
              }))
            }}
            appearance="primary" type="text" />
        </div>

      </div>
    </div>
  )
}