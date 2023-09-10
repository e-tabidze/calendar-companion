// ** Redux Imports
import { createSlice, createAction } from '@reduxjs/toolkit'


import { HYDRATE } from 'next-redux-wrapper'
import STATUSES from 'src/configs/loadingStatuses'


// ** Fetch User Data
// export const fetchUserData = createAsyncThunk(
//   'appUsers/fetchData',
//   async (params: { AccessToken: string }, { dispatch }: Redux) => {
//     try {
//       dispatch(setUserInfoLoadingStatus(STATUSES.PENDING))
//       const response: any = await UserService.getUserData(params.AccessToken)
//       console.log(response, 'response')
//       dispatch(setUserData(response.data))
//       dispatch(setUserInfoLoadingStatus(STATUSES.SUCCESS))

//       return response.data
//     } catch (error) {
//       dispatch(setError(error))

//       return error
//     }
//   }
// )

const hydrate = createAction<any>(HYDRATE)

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: {
      UserID: 0,
      Email: '',
      UserType: 0,
      FirstName: '',
      LastName: '',
      gender_id: 0,
      birth_year: 0,
      birth_date: '',
      phone: '',
      information: {
        profile_pic: '',
        gender: 0,
        birth_date: '',
        identification_number: '',
        driver_license_expiration: '',
        verified_at: '',
        created_at: '',
        updated_at: '',
        deleted_at: ''
      }
    },
    status: STATUSES.INITIAL,
    error: null
  },
  reducers: {
    setUserInfoLoadingStatus: (state, action) => {
      state.status = action.payload
    },
    setUserData: (state, action) => {
      state.data = action.payload.result.data

      console.log(state.data, 'state.data', action.payload, 'action.payload')
    },
    setError: (state, action) => {
      state.status = STATUSES.FAILED
      state.error = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    })
  }
})

export const { setUserInfoLoadingStatus, setUserData, setError } = appUsersSlice.actions

export default appUsersSlice.reducer
