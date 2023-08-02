import {Component} from 'react'

import './index.css'
import TransactionOptionButton from '../TransactionOptionButton'
import AllTransactions from '../AllTransactions'
import CreditTransactions from '../CreditTransactions'
import DebitTransactions from '../DebitTransactions'

const transactionHeaderOptionsList = [
  {
    optionId: 'All_TRANSACTIONS',
    displayText: 'All Transactions',
  },
  {
    optionId: 'DEBIT',
    displayText: 'Debit',
  },
  {
    optionId: 'CREDIT',
    displayText: 'Credit',
  },
]

class Transaction extends Component {
  state = {
    activeTransactionOptionId: transactionHeaderOptionsList[0].optionId,
  }

  changeTheActiveTransactionOptionId = id => {
    this.setState({activeTransactionOptionId: id})
  }

  renderAllTransactions = () => <AllTransactions />

  renderCreditTransactions = () => <CreditTransactions />

  renderDebitTransactions = () => <DebitTransactions />

  renderAllTransactionViews = () => {
    const {activeTransactionOptionId} = this.state
    switch (activeTransactionOptionId) {
      case transactionHeaderOptionsList[0].optionId:
        return this.renderAllTransactions()
      case transactionHeaderOptionsList[1].optionId:
        return this.renderDebitTransactions()
      case transactionHeaderOptionsList[2].optionId:
        return this.renderCreditTransactions()
      default:
        return null
    }
  }

  render() {
    const {activeTransactionOptionId} = this.state
    return (
      <div className="transactions-container">
        <div className="transaction-header">
          <h1 className="transaction-heading">Transactions</h1>
          <ul className="transaction-options-container">
            {transactionHeaderOptionsList.map(eachOption => (
              <TransactionOptionButton
                details={eachOption}
                key={eachOption.optionId}
                isActive={activeTransactionOptionId === eachOption.optionId}
                changeTheActiveTransactionOptionId={
                  this.changeTheActiveTransactionOptionId
                }
              />
            ))}
          </ul>
        </div>
        <div className="all-transactions-container">
          {this.renderAllTransactionViews()}
        </div>
      </div>
    )
  }
}

export default Transaction
