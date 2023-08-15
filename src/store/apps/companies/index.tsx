// ** Redux Imports
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'

// ** Service Imports
import { Dispatch } from 'redux'
import STATUSES from 'src/configs/loadingStatuses'
import CompanyService from 'src/services/CompanyService'

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

export const appCompaniesSlice = createSlice({
  name: 'appCompanies',
  initialState: {
    data: null,
    status: 'pending',
    error: null
  },
  reducers: {
    setCompaniesInfoLoadingStatus: (state, action) => {
      state.status = action.payload
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

export const { setCompaniesInfoLoadingStatus, setCompaniesData, setError } = appCompaniesSlice.actions

export default appCompaniesSlice.reducer
