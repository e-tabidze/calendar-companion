import AuthService from 'src/services/AuthService'

const useEmailVerify = () => {
  const verifyEmail = async (AccessToken = '', code: string) => {
    try {
      const response: any = await AuthService.postVerifyEmail(AccessToken, code)

      return response.data
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  }

  return {
    verifyEmail
  }
}

export default useEmailVerify
