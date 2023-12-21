import { RentBtn, FavoriteBtn, UserContainer } from './styles'
import Typography from '../../typography'
import Avatar from '../avatar'
import Notification from '../notification'
import useProfile from 'src/hooks/useProfile'
import { useRouter } from 'next/router'
import Icon from 'src/views/app/Icon'

const User = () => {
  const { activeCompany, isAuthenticated } = useProfile()

  const router = useRouter()

  const handleRouteFavourites = () => router.push('/profile/favourites',undefined, { shallow: true,locale:"." })

  const { isLoading } = useProfile()

  return (
    <UserContainer>
      {activeCompany && isAuthenticated && (
        <RentBtn className='hidden md:flex' onClick={() => router.push('/dashboard/new-product/')}>
          <Icon svgPath='plus' width={16} height={16} />
          <Typography
            type='button'
            weight='normal'
            color='dark'
            className='font-medium text-orange xl:ml-2 hidden xl:flex'
          >
            გაქირავება
          </Typography>
        </RentBtn>
      )}
      {!activeCompany && (
        <FavoriteBtn className='hidden md:flex'>
          <Icon svgPath='favorite' width={22} height={25} className='fill-raisin-100' onClick={handleRouteFavourites} />
        </FavoriteBtn>
      )}
      <Notification />
      {isLoading ? <>Loading</> : <Avatar />}
    </UserContainer>
  )
}

export default User
