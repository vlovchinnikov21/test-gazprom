import axios from "axios";
import { useEffect, useState } from "react"
import MainTable from "./Table"

interface DataType {
  id: string,
  name: string;
  quantity: number;
  deliveryDate: string;
  price: number;
  currency: string;
}


function App() {
  const [data, setData] = useState<DataType[]>([]);
  
  const docOne = axios.get('http://127.0.0.1:3008/documents1')
  const docTwo = axios.get('http://127.0.0.1:3008/documents2')


  useEffect(() => {
    Promise.all([docOne, docTwo])
    .then(([docOne, docTwo]) => setData([...docOne.data, ...docTwo.data]))
  }, [])

  console.log(data)
  
    return (
    <div className="App">
      <MainTable data={data}/>
    </div>
  )
}

export default App
