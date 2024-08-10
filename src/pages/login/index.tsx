import authHOC from 'src/hoc/authHOC'
import useUserData from 'src/hooks/useUserData'
import LoginPage from 'src/views/pages/login'

const Login = () => {

  return (
    <>
      <LoginPage />
    </>
  )
}

export default authHOC(Login)
