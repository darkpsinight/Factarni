import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { Input, Select, Tooltip } from 'antd'
import { MdDeleteForever } from 'react-icons/md'
import UseAnimations from 'react-useanimations'
import alertTriangle from 'react-useanimations/lib/alertTriangle'
import { IconButton } from '@mui/material'
import { getVats } from 'src/Service/apiVat'
import './styles.css'
import { useGlobal } from 'src/context/Global'

const EditableRow = ({ index, editFormData, handleFormChange, handleDeleteClick }) => {
  const [vats, setVats] = useState()
  const [editRow, setEditRow] = useState(editFormData)

  useEffect(() => {
    const loadVats = async () => {
      const response = await getVats()
      setVats(response.data)
    }
    loadVats()
  }, [])

  const updateVat = (e) => {
    let updatedvat = vats.filter((x) => {
      return x.vat === e
    })[0]
    setEditRow((prevData) => ({
      ...prevData,
      vat: updatedvat,
    }))
    handleFormChange(editRow)
  }

  const updateArticle = (e) => {
    console.log(e.target.value)
    setEditRow((prevData) => ({
      ...prevData,
      article: e.target.value,
    }))
    handleFormChange({ index: index, value: editRow })
  }

  const updateCode = (e) => {
    setEditRow((prevData) => ({
      ...prevData,
      code: e.target.value,
    }))
    handleFormChange({ index: index, value: editRow })
  }

  const updatePrice = (e) => {
    const inputValueRegex = /^(?!0\d)\d{0,9}(\.\d{1,3})?$/
    const newValue = e.target.value

    if (inputValueRegex.test(newValue)) {
      setEditRow((prevData) => {
        const updatedRow = {
          ...prevData,
          price: e.target.value,
        }
        handleFormChange({ index: index, value: updatedRow })
        return updatedRow
      })
    } else {
      setEditRow((prevData) => {
        const updatedRow = {
          ...prevData,
          price: prevData.price,
        }
        handleFormChange({ index: index, value: updatedRow })
        return updatedRow
      })
    }
  }

  const updateQuantity = (e) => {
    const inputValueRegex = /^[1-9]\d{0,9}$/
    const newValue = e.target.value

    if (inputValueRegex.test(newValue)) {
      setEditRow((prevData) => {
        const updatedRow = {
          ...prevData,
          quantity: Number(newValue),
        }
        handleFormChange({ index: index, value: updatedRow })
        return updatedRow
      })
    } else {
      setEditRow((prevData) => {
        const updatedRow = {
          ...prevData,
          quantity: prevData.quantity,
        }
        handleFormChange({ index: index, value: updatedRow })
        return updatedRow
      })
    }
  }

  function handleKeyPress(event) {
    if (event.target.value.length === 0 && event.key === '0') {
      event.preventDefault()
    }
  }

  function handleFocus(event) {
    event.target.select()
  }

  const updateDiscount = (e) => {
    const inputValueRegex = /^(\d{1,2}(\.\d{0,3})?|100)$/
    let newValue = e.target.value

    if (Number(newValue) > 100) {
      newValue = '100'
    }

    if (!inputValueRegex.test(newValue)) {
      newValue = '0'
    }

    const updatedRow = {
      ...editRow,
      discount: Number(newValue),
    }
    setEditRow(updatedRow)
    handleFormChange({ index: index, value: updatedRow })
  }

  const deleteRow = () => {
    handleDeleteClick(editFormData)
  }
  console.log('editRow: ', editRow)

  return (
    <>
      <tr>
        <td>
          <strong>{index + 1}</strong>
        </td>
        <td>
          <Input
            name="article"
            placeholder="Name"
            minLength={1}
            maxLength={99}
            onChange={updateArticle}
            value={editRow.article}
            required
            style={{
              width: '100%',
            }}
          />
        </td>
        <td>
          <Input
            name="code"
            placeholder="Code"
            minLength={1}
            maxLength={99}
            onChange={updateCode}
            value={editRow.code}
            required
            style={{
              width: '100%',
            }}
          />
        </td>
        <td>
          <Input
            name="price"
            placeholder="Price"
            min={0}
            max={9999999999}
            type="number"
            suffix={
              <Tooltip title="Dinar Tunisian currency">
                {' '}
                <strong>DT</strong>
              </Tooltip>
            }
            onChange={updatePrice}
            value={editRow.price}
            required
            style={{
              width: '100%',
            }}
          />
        </td>
        <td>
          <Input
            name="quantity"
            placeholder="Quantity"
            type="number"
            min={1}
            max={9999999999}
            onChange={updateQuantity}
            onKeyPress={handleKeyPress}
            onFocus={handleFocus}
            value={editRow.quantity} //update number of degits here from profile settings
            required
            style={{
              width: '100%',
            }}
          />
        </td>
        <td>
          <Select
            name="vat"
            disabled
            required
            onChange={(e) => {
              updateVat(e)
              console.log('editRow: ', editRow)
            }}
            style={{ width: '90px' }}
            value={editRow.vat.vat * 100 + ' %'}
          >
            {vats?.map((item) => (
              <Select.Option key={item.id} value={item.vat}>
                {item.vat * 100} %
              </Select.Option>
            ))}
          </Select>
        </td>
        <td>
          <Input
            name="discount"
            placeholder="Discount"
            max={100}
            step={0.001}
            type="number"
            suffix={
              <Tooltip title="Percent">
                {' '}
                <strong>%</strong>
              </Tooltip>
            }
            onChange={updateDiscount}
            value={editRow.discount}
            required
            style={{
              width: '100%',
            }}
            disabled={useGlobal().disabledDiscountInput}
            title={editRow.discount} // title: to show browser tooltip (shows discount value inside browser tooltip)
          />
        </td>
        <td>
          <div style={{ display: 'flex' }}>
            <Tooltip
              color="red"
              mouseLeaveDelay={0}
              title={
                <>
                  <UseAnimations animation={alertTriangle} size={40} strokeColor="white" />
                  <strong style={{ fontSize: 15 }}>Delete</strong>
                </>
              }
            >
              <IconButton type="button" size="medium" onClick={deleteRow}>
                <MdDeleteForever color="red" />
              </IconButton>
            </Tooltip>
          </div>
        </td>
      </tr>
    </>
  )
}

export default EditableRow

EditableRow.propTypes = {
  index: propTypes.any,
  editFormData: propTypes.any,
  handleFormChange: propTypes.func,
  handleDeleteClick: propTypes.func,
}
