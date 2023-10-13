import { RentBtn,FavoriteBtn, UserContainer } from './styles'
import Image from '../../image'
import Typography from '../../typography'
import LanguagePicker from '../languagePicker'
import Avatar from '../avatar'
import Notification from "../notification";

const User = () => {
  return (
    <UserContainer>
      <RentBtn className="hidden md:flex">
        <Image src={'/icons/plus.svg'} alt='img' />
        <Typography type='button' weight='normal' color='dark' className='font-medium text-orange xl:ml-[8px] hidden xl:flex'>
          გაქირავება
        </Typography>
      </RentBtn>
      <LanguagePicker />
        <FavoriteBtn className="hidden md:flex">
            <Image src='/icons/favorite.svg' alt='img'/>
        </FavoriteBtn>
        <Notification />
      <Avatar />
    </UserContainer>
  )
}

export default User
