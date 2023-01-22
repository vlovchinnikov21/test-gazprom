import { ColumnsType } from "antd/es/table";
import { DataType } from "./DataType";

export const columns: ColumnsType<DataType> = [
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
  ];