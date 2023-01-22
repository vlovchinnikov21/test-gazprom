import { useState } from 'react'
import { Button, Table } from 'antd'
import ItemCancelModal from './ItemCancelModal'
import { DataType } from '../types'
import { ColumnsType } from 'antd/es/table'
import axios from 'axios'
import * as dayjs from 'dayjs'
import { BASE_URL } from '../utils/constants'

const columns: ColumnsType<DataType> = [
  {
    title: 'Название',
    dataIndex: 'name',
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 5,
    },
  },
  {
    title: 'Количество',
    dataIndex: 'quantity',
    sorter: {
      compare: (a, b) => a.quantity - b.quantity,
      multiple: 4,
    },
  },
  {
    title: 'Дата доставки',
    dataIndex: 'deliveryDate',
    render: (value) => dayjs(value).format('hh:mm DD.MM.YYYY'),
    defaultSortOrder: 'ascend',
    sorter: {
      compare: (a, b) => Date.parse(a.deliveryDate) - Date.parse(b.deliveryDate),
      multiple: 3,
    },
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    sorter: {
      compare: (a, b) => a.price - b.price,
      multiple: 2,
    },
  },
  {
    title: 'Валюта',
    dataIndex: 'currency',
    sorter: {
      compare: (a, b) => a.currency.localeCompare(b.currency),
      multiple: 1,
    },
  },
]

interface MainTableProps {
  data: DataType[]
}

const MainTable: React.FC<MainTableProps> = ({ data }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [selectedProduct, setSelectedProduct] = useState<DataType[]>([])

  const hasSelected = selectedRowKeys.length > 0
  const quantitySum = data.reduce((sum, current) => sum + current.quantity, 0)
  const productNames = selectedProduct.map((item) => item.name).join(', ')

  const handleSubmit = () => {
    const products = selectedProduct.map((item) => item.id)
    axios({
      url: `${BASE_URL}/cancel`,
      method: 'POST',
      data: {
        products,
      },
    })
      .then((res) => {
        console.log(res)
        setConfirmLoading(true)
        setTimeout(() => {
          setOpen(false)
          setConfirmLoading(false)
        }, 2000)
      })
      .catch((err) => console.log(err))
  }

  const showModal = () => {
    setOpen(true)
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedProduct(
      data.filter((item) => newSelectedRowKeys.some((rowKey) => rowKey === item.id)),
    )
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  return (
    <div style={{ margin: 16 }}>
      <ItemCancelModal
        open={open}
        setOpen={setOpen}
        productNames={productNames}
        handleSubmit={handleSubmit}
        loading={confirmLoading}
      />
      <div style={{ marginBottom: 16 }}>
        <Button type='primary' onClick={showModal} disabled={!hasSelected}>
          Аннулировать
        </Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        rowKey={(row) => row.id}
        footer={() => `Общее количество: ${quantitySum}`}
      />
    </div>
  )
}

export default MainTable
