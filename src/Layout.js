import React from "react"
import SideNav from "Components/sidemenu"
import Header from "Components/header"

function Layout({ history, children }) {
  return (
    <React.Fragment>
      <Header history={history} />
      <div style={{ marginTop: "78px" }}>
        {children}
      </div>
    </React.Fragment>
  )
}

export default Layout