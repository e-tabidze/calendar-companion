// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Service Imports
import UserService from 'src/services/UserService'

// ** Fetch User Data
export const fetchData = createAsyncThunk('appUsers/fetchData', async () => {
  try {
    const response: any = UserService.getUserData()

    return response.data
  } catch (error) {
    return error
  }
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: null
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

export default appUsersSlice.reducer
