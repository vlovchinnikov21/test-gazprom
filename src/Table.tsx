import React, { useState } from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  id: string,
  name: string;
  quantity: number;
  deliveryDate: string;
  price: number;
  currency: string;
}


const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
  },
  {
    title: 'Delivery date',
    dataIndex: 'deliveryDate',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Currency',
    dataIndex: 'currency',
  },
];

interface MainTableProps {
    data: DataType[]
}

const MainTable: React.FC<MainTableProps> = ({data}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

   const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} rowKey={(row) => row.id} />
    </div>
  );
};

export default MainTable;