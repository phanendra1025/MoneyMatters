import {Component} from 'react'

import SideNavbar from '../SideNavbar'
import './index.css'
import MoneyMatterContext from '../../Context/MoneyMattersContext'

import Transaction from '../Transactions'
import Accounts from '../Accounts'
import Profile from '../Profile'

class Dashboard extends Component {
  renderAccounts = () => <Accounts />

  renderTransactions = () => <Transaction />

  renderProfile = () => <Profile />

  renderAllViews = id => {
    switch (id) {
      case 'HOME':
        return this.renderAccounts()
      case 'TRANSACTIONS':
        return this.renderTransactions()
      case 'PROFILE':
        return this.renderProfile()
      default:
        return null
    }
  }

  render() {
    return (
      <MoneyMatterContext.Consumer>
        {value => {
          const {activeOptionId} = value
          return (
            <div className="dashboard-container">
              <SideNavbar />
              {this.renderAllViews(activeOptionId)}
            </div>
          )
        }}
      </MoneyMatterContext.Consumer>
    )
  }
}

export default Dashboard
