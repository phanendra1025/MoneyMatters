import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import MoneyMatterContext from '../../Context/MoneyMattersContext'
import './index.css'

class LoginRoute extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: '',
    isLoading: false,
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = id => {
    Cookies.set('user_id', id, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  submitTheForm = async () => {
    const {email, password} = this.state
    this.setState({isLoading: true, errorMessage: ''})
    if (email.endsWith('@gmail.com')) {
      const userDetails = {
        email,
        password,
      }
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret':
            'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        },
        body: JSON.stringify(userDetails),
      }
      const response = await fetch(
        `https://bursting-gelding-24.hasura.app/api/rest/get-user-id`,
        options,
      )
      const data = await response.json()
      console.log('login', response.ok)
      console.log(data)
      if (response.ok === true) {
        if (data.get_user_id.length === 0) {
          this.setState({errorMessage: 'Invalid Password', isLoading: false})
        } else {
          const userData = {
            getUserId: data.get_user_id,
          }
          const userId = userData.getUserId[0].id
          this.onSubmitSuccess(userId)
        }
      } else {
        this.setState({
          errorMessage: 'enter valid Details',
          email: '',
          password: '',
        })
      }
    } else {
      this.setState({
        errorMessage: 'Enter Valid Input',
        email: '',
        password: '',
        isLoading: false,
      })
    }
  }

  render() {
    const {email, password, errorMessage, isLoading} = this.state
    const userId = Cookies.get('user_id')
    if (userId !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <MoneyMatterContext.Consumer>
        {value => {
          const {changeSideNavbarActiveOptionId} = value
          const onLoginClick = event => {
            event.preventDefault()
            this.submitTheForm()
            changeSideNavbarActiveOptionId('HOME')
          }
          return (
            <div className="login-container">
              <img
                src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690619700/MONEYMATTERS/43Z_2107.w010.n001.5B.p8.5_ezc9mv.jpg"
                className="login-image"
                alt="login"
              />
              <form className="login-form" onSubmit={onLoginClick}>
                <div className="webiste-logo-container">
                  <img
                    src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690620128/MONEYMATTERS/Group_1_eodscj.png"
                    alt="webiste logo"
                    className="login-website-logo"
                  />
                  <h1 className="login-webiste-name">
                    MONEY <span className="login-website-span"> MATTERS</span>
                  </h1>
                </div>
                <div className="inputs-container username-input-container">
                  <label className="input-labels" htmlFor="email">
                    email
                  </label>
                  <input
                    value={email}
                    className="login-inputs"
                    id="email"
                    type="text"
                    placeholder="Enter the email"
                    onChange={this.onChangeEmail}
                  />
                </div>
                <div className="inputs-container">
                  <label className="input-labels" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="login-inputs"
                    id="password"
                    type="password"
                    placeholder="Enter the password"
                    value={password}
                    onChange={this.onChangePassword}
                  />
                </div>
                <p className="login-error-message">{errorMessage}</p>
                <button className="login-button" type="submit">
                  {isLoading ? (
                    <div className="login-loading-container">
                      <Loader
                        type="TailSpin"
                        color="#ffffff"
                        height="20"
                        width="20"
                      />
                    </div>
                  ) : (
                    <p className="login-text">Login</p>
                  )}
                </button>
              </form>
            </div>
          )
        }}
      </MoneyMatterContext.Consumer>
    )
  }
}

export default LoginRoute
