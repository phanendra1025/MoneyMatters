import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import OverviewGraph from '../OverviewGraph'
import './index.css'
import LastTransactions from '../LastTransactions'
import AddTransactionPopup from '../AddTransactionPopup'

const APIConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class Accounts extends Component {
  state = {
    creditTotalSum: 0,
    debitTotalSum: 0,
    getTotalsApiStatus: APIConstants.initial,
  }

  componentDidMount() {
    this.getTheTotalCreditsAndDebits()
  }

  updateTheTotals = totalsData => {
    totalsData.map(eachData =>
      eachData.type === 'credit'
        ? this.setState({creditTotalSum: eachData.sum})
        : this.setState({debitTotalSum: eachData.sum}),
    )
  }

  getTheTotalCreditsAndDebits = async () => {
    this.setState({getTotalsApiStatus: APIConstants.inProcess})
    const userId = Cookies.get('user_id')
    const isAdmin = userId === '3'
    const url = isAdmin
      ? 'https://bursting-gelding-24.hasura.app/api/rest/transaction-totals-admin'
      : 'https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals'
    const userOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': `user`,
        'x-hasura-user-id': `${userId}`,
      },
    }
    const adminOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'admin',
      },
    }
    const options = isAdmin ? adminOptions : userOptions
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      if (isAdmin) {
        const updatedAdminData = {
          transactionTotalsAdmin: data.transaction_totals_admin,
        }
        this.updateTheTotals(updatedAdminData.transactionTotalsAdmin)
        this.setState({getTotalsApiStatus: APIConstants.success})
      } else {
        const updatedTotalsData = {
          totalsCreditDebitTransactions: data.totals_credit_debit_transactions,
        }
        this.updateTheTotals(updatedTotalsData.totalsCreditDebitTransactions)
        this.setState({getTotalsApiStatus: APIConstants.success})
      }
    } else {
      this.setState({getTotalsApiStatus: APIConstants.failure})
    }
  }

  renderCreditAndDebitCardsSuccessView = () => {
    const {creditTotalSum, debitTotalSum} = this.state
    return (
      <div className="credit-and-debit-wrapper">
        <div className="dashboard-money-details-card dashboard-money-details-credit-card">
          <div className="money-details-wrapper">
            <h1 className="credited-money">${creditTotalSum}</h1>
            <p className="transaction-type">Credit</p>
          </div>
          <img
            src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690686691/MONEYMATTERS/Group_2_kafhn3.png"
            alt="credit"
            className="dashboard-credit-image"
          />
        </div>
        <div className="dashboard-money-details-card">
          <div className="money-details-wrapper">
            <h1 className="debited-money">${debitTotalSum}</h1>
            <p className="transaction-type">Debit</p>
          </div>
          <img
            src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690687351/MONEYMATTERS/Group_3_bvywop.png"
            alt="debit"
            className="dashboard-debit-image"
          />
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-card">
      <img
        src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690861891/MONEYMATTERS/Feeling_sorry-cuate_ogigsk.png"
        alt="error"
        className="error-image"
      />
      <h1 className="error-heading">Something Went Wrong</h1>
      <button
        type="button"
        className="retry-button"
        onClick={this.getTheTotalCreditsAndDebits}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="credit-debit-loader-container">
      <Loader type="ThreeDots" color="#2D60FF" height="50" width="50" />
    </div>
  )

  renderCreditAndDebitCards = () => {
    const {getTotalsApiStatus} = this.state
    switch (getTotalsApiStatus) {
      case APIConstants.success:
        return this.renderCreditAndDebitCardsSuccessView()
      case APIConstants.failure:
        return this.renderFailureView()
      case APIConstants.inProcess:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const userId = Cookies.get('user_id')
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="header-heading">Accounts</h1>
          {userId === '3' ? null : <AddTransactionPopup />}
        </div>
        <div className="dashboard-section">
          {this.renderCreditAndDebitCards()}
          <LastTransactions />
          <OverviewGraph />
        </div>
      </div>
    )
  }
}

export default Accounts
