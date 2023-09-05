import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { UserData } from 'src/types/User'

const useProfile = () => {
  const [showProfile, setShowProfile] = useState(true)
  const [showRightTab, setShowRightTab] = useState(true)

  const router = useRouter()

  const userData: UserData = useSelector((state: any) => state.user?.data)

  return {
    showProfile,
    setShowProfile,
    showRightTab,
    setShowRightTab,
    userData,
    router
  }
}

export default useProfile
