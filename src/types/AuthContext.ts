export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  username: string
  password: string
}

export type RegisterParams = {
  email: string
  username: string
  password: string
}

export type User = {
  UserID: number | null
  Email: string
  UserType: number | null
  FirstName: string
  LastName: string
}

export type AuthValuesType = {
  loading: boolean
  setLoading: (value: boolean) => void
  logout: () => void
  isInitialized: boolean
  user: User | null
  setUser: (value: User | null) => void
  setIsInitialized: (value: boolean) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
