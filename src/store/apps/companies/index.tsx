// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Service Imports
import { Dispatch } from 'redux'
import STATUSES from 'src/configs/loadingStatuses'
import CompanyService from 'src/services/CompanyService'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

export const appCompaniesSlice = createSlice({
  name: 'appCompanies',
  initialState: {
    data: null,
    status: 'pending',
    error: null,
    createdCompanyData: null
  },
  reducers: {
    setCompaniesInfoLoadingStatus: (state, action) => {
      state.status = action.payload
    },
    setCreateCompanyLoadingStatus: (state, action) => {
      state.status = STATUSES.PENDING
      state.status = action.payload
    },
    setCompanyData: (state, action) => {
      state.createdCompanyData = action.payload
    },
    setCompaniesData: (state, action) => {
      state.data = action.payload
    },
    setError: (state, action) => {
      state.status = STATUSES.FAILED
      state.error = action.payload
    }
  }
})

export const {
  setCompaniesInfoLoadingStatus,
  setCompaniesData,
  setError,
  setCreateCompanyLoadingStatus,
  setCompanyData
} = appCompaniesSlice.actions

export default appCompaniesSlice.reducer
