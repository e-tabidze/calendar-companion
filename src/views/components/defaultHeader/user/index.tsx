import { RentBtn, UserContainer } from './styles'
import Image from '../../image'
import Typography from '../../typography'
import LanguagePicker from '../languagePicker'
import Avatar from '../avatar'

const User = () => {
  return (
    <UserContainer>
      <RentBtn>
        <Image src={'/icons/plus.svg'} alt='img' />
        <Typography type='button' weight='normal' color='dark' className='hidden desktop:inline-flex text-sm'>
          გაქირავება
        </Typography>
      </RentBtn>
      <LanguagePicker />
      <Avatar />
    </UserContainer>
  )
}

export default User
