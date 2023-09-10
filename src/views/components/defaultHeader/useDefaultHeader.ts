import { useState } from 'react'
import { ACCESS_TOKEN_NAME } from 'src/env'
import Cookie from 'src/helpers/Cookie'

const useDefaultHeader = () => {
  const [isAuth] = useState(Cookie.get(ACCESS_TOKEN_NAME))

  return { isAuth }
}

export default useDefaultHeader
