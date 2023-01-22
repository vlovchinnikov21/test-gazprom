import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';

interface DataType {
  id: string,
  name: string;
  quantity: number;
  deliveryDate: string;
  price: number;
  currency: 'USD' | 'RUB';
}


const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 5,
    },
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    sorter: {
      compare: (a, b) => a.quantity - b.quantity,
      multiple: 4,
    },
  },
  {
    title: 'Delivery date',
    dataIndex: 'deliveryDate',
    defaultSortOrder: 'ascend',
    sorter: {
      compare: (a, b) => Date.parse(a.deliveryDate) - Date.parse(b.deliveryDate),
      multiple: 3,
    },
  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: {
      compare: (a, b) => a.price - b.price,
      multiple: 2,
    },
  },
  {
    title: 'Currency',
    dataIndex: 'currency',
    sorter: {
      compare: (a, b) => a.currency.localeCompare(b.currency),
      multiple: 1,
    },
  },
];

interface MainTableProps {
    data: DataType[]
}

const MainTable: React.FC<MainTableProps> = ({data}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [sum, setSum] = useState(0);
  
  useEffect(() => {
     if(data.length > 0) {
      const quantitySum = data.reduce((sum, current) => sum + current.quantity, 0)
      setSum(quantitySum)
     }
  }, [data.length])
  

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
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} rowKey={(row) => row.id} footer={() => `Общее количество: ${sum}`}/>
    </div>
  );
};

export default MainTable;