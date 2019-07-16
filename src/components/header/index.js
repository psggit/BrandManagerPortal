import React, { useState } from "react"
import "./header.scss"
import { authLogout } from "../../Api";
import { clearSession, getSession } from "Utils/session"
import { NavLink } from "react-router-dom"
import Button from "Components/Button"

export default function Header({ history }) {
  const session = getSession()
  const hasuraID = session ? session.hasura_id : null
  const handleClick = e => {
    e.preventDefault()
    authLogout()
      .then(json => {
        clearSession()
        history.push("/admin/login")
      })
      .catch(err => { console.log(err) })
  }
  return (
    <div className="header">
      <NavLink to="/admin">
        <div className="brand--logo">
          <img src="https://res.cloudinary.com/www-hipbar-com/image/upload/v1557940046/Hipbar_Website/01_HB_Logo.svg" />
          <div>
            <p>HIPBAR</p>
            <p>BRAND MANAGER</p>
          </div>
        </div>
      </NavLink>
      <div>
        <div className="logout--area">
          <div>
            <p>Aprup Shet</p>
            <p>Sipping spirits pvt. ltd.</p>
          </div>
          <Button onClick={handleClick}>Logout</Button>
        </div>
      </div>
    </div>
  )
}