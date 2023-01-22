import { Spin } from 'antd'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getTableData, tableDataSelector, tableLoadingSelector } from '../store/tableSlice'
import MainTable from './Table'

function App() {
  const dispatch = useAppDispatch()
  const data = useAppSelector(tableDataSelector)
  const isLoading = useAppSelector(tableLoadingSelector)

  useEffect(() => {
    dispatch(getTableData())
  }, [])

  if (isLoading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <Spin tip='Загрузка' size='large'></Spin>
      </div>
    )
  }
  return <MainTable data={data} />
}

export default App
