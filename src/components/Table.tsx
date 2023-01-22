import React, { useEffect, useState } from 'react'
import { Button, Table } from 'antd'
import ItemCancelModal from './ItemCancelModal'
import { DataType } from '../types/DataType'
import { columns } from '../types/ColumnTypes'
import { MainTableProps } from '../types/MainTableProps'

const MainTable: React.FC<MainTableProps> = ({ data }) => {
  const [open, setOpen] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [loading, setLoading] = useState(false)
  const [sum, setSum] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState<DataType[]>([])

  useEffect(() => {
    if (data.length > 0) {
      const quantitySum = data.reduce((sum, current) => sum + current.quantity, 0)
      setSum(quantitySum)
    }
  }, [data.length])

  const showModal = () => {
    setSelectedProduct(data.filter((item) => selectedRowKeys.some((rowKey) => rowKey === item.id)))
    setOpen(true)
  }

  const start = () => {
    setLoading(true)
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([])
      setLoading(false)
    }, 1000)
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const hasSelected = selectedRowKeys.length > 0

  return (
    <div>
      <ItemCancelModal open={open} setOpen={setOpen} selectedProducts={selectedProduct} />
      <div style={{ marginBottom: 16 }}>
        <Button type='primary' onClick={start} disabled={!hasSelected} loading={loading}>
          Сбросить
        </Button>
        <span style={{ marginLeft: 8, marginRight: 8 }}>
          {hasSelected ? `Выбрано ${selectedRowKeys.length} товаров` : ''}
        </span>
        <Button type='primary' onClick={showModal} disabled={!hasSelected}>
          Аннулировать
        </Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        rowKey={(row) => row.id}
        footer={() => `Общее количество: ${sum}`}
      />
    </div>
  )
}

export default MainTable
