import {Component} from 'react'

import Popup from 'reactjs-popup'
import {FiLogOut} from 'react-icons/fi'
import {GrClose} from 'react-icons/gr'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import './index.css'

class LogoutPopup extends Component {
  logout = () => {
    Cookies.remove('user_id')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <Popup
        modalStyle={{borderRadius: '10px', width: '591px'}}
        trigger={
          <button
            type="button"
            onClick={this.toggleFullScreen}
            className="logout-button"
          >
            <FiLogOut size="18px" className="logout-icon" color="#718EBF" />
          </button>
        }
        overlayStyle={{
          background: 'rgba(52, 64, 84, 0.7)',
          backdropFilter: 'blur(8px)',
        }}
        modal
      >
        {close => (
          <div className="popup-container">
            <div className="popup-logout-card">
              <img
                src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690792088/MONEYMATTERS/Group_848_diki3m.png"
                alt="alert"
                className="alert-image"
              />
              <div className="logout-text-container">
                <h1 className="logout-popup-heading">
                  Are you sure you want to Logout?
                </h1>
                <p className="logout-popup-para">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                </p>
                <div className="logout-popup-buttons-container">
                  <button
                    className="yes-logout-button"
                    onClick={this.logout}
                    type="button"
                  >
                    Yes, Logout
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    className="logout-popup-cancel-button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <button
                onClick={close}
                type="button"
                className="popup-close-button"
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

export default withRouter(LogoutPopup)
