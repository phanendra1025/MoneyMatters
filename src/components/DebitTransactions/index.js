import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import TransactionItem from '../TransactionItem'
import AddTransactionPopup from '../AddTransactionPopup'

const APIConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class DebitTransactions extends Component {
  state = {
    debitTransactionsData: [],
    transactionsApiStatus: APIConstants.initial,
  }

  componentDidMount() {
    this.getTheDebitTransactions()
  }

  compareByDates = (a, b) => {
    const data1 = new Date(a.date)
    const data2 = new Date(b.date)
    const differenceBetweenDates = data1 - data2
    return -differenceBetweenDates
  }

  getTheDebitTransactions = async () => {
    this.setState({transactionsApiStatus: APIConstants.inProcess})
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
      'https://bursting-gelding-24.hasura.app/api/rest/all-transactions?offset=0&limit=50',
      options,
    )
    const data = await response.json()
    if (response.ok === true) {
      const updatedAllTransactions = data.transactions.map(eachTransaction => ({
        amount: eachTransaction.amount,
        category: eachTransaction.category,
        date: eachTransaction.date,
        id: eachTransaction.id,
        transactionName: eachTransaction.transaction_name,
        type: eachTransaction.type,
        userId: eachTransaction.user_id,
      }))
      const debitTransactions = updatedAllTransactions.filter(
        eachTransaction => eachTransaction.type === 'debit',
      )
      debitTransactions.sort(this.compareByDates)
      this.setState({
        debitTransactionsData: debitTransactions,
        transactionsApiStatus: APIConstants.success,
      })
    } else {
      this.setState({transactionsApiStatus: APIConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="credit-debit-loader-container">
      <Loader type="ThreeDots" color="#2D60FF" height="50" width="50" />
    </div>
  )

  renderDebitTransactionsSuccessView = () => {
    const {debitTransactionsData} = this.state
    const userId = Cookies.get('user_id')
    const isAdmin = userId === '3'
    if (debitTransactionsData.length === 0) {
      return (
        <div className="last-transaction-container">
          <div className="last-three-transaction-container-no-result">
            <img
              src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690859828/MONEYMATTERS/No_data-cuate_u47df0.png"
              alt="no result"
              className="no-result-image"
            />
            <div className="no-result-text-container">
              <h1 className="no-result-heading">No Transactions Found</h1>
              <p className="no-result-para">
                Add transaction to see the All Transaction
              </p>
              <AddTransactionPopup />
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="all-transactions-card">
        {isAdmin ? (
          <div className="all-transaction-table-headings-container">
            <p className="transactions-table-headings transaction-heading-user-name">
              User Name
            </p>
            <p className="transactions-table-headings">Transaction Name</p>
            <p className="transactions-table-headings transaction-admin-category">
              Category
            </p>
            <p className="transactions-table-headings admin-margin-date">
              Date
            </p>
            <p className="transactions-table-headings admin-amount-transaction">
              Amount
            </p>
          </div>
        ) : (
          <div className="all-transaction-table-headings-container">
            <p className="transactions-table-headings">Transaction Name</p>
            <p className="transactions-table-headings category">Category</p>
            <p className="transactions-table-headings date">Date</p>
            <p className="transactions-table-headings amount">Amount</p>
          </div>
        )}
        <ul className="all-transaction-list-container">
          {debitTransactionsData.map(eachTransactionDetails => (
            <TransactionItem
              details={eachTransactionDetails}
              key={eachTransactionDetails.id}
            />
          ))}
        </ul>
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

  renderDebitTransactionsViews = () => {
    const {transactionsApiStatus} = this.state
    switch (transactionsApiStatus) {
      case APIConstants.success:
        return this.renderDebitTransactionsSuccessView()
      case APIConstants.failure:
        return this.renderFailureView()
      case APIConstants.inProcess:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderDebitTransactionsViews()}</div>
  }
}

export default DebitTransactions
