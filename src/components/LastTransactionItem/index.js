import {Component} from 'react'
import format from 'date-fns/format'
import Cookies from 'js-cookie'
import {BiUpArrowCircle, BiDownArrowCircle, BiUserCircle} from 'react-icons/bi'
import './index.css'
import DeletePopup from '../DeletePopup'
import UpdateTransactionPopup from '../UpdateTransactionPopup'

class LastTransactionItem extends Component {
  render() {
    const userId = Cookies.get('user_id')
    const isAdmin = userId === '3'
    const {eachTransaction} = this.props
    const {id, type, transactionName, category, date, amount} = eachTransaction
    const dateDetails = format(new Date(date), 'd MMM, h:m aa')
    const amountText = type === 'credit' ? `+$${amount}` : `-$${amount}`
    const userAmountTextClass =
      type === 'credit'
        ? 'last-transaction-credit-amount'
        : 'last-transaction-debit-amount'
    const adminAmountTextClass =
      type === 'credit'
        ? 'last-transaction-admin-credit-amount'
        : 'last-transaction-admin-debit-amount'
    const amountTextClass = isAdmin ? adminAmountTextClass : userAmountTextClass
    return (
      <>
        {' '}
        {isAdmin ? (
          <li className="transaction-item">
            <div className="transaction-detail-container">
              {type === 'credit' ? (
                <BiUpArrowCircle size="30px" color="#16DBAA" />
              ) : (
                <BiDownArrowCircle size="30px" color="#FE5C73" />
              )}
              <BiUserCircle
                size="30px"
                color="#000000"
                className="transaction-item-user-profile-icon"
              />
              <p className="transaction-item-user-name">Arlene McCoy</p>
              <p className="admin-transaction-name">{transactionName}</p>
              <p className="admin-transaction-category ">{category}</p>
              <p className="admin-transaction-date-details">{dateDetails}</p>
              <p className={amountTextClass}>{amountText}</p>
            </div>
          </li>
        ) : (
          <li className="transaction-item">
            <div className="transaction-detail-container">
              {type === 'credit' ? (
                <BiUpArrowCircle size="30px" color="#16DBAA" />
              ) : (
                <BiDownArrowCircle size="30px" color="#FE5C73" />
              )}
              <p className="transaction-name">{transactionName}</p>
              <p className="transaction-category">{category}</p>
              <p className="transaction-date-details">{dateDetails}</p>
              <p className={amountTextClass}>{amountText}</p>
              <UpdateTransactionPopup details={eachTransaction} />
              <DeletePopup itemId={id} />
            </div>
          </li>
        )}{' '}
      </>
    )
  }
}

export default LastTransactionItem
