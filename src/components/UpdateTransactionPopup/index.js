import {Component} from 'react'
import Popup from 'reactjs-popup'
import {GrClose} from 'react-icons/gr'
import format from 'date-fns/format'
import Cookies from 'js-cookie'
import './index.css'

const categoryList = [
  {
    categoryId: 1,
    categoryName: 'Transfer',
  },
  {
    categoryId: 2,
    categoryName: 'Shopping',
  },
  {
    categoryId: 3,
    categoryName: 'Subscription',
  },
  {
    categoryId: 4,
    categoryName: 'Food',
  },
  {
    categoryId: 5,
    categoryName: 'grocery',
  },
  {
    categoryId: 6,
    categoryName: 'Movie',
  },
]

class UpdateTransactionPopup extends Component {
  constructor(props) {
    super(props)
    const {details} = this.props
    const {id, type, transactionName, category, date, amount} = details
    const updatedDate = format(new Date(date), 'yyyy-MM-dd')
    console.log(transactionName)
    this.state = {
      itemId: id,
      itemType: type,
      itemTransactionName: transactionName,
      itemCategory: category,
      itemDate: updatedDate,
      itemAmount: amount,
    }
  }

  onChangeItemType = event => {
    this.setState({itemType: event.target.value})
  }

  onChangeItemTransactionName = event => {
    this.setState({itemTransactionName: event.target.value})
  }

  onChangeItemCategory = event => {
    this.setState({itemCategory: event.target.value})
  }

  onChangeItemDate = event => {
    this.setState({itemDate: event.target.value})
  }

  onChangeItemAmount = event => {
    this.setState({itemAmount: event.target.value})
  }

  getTheDateDetails = date => {
    const inputDate = new Date(date)

    const now = new Date()

    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()

    inputDate.setHours(hours)
    inputDate.setMinutes(minutes)
    inputDate.setSeconds(seconds)

    return inputDate
  }

  updateTransaction = async event => {
    event.preventDefault()
    const userId = Cookies.get('user_id')
    const {
      itemType,
      itemTransactionName,
      itemCategory,
      itemDate,
      itemAmount,
      itemId,
    } = this.state
    if (!Number.isNaN(+itemAmount)) {
      console.log('true')
      const dateValue = this.getTheDateDetails(itemDate)
      const transactionDetails = {
        name: itemTransactionName,
        type: itemType,
        category: itemCategory,
        amount: itemAmount,
        date: dateValue,
        id: itemId,
      }
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret':
            'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
          'x-hasura-role': 'user',
          'x-hasura-user-id': `${userId}`,
        },
        body: JSON.stringify(transactionDetails),
      }
      const response = await fetch(
        'https://bursting-gelding-24.hasura.app/api/rest/update-transaction',
        options,
      )
      window.location.reload(false)
      console.log(response.ok)
    } else {
      console.log('false')
    }
  }

  render() {
    const {
      itemType,
      itemTransactionName,
      itemCategory,
      itemDate,
      itemAmount,
    } = this.state
    return (
      <Popup
        trigger={
          <button type="button" className="edit-button">
            <img
              src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690695535/MONEYMATTERS/pencil-02_kjipjl.png"
              alt="pencil"
              className="edit-image"
            />
          </button>
        }
        overlayStyle={{
          background: 'rgba(52, 64, 84, 0.7)',
          backdropFilter: 'blur(8px)',
        }}
        modal
      >
        {close => (
          <div className="update-transactions-popup-container">
            <div className="update-transaction-popup-card">
              <div className="update-transaction-heading-container">
                <div>
                  <h1 className="update-transaction-heading">
                    Update Transaction
                  </h1>
                  <p className="update-transaction-para">
                    You can update your transaction here
                  </p>
                </div>

                <button
                  onClick={close}
                  type="button"
                  className="update-transaction-popup-close-button"
                >
                  <GrClose size="20px" color="#718EBF" />
                </button>
              </div>
              <form
                className="update-transaction-inputs-form"
                onSubmit={this.updateTransaction}
              >
                <div className="update-transactions-inputs-wrapper">
                  <label
                    htmlFor="transactionName"
                    className="update-transactions-popup-labels"
                  >
                    Transaction Name
                  </label>
                  <input
                    value={itemTransactionName}
                    onChange={this.onChangeItemTransactionName}
                    className="update-transactions-popup-inputs"
                    id="transactionName"
                    type="text"
                    placeholder="Enter Name"
                  />
                </div>
                <div className="update-transactions-inputs-wrapper">
                  <label
                    htmlFor="transactionType"
                    className="update-transactions-popup-labels"
                  >
                    Transaction Type
                  </label>
                  <select
                    onChange={this.onChangeItemType}
                    value={itemType}
                    className="update-transactions-popup-inputs"
                    id="transactionType"
                    type="text"
                    placeholder="Enter Transaction Type"
                  >
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                  </select>
                </div>
                <div className="update-transactions-inputs-wrapper">
                  <label
                    htmlFor="category"
                    className="update-transactions-popup-labels"
                  >
                    Category
                  </label>
                  <select
                    value={itemCategory}
                    onChange={this.onChangeItemCategory}
                    className="update-transactions-popup-inputs"
                    id="category"
                    type="text"
                    placeholder="Select"
                  >
                    {categoryList.map(eachCategory => (
                      <option
                        key={eachCategory.categoryId}
                        value={eachCategory.categoryName}
                      >
                        {eachCategory.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="update-transactions-inputs-wrapper">
                  <label
                    htmlFor="amount"
                    className="update-transactions-popup-labels"
                  >
                    Amount
                  </label>
                  <input
                    value={itemAmount}
                    onChange={this.onChangeItemAmount}
                    className="update-transactions-popup-inputs"
                    id="amount"
                    type="text"
                    placeholder="Enter Your Amount"
                  />
                </div>
                <div className="update-transactions-inputs-wrapper">
                  <label
                    htmlFor="date"
                    className="update-transactions-popup-labels"
                  >
                    Date
                  </label>
                  <input
                    value={itemDate}
                    onChange={this.onChangeItemDate}
                    className="update-transactions-popup-inputs"
                    id="Date"
                    type="date"
                    placeholder="Date"
                  />
                </div>
                <button
                  type="submit"
                  className="update-transaction-popup-button"
                >
                  Update Transaction
                </button>
              </form>
            </div>
          </div>
        )}
      </Popup>
    )
  }
}

export default UpdateTransactionPopup
