import React, { createContext, useContext, useState } from 'react'
import propTypes from 'prop-types'

export const GlobalContext = createContext()
export const useGlobal = () => useContext(GlobalContext)
export function Global({ children }) {
  const [newDataContext, setNewDataContext] = useState([])

  const value = { newDataContext, setNewDataContext }

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

Global.propTypes = {
  children: propTypes.any,
}
