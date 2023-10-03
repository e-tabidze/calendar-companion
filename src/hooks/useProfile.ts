import { useState } from 'react'
import { useRouter } from 'next/router'
import UserService from 'src/services/UserService'
import { useQuery } from '@tanstack/react-query'

const useProfile = () => {
  const [showProfile, setShowProfile] = useState(true)
  const [showRightTab, setShowRightTab] = useState(true)

  const router = useRouter()

  const usePersonalInfo: any = useQuery({
    queryKey: ['personalInfo'],
    queryFn: () => getUserInfo(),
    staleTime: Infinity
  })

  const userInfo = usePersonalInfo.data?.result?.data
  const isLoading = usePersonalInfo.isLoading

  return {
    showProfile,
    setShowProfile,
    showRightTab,
    setShowRightTab,
    router,
    userInfo,
    isLoading
  }
}

export default useProfile

export const getUserInfo = async (accessToken = '') => {
  try {
    const response: any = await UserService.getUserInfo(accessToken)
    
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
