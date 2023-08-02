import React from 'react'

import {Route, Switch} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'
import Dashboard from './components/Dashboard'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'

import MoneyMatterContext from './Context/MoneyMattersContext'

const sideNavBarOptionsList = [
  {
    optionId: 'HOME',
    displayText: 'Home',
    iconUrl:
      'https://res.cloudinary.com/dytmw4swo/image/upload/v1690706817/MONEYMATTERS/home_2_1_yoafgv.jpg',
    activeIconUrl:
      'https://res.cloudinary.com/dytmw4swo/image/upload/v1690706792/MONEYMATTERS/home_2_gyxdru.jpg',
  },
  {
    optionId: 'TRANSACTIONS',
    displayText: 'Transactions',
    iconUrl:
      'https://res.cloudinary.com/dytmw4swo/image/upload/v1690707053/MONEYMATTERS/transfer_1_n9ah5j.jpg',
    activeIconUrl:
      'https://res.cloudinary.com/dytmw4swo/image/upload/v1690707070/MONEYMATTERS/transfer_1_1_xpvymn.jpg',
  },
  {
    optionId: 'PROFILE',
    displayText: 'Profile',
    iconUrl:
      'https://res.cloudinary.com/dytmw4swo/image/upload/v1690707195/MONEYMATTERS/user_3_1_duwqwf.jpg',
    activeIconUrl:
      'https://res.cloudinary.com/dytmw4swo/image/upload/v1690707171/MONEYMATTERS/user_3_1_1_chrofz.jpg',
  },
]

class App extends React.Component {
  state = {
    optionsList: sideNavBarOptionsList,
    activeOptionId: sideNavBarOptionsList[0].optionId,
  }

  changeSideNavbarActiveOptionId = id => {
    this.setState({activeOptionId: id})
  }

  render() {
    const {activeOptionId, optionsList} = this.state
    return (
      <MoneyMatterContext.Provider
        value={{
          activeOptionId,
          optionsList,
          changeSideNavbarActiveOptionId: this.changeSideNavbarActiveOptionId,
        }}
      >
        <div className="app-container">
          <Switch>
            <ProtectedRoute exact path="/" component={Dashboard} />
            <Route exact path="/login" component={LoginRoute} />
          </Switch>
        </div>
      </MoneyMatterContext.Provider>
    )
  }
}

export default App
