import {Component} from 'react'
import Popup from 'reactjs-popup'
// import {FiLogOut} from 'react-icons/fi'
import {GrClose} from 'react-icons/gr'
import Cookies from 'js-cookie'
// import {withRouter} from 'react-router-dom'

import './index.css'

class DeletePopup extends Component {
  delete = async () => {
    const {itemId} = this.props
    const userId = Cookies.get('user_id')
    const itemsId = {
      id: itemId,
    }
    const options = {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'user',
        'x-hasura-user-id': `${userId}`,
      },
      body: JSON.stringify(itemsId),
    }
    const response = await fetch(
      'https://bursting-gelding-24.hasura.app/api/rest/delete-transaction',
      options,
    )
    console.log(response)
    window.location.reload(false)
  }

  render() {
    return (
      <Popup
        modalStyle={{borderRadius: '10px', width: '591px'}}
        trigger={
          <button type="button" className="delete-button">
            <img
              src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690695667/MONEYMATTERS/trash-01_mfx7en.png"
              alt="delete"
              className="delete-image"
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
          <div className="delete-popup-container">
            <div className="delete-popup-card">
              <img
                src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690792088/MONEYMATTERS/Group_848_diki3m.png"
                alt="alert"
                className="delete-alert-image"
              />
              <div className="delete-text-container">
                <h1 className="delete-popup-heading">
                  Are you sure you want to Delete?
                </h1>
                <p className="delete-popup-para">
                  This transaction will be deleted immediately. You can’t undo
                  this action.
                </p>
                <div className="delete-popup-buttons-container">
                  <button
                    className="yes-delete-button"
                    onClick={this.delete}
                    type="button"
                  >
                    Yes, Delete
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    className="delete-popup-leave-it-button"
                  >
                    No, Leave it
                  </button>
                </div>
              </div>
              <button
                onClick={close}
                type="button"
                className="delete-popup-close-button"
              >
                <GrClose size="20px" color="#718EBF" />
              </button>
            </div>
          </div>
        )}
      </Popup>
    )
  }
}

export default DeletePopup
