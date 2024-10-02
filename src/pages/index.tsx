'use client'
import { useEffect, useState } from 'react'
import FooterSection from 'src/views/footerSection'
import Header from 'src/views/header'
import MeetCompanyon from 'src/views/meetCompanyon'
import MeetingsRedefined from 'src/views/meetingsRedefined'
import PremiumSection from 'src/views/premiumSection'
import PrivateItems from 'src/views/privateItems'
import Workspaces from 'src/views/workspaces'

const MainPage = () => {
  return (
    <div>
      <div className='max-w-[1440px] w-full mx-auto'>
        <Header />
        <MeetCompanyon />
        <Workspaces />
        <MeetingsRedefined />
      </div>
      <PremiumSection />
      <PrivateItems />  
      <FooterSection />
    </div>
  )
}

export default MainPage
