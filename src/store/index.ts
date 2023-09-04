// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

// ** Reducers
import user from './apps/user'
import companies from './apps/companies'

const store = () =>
  configureStore({
    reducer: {
      user,
      // companies
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false
      })
  })

export const wrapper = createWrapper(store)

export type AppStore = ReturnType<typeof store>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
