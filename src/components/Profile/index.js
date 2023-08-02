import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import AddTransactionPopup from '../AddTransactionPopup'

const userProfileApiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class Profile extends Component {
  state = {
    userProfileDetails: [],
    userProfileDetailsApiStatus: userProfileApiConstants.initial,
  }

  componentDidMount() {
    this.getTheProfileDetails()
  }

  getTheProfileDetails = async () => {
    this.setState({
      userProfileDetailsApiStatus: userProfileApiConstants.inProcess,
    })
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
      const fetchedUserProfileData = data.users[0]
      const updatedUserProfileData = {
        city: fetchedUserProfileData.city,
        country: fetchedUserProfileData.country,
        dateOfBirth: fetchedUserProfileData.date_of_birth,
        email: fetchedUserProfileData.email,
        name: fetchedUserProfileData.name,
        permanentAddress: fetchedUserProfileData.permanent_address,
        postalCode: fetchedUserProfileData.postal_code,
        presentAddress: fetchedUserProfileData.present_address,
      }
      this.setState({
        userProfileDetails: updatedUserProfileData,
        userProfileDetailsApiStatus: userProfileApiConstants.success,
      })
    } else {
      this.setState({
        userProfileDetailsApiStatus: userProfileApiConstants.failure,
      })
    }
  }

  renderUserProfileSuccessView = () => {
    const {userProfileDetails} = this.state
    const {
      city,
      country,
      dateOfBirth,
      email,
      name,
      permanentAddress,
      postalCode,
      presentAddress,
    } = userProfileDetails
    const cityValue = city === null ? '' : city
    const countryValue = country === null ? '' : country
    const dateOfBirthValue = country === null ? '' : dateOfBirth
    const emailValue = email === null ? '' : email
    const nameValue = name === null ? '' : name
    const permanentAddressValue =
      permanentAddress === null ? '' : permanentAddress
    const postalCodeValue = postalCode === null ? '' : postalCode
    const presentAddressValue = presentAddress === null ? '' : presentAddress

    const password = 'password'
    return (
      <div className="profile-card">
        <img
          src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690785177/pexels-christina-morillo-1181690_1_rup0db.jpg"
          className="user-profile-picture"
          alt="user profile"
        />
        <div className="profile-inputs-first-container">
          <div className="profile-inputs-wrapper">
            <label htmlFor="username" className="profile-input-labels">
              Your Name
            </label>
            <br />
            <input
              readOnly
              value={nameValue}
              type="text"
              id="username"
              placeholder="your name"
              className="profile-inputs"
            />
          </div>
          <div className="profile-inputs-wrapper">
            <label htmlFor="email" className="profile-input-labels">
              Email
            </label>
            <br />
            <input
              readOnly
              value={emailValue}
              type="text"
              id="email"
              placeholder="email"
              className="profile-inputs"
            />
          </div>
          <div className="profile-inputs-wrapper">
            <label htmlFor="dateOfBirth" className="profile-input-labels">
              Date of Birth
            </label>
            <br />
            <input
              readOnly
              type="date"
              value={dateOfBirthValue}
              id="dateOfBirth"
              className="profile-inputs"
            />
          </div>
          <div className="profile-inputs-wrapper">
            <label htmlFor="permanentAddress" className="profile-input-labels">
              Permanent Address
            </label>
            <br />
            <input
              readOnly
              type="text"
              value={permanentAddressValue}
              id="permanentAddress"
              placeholder="permanent address"
              className="profile-inputs"
            />
          </div>
          <div className="profile-inputs-wrapper">
            <label htmlFor="postalCode" className="profile-input-labels">
              Postal Code
            </label>
            <br />
            <input
              readOnly
              value={postalCodeValue}
              type="text"
              id="Postal Code"
              placeholder="postal code"
              className="profile-inputs"
            />
          </div>
        </div>
        <div className="profile-inputs-first-container">
          <div className="profile-inputs-wrapper">
            <label htmlFor="username" className="profile-input-labels">
              User Name
            </label>
            <br />
            <input
              readOnly
              value={nameValue}
              type="text"
              id="username"
              placeholder="user name"
              className="profile-inputs"
            />
          </div>
          <div className="profile-inputs-wrapper">
            <label htmlFor="password" className="profile-input-labels">
              Password
            </label>
            <br />
            <input
              readOnly
              value={password}
              type="password"
              id="password"
              placeholder="password"
              className="profile-inputs"
            />
          </div>
          <div className="profile-inputs-wrapper">
            <label htmlFor="presentAddress" className="profile-input-labels">
              Present Address
            </label>
            <br />
            <input
              readOnly
              value={presentAddressValue}
              type="text"
              id="presentAddress"
              className="profile-inputs"
              placeholder="present address"
            />
          </div>
          <div className="profile-inputs-wrapper">
            <label htmlFor="city" className="profile-input-labels">
              City
            </label>
            <br />
            <input
              readOnly
              value={cityValue}
              type="text"
              id="city"
              placeholder="city"
              className="profile-inputs"
            />
          </div>
          <div className="profile-inputs-wrapper">
            <label htmlFor="country" className="profile-input-labels">
              Country
            </label>
            <br />
            <input
              readOnly
              value={countryValue}
              type="text"
              id="country"
              placeholder="country"
              className="profile-inputs"
            />
          </div>
        </div>
      </div>
    )
  }

  renderProfileLoadingView = () => (
    <div className="profile-loader-container">
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

  renderAllProfileViews = () => {
    const {userProfileDetailsApiStatus} = this.state
    switch (userProfileDetailsApiStatus) {
      case userProfileApiConstants.success:
        return this.renderUserProfileSuccessView()
      case userProfileApiConstants.failure:
        return this.renderFailureView()
      case userProfileApiConstants.inProcess:
        return this.renderProfileLoadingView()
      default:
        return null
    }
  }

  render() {
    const userId = Cookies.get('user_id')
    return (
      <div className="profile-container">
        <div className="profile-header-section">
          <h1 className="profile-heading">Profile</h1>
          {userId === '3' ? null : <AddTransactionPopup />}
        </div>
        <div className="profile-section">{this.renderAllProfileViews()}</div>
      </div>
    )
  }
}

export default Profile
