// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers

export const store = configureStore({
  reducer: {},
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      thunk: true
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
