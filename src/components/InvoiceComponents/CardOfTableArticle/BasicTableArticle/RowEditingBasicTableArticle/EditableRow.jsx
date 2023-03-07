import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { Input, Select, Tooltip } from 'antd'
import { MdDeleteForever } from 'react-icons/md'
import UseAnimations from 'react-useanimations'
import alertTriangle from 'react-useanimations/lib/alertTriangle'
import { IconButton } from '@mui/material'
import { getVats } from 'src/Service/apiVat'
import './styles.css'

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

  /*   const updatePrice = (e) => {
    setEditRow((prevData) => ({
      ...prevData,
      price: e.target.value,
    }))
    handleFormChange({ index: index, value: editRow })
  } */

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

  /* const updateQuantity = (event) => {
    const value = parseInt(event.target.value, 10)
    if (value < 1) {
      event.target.value = 1
    } else {
      setEditRow((prevData) => ({
        ...prevData,
        quantity: Number(event.target.value),
      }))
      handleFormChange({ index: index, value: editRow })
    }
  } */

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
    const inputValueRegex = /^(\d{1,})(\.\d{0,3})?$/
    const newValue = e.target.value

    if (inputValueRegex.test(newValue) && Number(newValue) <= Number(editRow.price)) {
      setEditRow((prevData) => {
        const updatedRow = {
          ...prevData,
          discount: Number(newValue),
        }
        handleFormChange({ index: index, value: updatedRow })
        return updatedRow
      })
    } else {
      setEditRow((prevData) => {
        const updatedRow = {
          ...prevData,
          discount: prevData.price,
        }
        handleFormChange({ index: index, value: updatedRow })
        return updatedRow
      })
    }
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
            value={editRow.quantity /* .toFixed(2) */}
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
            min={0}
            max={editRow.price}
            step={0.001}
            type="number"
            suffix={
              <Tooltip title="Dinar Tunisian currency">
                {' '}
                <strong>DT</strong>
              </Tooltip>
            }
            onChange={updateDiscount}
            value={editRow.discount}
            required
            style={{
              width: '100%',
            }}
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
