// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import companies from './apps/companies'

export const store = configureStore({
  reducer: {
    companies
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      thunk: true
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
