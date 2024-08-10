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

  // if (userData) {
  //   if (userData?.username_verified_at === null) {
  //     // router.push('/getting-started')
  //     if (userData.active_profile === null) {
  //       router.push('/workspace')
  //     } else if (userData.account_connection.length === 0 || userData.active_profile.calendars.length === 0) {
  //       router.push('/connect-account')
  //     } else {
  //       router.push('/calendar')
  //     }
  //   } else {
  //     router.push('/calendar')
  //   }
  // }
  if (userData) {
    console.log(userData, 'userData')
    if (userData?.username_verified_at === null) {

      // if (!!userData?.information?.nickname === false) {
        router.push('/getting-started')
        
      // } else if (userData.active_profile === null) {
      //   router.push('/workspace')
      // } else if (userData.account_connection.length === 0 || userData.active_profile.calendars.length === 0) {
      //   router.push('/connect-account')
      // } else {
      //   router.push('/calendar')
      // }
    } else {
      router.push('/calendar')
    }
  }
}
