import axios from 'axios'
import { useEffect, useState } from 'react'
import { DataType } from '../types/DataType'
import MainTable from './Table'

function App() {
  const [data, setData] = useState<DataType[]>([])

  const docOne = axios.get('http://127.0.0.1:3008/documents1')
  const docTwo = axios.get('http://127.0.0.1:3008/documents2')

  useEffect(() => {
    Promise.all([docOne, docTwo]).then(([docOne, docTwo]) =>
      setData([...docOne.data, ...docTwo.data]),
    )
  }, [])

  return (
    <div className='App'>
      <MainTable data={data} />
    </div>
  )
}

export default App
