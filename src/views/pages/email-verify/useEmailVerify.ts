import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterSchema } from 'src/@core/validation/RegisterSchema'
import { RegisterUser } from 'src/types/auth'
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
