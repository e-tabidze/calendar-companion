import useUserData from 'src/hooks/useUserData'
import LoginPage from 'src/views/pages/login'

const Login = () => {
  const { userData } = useUserData()

  console.log(userData, 'userData')

  
  return (
    <>
      <LoginPage />
    </>
  )
}

export default Login
