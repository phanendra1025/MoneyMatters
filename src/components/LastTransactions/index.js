import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import AddTransactionPopup from '../AddTransactionPopup'
import LastTransactionItem from '../LastTransactionItem'
import './index.css'

const APIConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class LastTransactions extends Component {
  state = {
    getTransactionApiStatus: APIConstants.initial,
    transactionData: [],
  }

  componentDidMount() {
    this.getTheLastTransactionDetails()
  }

  compareByDates = (a, b) => {
    const data1 = new Date(a.date)
    const data2 = new Date(b.date)
    const differenceBetweenDates = data1 - data2
    return -differenceBetweenDates
  }

  getTheLastTransactionDetails = async () => {
    this.setState({getTransactionApiStatus: APIConstants.inProcess})
    const userId = Cookies.get('user_id')
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'user',
        'x-hasura-user-id': `${userId}`,
      },
    }
    const response = await fetch(
      'https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=3&offset=0',
      options,
    )
    const data = await response.json()
    if (response.ok === true) {
      const updatedTransactionsData = {
        transactions: data.transactions,
      }
      const updateTransactions = updatedTransactionsData.transactions.map(
        eachTransaction => ({
          amount: eachTransaction.amount,
          category: eachTransaction.category,
          date: eachTransaction.date,
          id: eachTransaction.id,
          transactionName: eachTransaction.transaction_name,
          type: eachTransaction.type,
          userId: eachTransaction.user_id,
        }),
      )
      updateTransactions.sort(this.compareByDates)
      this.setState({
        transactionData: updateTransactions,
        getTransactionApiStatus: APIConstants.success,
      })
    } else {
      this.setState({getTransactionApiStatus: APIConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="credit-debit-loader-container">
      <Loader type="ThreeDots" color="#2D60FF" height="50" width="50" />
    </div>
  )

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

  renderLastTransactionSuccessView = () => {
    const {transactionData} = this.state
    if (transactionData.length === 0) {
      return (
        <div className="last-transaction-container">
          <h1 className="last-transaction-heading">Last Transaction</h1>
          <div className="last-three-transaction-container-no-result">
            <img
              src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690859828/MONEYMATTERS/No_data-cuate_u47df0.png"
              alt="no result"
              className="no-result-image"
            />
            <div className="no-result-text-container">
              <h1 className="no-result-heading">No Transactions Found</h1>
              <p className="no-result-para">
                Add transaction to see the last three transactions
              </p>
              <AddTransactionPopup />
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="last-transaction-container">
        <h1 className="last-transaction-heading">Last Transaction</h1>
        <ul className="last-three-transaction-container">
          {transactionData.map(eachTransaction => (
            <LastTransactionItem
              eachTransaction={eachTransaction}
              key={eachTransaction.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderLastTransactionDetails = () => {
    const {getTransactionApiStatus} = this.state
    switch (getTransactionApiStatus) {
      case APIConstants.success:
        return this.renderLastTransactionSuccessView()
      case APIConstants.failure:
        return this.renderFailureView()
      case APIConstants.inProcess:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderLastTransactionDetails()}</>
  }
}

export default LastTransactions
