import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { DataType } from '../types'
import { BASE_URL } from '../utils/constants'
import type { RootState } from './store'

interface TableState {
  data: DataType[]
  isLoading: boolean
}

const initialState: TableState = {
  data: [
    {
      id: '',
      name: '',
      quantity: 0,
      deliveryDate: '',
      price: 0,
      currency: 'USD',
    },
  ],
  isLoading: false,
}

export const getTableData = createAsyncThunk('table/getData', async () => {
  try {
    const responseOne = await axios.get(`${BASE_URL}/documents1`)
    const responseTwo = await axios.get(`${BASE_URL}/documents2`)
    return [...responseOne.data, ...responseTwo.data]
  } catch (error) {
    console.error(error)
  }
})

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTableData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTableData.fulfilled, (state, action) => {
        if (action.payload) {
          console.log(action.payload)
          state.data = action.payload
        }
        state.isLoading = false
      })
      .addCase(getTableData.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const tableReducer = tableSlice.reducer

export const tableDataSelector = (state: RootState) => state.tableReducer.data

export const tableLoadingSelector = (state: RootState) => state.tableReducer.isLoading
