import { RentBtn, FavoriteBtn, UserContainer } from './styles'
import Image from '../../image'
import Typography from '../../typography'
import Avatar from '../avatar'
import Notification from '../notification'
import useProfile from 'src/hooks/useProfile'

const User = () => {
  const { activeCompany, isAuthenticated } = useProfile()

  const { isLoading } = useProfile()

  return (
    <UserContainer>
      {activeCompany && isAuthenticated && (
        <RentBtn className='hidden md:flex'>
          <Image src={'/icons/plus.svg'} alt='img' />
          <Typography
            type='button'
            weight='normal'
            color='dark'
            className='font-medium text-orange xl:ml-[8px] hidden xl:flex'
          >
            გაქირავება
          </Typography>
        </RentBtn>
      )}
      {!activeCompany && (
        <FavoriteBtn className='hidden md:flex'>
          <Image src='/icons/favorite.svg' alt='img' />
        </FavoriteBtn>
      )}
      <Notification />
      {isLoading ? <>Loading</> : <Avatar />}
    </UserContainer>
  )
}

export default User
