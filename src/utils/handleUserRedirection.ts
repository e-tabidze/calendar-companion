export const handleUserRedirection = (userData: any, router: any) => {
  // if (userData) {
  //   if (userData.active_profile === null) {
  //     router.push('/workspace')
  //   } else if (userData.account_connection.length === 0 || userData.active_profile.calendars.length === 0) {
  //     router.push('/connect-account')
  //   } else {
  //     router.push('/calendar')
  //   }
  // }

  // if (userData) {
  //   if (userData?.username_verified_at === null) {
  //     router.push('/getting-started')
  //   } else {
  //     router.push('/calendar')
  //   }
  // }

  console.log(userData, 'userData')
  if (userData) {
    if (userData?.username_verified_at === null) {
      // router.push('/getting-started')
      if (userData.active_profile === null) {
        router.push('/workspace')
      } else if (userData.account_connection.length === 0 || userData.active_profile.calendars.length === 0) {
        router.push('/connect-account')
      } else {
        router.push('/calendar')
      }
    } else {
      router.push('/calendar')
    }
  }
}
