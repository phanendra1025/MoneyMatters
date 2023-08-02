import React from 'react'

const MoneyMatterContext = React.createContext({
  activeOptionId: '',
  optionsList: [],
  changeSideNavbarActiveOptionId: () => {},
})

export default MoneyMatterContext
