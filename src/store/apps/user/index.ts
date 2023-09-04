// ** Redux Imports
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'

// ** Service Imports
import UserService from 'src/services/UserService'

import { Dispatch } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState } from 'src/store'
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

const hydrate = createAction<AppState>(HYDRATE)

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: {
      UserID: '',
      Email: '',
      UserType: '',
      FirstName: '',
      LastName: '',
      gender_id: '',
      birth_year: '',
      birth_date: '',
      phone: '',
      information: {
        profile_pic: '',
        gender: '',
        birth_date: '',
        identification_number: '',
        driver_license_expiration: '',
        verified_at: '',
        created_at: '',
        updated_at: '',
        deleted_at: ''
      }
    },
    status: 'pending',
    error: null
  },
  reducers: {
    setUserInfoLoadingStatus: (state, action) => {
      state.status = action.payload
    },
    setUserData: (state, action) => {
      state.data = action.payload.result.data
    },
    setError: (state, action) => {
      state.status = STATUSES.FAILED
      state.error = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(hydrate, (state, action) => {
      console.log(state, action, 'state, action')
      return {
        ...state,
        ...action.payload
      }
    })
  }
})

export const { setUserInfoLoadingStatus, setUserData, setError } = appUsersSlice.actions

export default appUsersSlice.reducer
