import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Switch } from "react-router-dom"
import { Route } from "react-router-dom"
import { createBrowserHistory } from "history"
import { Router } from "react-router"
import Layout from "./Layout"
import "Components/Pagination/pagination.scss"
import Login from "./Login"
import { authTokenInfo } from "./Api"
import ListBrandManagerDetails from "./ListBrandDetails";
import { createSession } from "./utils/session"

const history = createBrowserHistory()

function App() {
  const [appKey, setAppKey] = useState(0)
  let x = appKey
  useEffect(() => {
    history.listen(location => {
      setAppKey(++x)
    })
  }, [])

  useEffect(() => {
    authTokenInfo()
      .then(json => {
        localStorage.setItem("username", json.username)
        if (history.location.pathname.includes("login")) {
          createSession(json)
          location.href = "/admin"
        }
      })
      .catch(err => {
        if (!history.location.pathname.includes("login")) {
          // err.response.json().then(json => {
          //   alert(json.message)
          // })
          // location.href = "/admin/login"
        }
      })
  }, [])

  return (
    <Router key={appKey} history={history}>
      <Switch>
        <Route
          exact
          path="/admin/login"
          component={Login}
        />
        <Layout history={history}>
          <Route
            exact
            path="/admin"
            render={props => <ListBrandManagerDetails {...props} />}
          />
        </Layout>
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))