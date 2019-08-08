import React from "react"
import DayPicker from "react-day-picker"
import { ModalBox, ModalHeader, ModalFooter, ModalBody } from "Components/ModalBox"
import "./DatePicker.scss"
import Button from "Components/Button"
import Icon from "Components/Icon"
import { unmountModal } from "Components/ModalBox/api"

// import "react-day-picker/lib/style.css"

export default function DatePickerModal(props) {
  return class DatePickerModal extends React.Component {
    constructor() {
      super()
      this.state = {
        from_date: null,
        to_date: null
      }
      this.setFromDate = this.setFromDate.bind(this)
      this.setToDate = this.setToDate.bind(this)
      this.handleClick = this.handleClick.bind(this)
    }
    setFromDate(from_date) {
      this.setState({ from_date })
    }

    setToDate(to_date) {
      this.setState({ to_date })
    }

    handleClick() {
      props.setDateFilter(this.state.from_date, this.state.to_date)
      unmountModal()
    }

    render() {
      return (
        <div id="DatePickerModal">
          <ModalBox>
            <ModalHeader>
              <Icon onClick={unmountModal} name="cross" />
            </ModalHeader>
            <ModalBody>
              <div>
                <p>From</p>
                <DayPicker selectedDays={this.state.from_date} onDayClick={this.setFromDate} />
              </div>
              <div>
                <p>To</p>
                <DayPicker selectedDays={this.state.to_date} onDayClick={this.setToDate} />
              </div>
            </ModalBody>
            <ModalFooter>
              {
                this.state.from_date && this.state.to_date &&
                <p>From: {this.state.from_date.toJSON().slice(0, 10)} To: {this.state.to_date.toJSON().slice(0, 10)}</p>
              }
              {
                this.state.from_date && this.state.to_date &&
                <Button primary onClick={this.handleClick}>Apply</Button>
              }
            </ModalFooter>
          </ModalBox>
        </div>
      )
    }
  }
}

