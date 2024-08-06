import authHOC from 'src/hoc/authHOC'
import ConnectAccountPage from 'src/views/pages/connect-account'

const ConnectAccount = () => {
  
  return <ConnectAccountPage />
}

export default authHOC(ConnectAccount)
