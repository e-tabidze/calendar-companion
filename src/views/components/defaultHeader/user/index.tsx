import { RentBtn, UserContainer } from './styles'
import Image from '../../image'
import Typography from '../../typography'
import LanguagePicker from '../languagePicker'
import Avatar from '../avatar'
import Tnet from '../tnet'

const User = () => {
  return (
    <UserContainer>
      <RentBtn>
        <Image src={'/icons/plus.svg'} alt='img' />
        <Typography type='button' weight='normal' color='dark' className='font-medium text-orange xl:ml-[8px] hidden xl:flex'>
          გაქირავება
        </Typography>
      </RentBtn>
      <LanguagePicker />
        <Image src='/icons/bell.svg' alt='img' className="mr-4 cursor-pointer"/>
        <Image src='/icons/favorite.svg' alt='img' className="cursor-pointer"/>
      <Avatar />
       <Tnet/>
    </UserContainer>
  )
}

export default User
