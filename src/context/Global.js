import React, { createContext, useContext, useState } from 'react'
import propTypes from 'prop-types'

export const GlobalContext = createContext()
export const useGlobal = () => useContext(GlobalContext)
export function Global({ children }) {
  const [newDataContext, setNewDataContext] = useState([])
  const [disabledDiscountInput, setDisabledDiscountInput] = useState(null)
  const [stampIncluded, setStampIncluded] = useState(false)
  const [vatIncluded, setVatIncluded] = useState(false)
  const [selectedInvoiceById, setSelectedInvoiceById] = useState([])

  const value = {
    newDataContext,
    setNewDataContext,
    disabledDiscountInput,
    setDisabledDiscountInput,
    stampIncluded,
    setStampIncluded,
    vatIncluded,
    setVatIncluded,
    selectedInvoiceById,
    setSelectedInvoiceById,
  }

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

Global.propTypes = {
  children: propTypes.any,
}
