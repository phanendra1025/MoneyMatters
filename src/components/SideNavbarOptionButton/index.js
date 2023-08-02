import Cookies from 'js-cookie'
import './index.css'

const SideNavbarOptionButton = props => {
  const {optionDetails, isActive, changeSideNavbarActiveOptionId} = props
  const userId = Cookies.get('user_id')
  const {optionId, iconUrl, activeIconUrl} = optionDetails
  let {displayText} = optionDetails
  if (optionId === 'TRANSACTIONS') {
    displayText = userId === '3' ? 'All Transactions' : 'Your Transactions'
  }
  const iconSrc = isActive ? activeIconUrl : iconUrl
  const textClass = isActive ? 'active-side-navbar-option-name' : ''
  const buttonClass = isActive ? 'active-navbar-option-button' : ''
  const changeTheId = () => {
    changeSideNavbarActiveOptionId(optionId)
  }
  return (
    <li className="side-navbar-option-item">
      <button
        type="button"
        onClick={changeTheId}
        className={`side-navbar-option-button ${buttonClass}`}
      >
        <img src={iconSrc} alt="icon" className="icon-images" />
        <p className={`side-navbar-option-name ${textClass}`}>{displayText}</p>
      </button>
    </li>
  )
}

export default SideNavbarOptionButton
