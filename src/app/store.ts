import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import jobsReducer from '../features/jobsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
