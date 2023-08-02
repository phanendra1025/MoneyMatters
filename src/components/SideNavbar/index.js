import {Component} from 'react'
import {withRouter} from 'react-router-dom'

import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SideNavbarOptionButton from '../SideNavbarOptionButton'
import MoneyMattersContext from '../../Context/MoneyMattersContext'
import LogoutPopup from '../LogoutPopup'

const profileApiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class SideNavbar extends Component {
  state = {
    userDetails: [],
    userDetailsApiStatus: profileApiConstants.initial,
  }

  componentDidMount() {
    this.getTheUserDetails()
  }

  getTheUserDetails = async () => {
    this.setState({userDetailsApiStatus: profileApiConstants.inProcess})
    const id = Cookies.get('user_id')
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'user',
        'x-hasura-user-id': `${id}`,
      },
    }
    const response = await fetch(
      'https://bursting-gelding-24.hasura.app/api/rest/profile',
      options,
    )
    const data = await response.json()
    if (response.ok === true) {
      this.setState({
        userDetails: data.users[0],
        userDetailsApiStatus: profileApiConstants.success,
      })
    }
  }

  renderSuccessUserDetailsView = () => {
    const {userDetails} = this.state
    const {name, email} = userDetails
    return (
      <div className="details-container">
        <img
          src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690642750/MONEYMATTERS/17004_aepcmr.png"
          alt="profile"
          className="side-navbar-profile-image"
        />
        <div className="side-bar-profile-details">
          <p className="user-name">{name}</p>
          <p className="user-email">{email}</p>
        </div>
        <LogoutPopup />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="side-nav-bar-profile-loader-container">
      <Loader type="TailSpin" color="#2D60FF" height="30" width="30" />
    </div>
  )

  renderBottomView = () => {
    const {userDetailsApiStatus} = this.state
    switch (userDetailsApiStatus) {
      case profileApiConstants.success:
        return this.renderSuccessUserDetailsView()
      case profileApiConstants.inProcess:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <MoneyMattersContext.Consumer>
        {value => {
          const {
            activeOptionId,
            optionsList,
            changeSideNavbarActiveOptionId,
          } = value
          return (
            <nav className="side-nav-bar-container">
              <div className="side-nav-bar-top-section">
                <div className="website-logo-and-name-container">
                  <img
                    className="side-navbar-website-logo"
                    src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690620128/MONEYMATTERS/Group_1_eodscj.png"
                    alt="webiste logo"
                  />
                  <h1 className="website-name">
                    Money <span className="website-span-name"> Matters</span>
                  </h1>
                </div>
                <ul className="side-options-container">
                  {optionsList.map(eachOption => (
                    <SideNavbarOptionButton
                      optionDetails={eachOption}
                      key={eachOption.optionId}
                      isActive={activeOptionId === eachOption.optionId}
                      changeSideNavbarActiveOptionId={
                        changeSideNavbarActiveOptionId
                      }
                    />
                  ))}
                </ul>
              </div>
              <div className="side-navbar-bottom-section">
                {this.renderBottomView()}
              </div>
            </nav>
          )
        }}
      </MoneyMattersContext.Consumer>
    )
  }
}

export default withRouter(SideNavbar)
