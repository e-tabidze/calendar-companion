// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Service Imports
import UserService from 'src/services/UserService'

import { Dispatch } from 'redux'
import STATUSES from 'src/configs/loadingStatuses'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch User Data
export const fetchUserData = createAsyncThunk(
  'appUsers/fetchData',
  async (params: { AccessToken: string }, { dispatch }: Redux) => {
    try {
      dispatch(setUserInfoLoadingStatus(STATUSES.PENDING))
      const response: any = await UserService.getUserData(params.AccessToken)
      console.log(response, 'response')
      dispatch(setUserData(response.data))
      dispatch(setUserInfoLoadingStatus(STATUSES.SUCCESS))

      return response.data
    } catch (error) {
      dispatch(setError(error))

      return error
    }
  }
)

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: {
      UserID: null,
      Email: '',
      UserType: null,
      FirstName: '',
      LastName: ''
    },
    status: 'pending',
    error: null
  },
  reducers: {
    setUserInfoLoadingStatus: (state, action) => {
      state.status = action.payload
    },
    setUserData: (state, action) => {
      state.data = action.payload
    },
    setError: (state, action) => {
      state.status = STATUSES.FAILED
      state.error = action.payload
    }
  }
})

export const { setUserInfoLoadingStatus, setUserData, setError } = appUsersSlice.actions

export default appUsersSlice.reducer
