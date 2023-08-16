// ** Redux Imports
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'

// ** Service Imports
import { Dispatch } from 'redux'
import STATUSES from 'src/configs/loadingStatuses'
import CompanyService from 'src/services/CompanyService'
import { CompanyInfo } from 'src/types/Company'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

export const fetchCompaniesData = createAsyncThunk(
  'appCompanies/fetchData',
  async (params: { AccessToken: string }, { dispatch }: Redux) => {
    try {
      dispatch(setCompaniesInfoLoadingStatus(STATUSES.PENDING))
      console.log(params, 'params')
      const response: any = await CompanyService.getCompanies(params.AccessToken)
      console.log(response, 'response')
      dispatch(setCompaniesData(response.data))
      dispatch(setCompaniesInfoLoadingStatus(STATUSES.SUCCESS))

      return response.data
    } catch (error) {
      dispatch(setError(error))

      return error
    }
  }
)

export const createCompany = createAsyncThunk(
  'appCompanies/createCompany',
  async (params: { AccessToken: string; companyInfo: CompanyInfo }, { dispatch }) => {
    try {
      const { AccessToken, companyInfo } = params
      dispatch(setCreateCompanyLoadingStatus(STATUSES.PENDING))

      const response: any = await CompanyService.createCompany(AccessToken, companyInfo)

      dispatch(setCompanyData(response.data))
      dispatch(setCreateCompanyLoadingStatus(STATUSES.SUCCESS))

      return response.data
    } catch (error) {
      dispatch(setError(error))
      throw error
    }
  }
)

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
  },
  extraReducers: builder => {}
})

export const {
  setCompaniesInfoLoadingStatus,
  setCompaniesData,
  setError,
  setCreateCompanyLoadingStatus,
  setCompanyData
} = appCompaniesSlice.actions

export default appCompaniesSlice.reducer
