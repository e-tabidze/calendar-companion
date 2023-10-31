// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** Service Imports
import STATUSES from 'src/configs/loadingStatuses'

export const slice = createSlice({
  name: 'slice',
  initialState: {
    data: null,
    status: '',
    error: null
  },
  reducers: {
    setDataLoadingStatus: (state, action) => {
      state.status = STATUSES.PENDING
    },

    setData: (state, action) => {
      state.data = action.payload
      state.status = STATUSES.SUCCESS
    },

    setError: (state, action) => {
      state.status = STATUSES.FAILED
      state.error = action.payload
    }
  },
  extraReducers: {}
})

export const { setData } = slice.actions

export default slice.reducer
