import './index.css'

const TransactionOptionButton = props => {
  const {details, isActive, changeTheActiveTransactionOptionId} = props
  const {displayText, optionId} = details
  const optionClassName = isActive
    ? 'active-transaction-option-button'
    : 'transaction-option-button'
  const ChangeActiveOptionId = () => {
    changeTheActiveTransactionOptionId(optionId)
  }
  return (
    <li className="transaction-option-item">
      <button
        type="button"
        onClick={ChangeActiveOptionId}
        className={optionClassName}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TransactionOptionButton
