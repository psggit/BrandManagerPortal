import React, { useState, useEffect } from "react"
import "./filters.scss"
import Input from "Components/Input"
import { mountModal } from "Components/ModalBox/api"
import Button from "Components/Button"
import DatePickerModal from "./DatePickerModal"
import { fetchStates, fetchCities } from "../Api";
import { getQueryUri, getQueryParamByName } from "../utils/helpers";

export default function Filters(props) {
  const [from_date, setFromDate] = useState("")
  const [to_date, setToDate] = useState("")
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [selectedState, setSelectedState] = useState("0")
  const [selectedCity, setSelectedCity] = useState("0")

  const setDateFilter = function (from_date, to_date) {
    setFromDate(from_date)
    setToDate(to_date)
  }

  const handleCitiesChange = e => {
    setSelectedCity(e.target.value)
  }

  const handleStateChange = e => {
    if (e.target.value === "0") {
      setSelectedState(e.target.value)
      setCities([])
      return
    }
    setSelectedState(e.target.value)
    const fetchCitiesReq = {
      stateShortName: e.target.value
    }

    fetchCities(fetchCitiesReq)
      .then(json => {
        setCities(json.cities)
      })
  }

  const handleFilterApply = e => {
    props.setFilters({
      from_date,
      to_date,
      city_id: selectedCity
    })
  }

  useEffect(() => {
    fetchStates()
      .then(json => {
        setStates(json.states)
        return json.states
      })
      .then(states => {
        const fetchCitiesReq = {
          stateShortName: selectedState
        }
        fetchCities(fetchCitiesReq)
          .then(json => {
            setCities(json.cities)
          })
      })
  }, [])

  return (
    <div className="dashboard--filters">
      <h1>dashboard</h1>
      <div className="row">

        <div className="col">
          <select value={selectedState} onChange={handleStateChange} className="primary">
            <option value="0">--All states--</option>
            {states.map(item => {
              return <option value={item.short_name}>{item.name}</option>
            })}
          </select>
        </div>

        <div className="col">
          <select
            value={selectedCity}
            onChange={handleCitiesChange}
            disabled={selectedState == "0"}
            className="primary"
          >
            <option value="0">--All cities--</option>
            {cities.map(item => {
              return <option value={item.id}>{item.name}</option>
            })}
          </select>
        </div>

        <div className="col">
          <Input
            value={
              typeof from_date === "object"
                ? `${from_date.toJSON().slice(0, 10)} - ${to_date.toJSON().slice(0, 10)}`
                : "--All time--"
            }
            readOnly={from_date && to_date}
            onFocus={() => {
              mountModal(DatePickerModal({
                setDateFilter: setDateFilter
              }))
            }}
            appearance="primary" type="text" />
        </div>

        <div className="col">
          <Button onClick={handleFilterApply}>Apply</Button>
        </div>

      </div>
    </div>
  )
}