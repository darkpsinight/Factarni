import React from 'react'
import propTypes from 'prop-types'
import { TbEdit } from 'react-icons/tb'
import { MdDeleteForever } from 'react-icons/md'
import UseAnimations from 'react-useanimations'
import alertTriangle from 'react-useanimations/lib/alertTriangle'
import { IconButton } from '@mui/material'
import { Tooltip } from 'antd'

const ReadOnlyRow = ({ item, index, handleEditClick, handleDeleteClick }) => {
  console.log('item: ', item)

  return (
    <>
      <tr key={item.id}>
        <td>
          <strong>{index + 1}</strong>
        </td>
        <td>
          <Tooltip title={item.article}>{item.article}</Tooltip>
        </td>
        <td>
          <Tooltip title={item.code}>{item.code}</Tooltip>
        </td>
        <td>
          <Tooltip title={item.price}>
            {item.price} <strong>DT</strong>
          </Tooltip>
        </td>
        <td>
          <Tooltip title={item.quantity}>{item.quantity}</Tooltip>
        </td>
        <td>
          <Tooltip title={item.vat.vat * 100}>
            {item.vat.vat * 100} <strong>%</strong>
          </Tooltip>
        </td>
        <td>
          <Tooltip title={item.discount}>
            {item.discount} <strong>DT</strong>
          </Tooltip>
        </td>
        <td>
          <Tooltip color="blue" mouseLeaveDelay={0} title="Edit">
            <IconButton
              type="button"
              style={{ marginRight: '10px' }}
              size="medium"
              onClick={(event) => handleEditClick(event, item)}
            >
              <TbEdit color="#1890FF" />
            </IconButton>
          </Tooltip>
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
            <IconButton type="button" size="medium" onClick={handleDeleteClick}>
              <MdDeleteForever color="red" />
            </IconButton>
          </Tooltip>
        </td>
      </tr>
    </>
  )
}

export default ReadOnlyRow

ReadOnlyRow.propTypes = {
  item: propTypes.any,
  index: propTypes.any,
  handleEditClick: propTypes.func,
  handleDeleteClick: propTypes.func,
}
