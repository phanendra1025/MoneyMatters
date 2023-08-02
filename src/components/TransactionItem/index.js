import format from 'date-fns/format'

import {BiUpArrowCircle, BiDownArrowCircle, BiUserCircle} from 'react-icons/bi'
import Cookies from 'js-cookie'
import './index.css'
import UpdateTransactionPopup from '../UpdateTransactionPopup'
import DeletePopup from '../DeletePopup'

const TransactionItem = props => {
  const userId = Cookies.get('user_id')
  const isAdmin = userId === '3'
  const {details} = props
  const {id, type, transactionName, category, date, amount} = details
  const dateDetails = format(new Date(date), 'd MMM, h:m aa')
  const amountText = type === 'credit' ? `+$${amount}` : `-$${amount}`
  const amountTextClass =
    type === 'credit'
      ? 'all-transaction-credit-amount'
      : 'all-transaction-debit-amount'
  return (
    <>
      {isAdmin ? (
        <li className="transaction-item">
          <div className="transaction-detail-container">
            {type === 'credit' ? (
              <BiUpArrowCircle size="30px" color="#718EBF" />
            ) : (
              <BiDownArrowCircle size="30px" color="#718EBF" />
            )}
            <BiUserCircle
              size="30px"
              color="#000000"
              className="transaction-item-user-profile-icon"
            />
            <p className="transaction-item-user-name">Arlene McCoy</p>
            <p className="admin-transaction-name-1">{transactionName}</p>
            <p className="admin-transaction-category-1">{category}</p>
            <p className="admin-transaction-date-details-1">{dateDetails}</p>
            <p className={amountTextClass}>{amountText}</p>
          </div>
        </li>
      ) : (
        <li className="all-transaction-item">
          <div className="all-transaction-detail-container">
            {type === 'credit' ? (
              <BiUpArrowCircle size="30px" color="#718EBF" />
            ) : (
              <BiDownArrowCircle size="30px" color="#718EBF" />
            )}
            <p className="all-transaction-name">{transactionName}</p>
            <p className="all-transaction-category">{category}</p>
            <p className="all-transaction-date-details">{dateDetails}</p>
            <p className={amountTextClass}>{amountText}</p>
            <UpdateTransactionPopup details={details} />
            <DeletePopup itemId={id} />
          </div>
        </li>
      )}{' '}
    </>
  )
}

export default TransactionItem
