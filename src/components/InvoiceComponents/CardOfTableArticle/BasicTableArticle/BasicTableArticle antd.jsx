import React, { useState } from 'react'
import propTypes from 'prop-types'
// import SnackbarFailureMsgArticleUpdateTable from '../../snackbarMessage/SnackbarFailureMsgArticleUpdateTable'
// import SnackbarSuccessMsgArticleUpdateTable from '../../snackbarMessage/SnackbarSuccessMsgArticleUpdateTable'
import { Form, InputNumber, Input, Popconfirm, Table, Typography, Tooltip } from 'antd'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import './styles.css'

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const BasicTableArticle = (props) => {
  const [form] = Form.useForm()
  const [data, setData] = useState(props.propsSelectedArticle)
  const [editingKey, setEditingKey] = useState('')

  const isEditing = (record) => record.key === editingKey

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      code: '',
      price: '',
      quantity: 1,
      vat: '',
      discount: 0,
      ...record,
    })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (key) => {
    try {
      const row = await form.validateFields()
      const newData = [...data]
      const index = newData.findIndex((item) => key === item.key)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row,
        })
        setData(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'article',
      editable: true,
      ellipsis: {
        showTitle: true,
      },
      render: (article) => (
        <Tooltip placement="topLeft" title={article}>
          {article}
        </Tooltip>
      ),
    },
    {
      title: 'Code',
      dataIndex: 'code',
      editable: true,
      // responsive: ['md'],
      render: (code) => (
        <Tooltip placement="topLeft" title={code}>
          {code}
        </Tooltip>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      editable: true,
      ellipsis: {
        showTitle: true,
      },
      render: (price) => (
        <Tooltip placement="topLeft" title={price}>
          {price}
        </Tooltip>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      editable: true,
      // responsive: ['lg'],
      render: (quantity) => (
        <Tooltip placement="topLeft" title={quantity}>
          {quantity}
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <span style={{ display: 'flex' }}>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              <SaveIcon />
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <div>
                <HighlightOffIcon />
              </div>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            <EditIcon />
          </Typography.Link>
        )
      },
    },
  ]
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'quantity' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        pagination={{
          onChange: cancel,
        }}
        scroll={{
          y: 230,
        }}
        size="small"
        title={() => 'Articles details:'}
        rowClassName={(record, index) =>
          index % 2 === 0 ? 'table-row-light editable-row' : 'table-row-dark editable-row'
        }
      />
    </Form>
  )
}
export default BasicTableArticle

BasicTableArticle.propTypes = {
  propsSelectedArticle: propTypes.array,
  setPropsSelectedArticle: propTypes.func,
  editing: propTypes.any,
}

EditableCell.propTypes = {
  editing: propTypes.any,
  dataIndex: propTypes.any,
  title: propTypes.any,
  inputType: propTypes.any,
  record: propTypes.any,
  index: propTypes.any,
  children: propTypes.any,
}
