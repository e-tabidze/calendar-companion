import { RentBtn, FavoriteBtn, UserContainer } from './styles'
import Typography from '../../typography'
import Avatar from '../avatar'
import Notification from '../notification'
import useProfile from 'src/hooks/useProfile'
import { useRouter } from 'next/router'
import Icon from 'src/views/app/Icon'
import { useTranslation } from 'next-i18next'
import useFavourites from 'src/hooks/useFavourites'

const User = () => {
  const { activeCompany, isAuthenticated } = useProfile()
  const { userFavouritesCount } = useFavourites()
  const { t } = useTranslation()

  const router = useRouter()

  const handleRouteFavourites = () => router.push('/profile/favourites', undefined, { shallow: true, locale: '.' })

  const { isLoading } = useProfile()

  return (
    <UserContainer>
      {activeCompany && isAuthenticated && (
        <RentBtn type='button' className='hidden md:flex' onClick={() => router.push('/dashboard/new-product/')}>
          <Icon svgPath='plus' width={16} height={16} />
          <Typography
            type='button'
            weight='normal'
            color='dark'
            className='font-medium text-orange xl:ml-2 hidden xl:flex'
          >
            {t('rent')}
          </Typography>
        </RentBtn>
      )}
      {!activeCompany && (
        <FavoriteBtn className='hidden md:flex relative'>
          <Icon svgPath='favorite' width={24} height={24} className='fill-raisin-100' onClick={handleRouteFavourites} />
          <span className="bg-orange-100 text-white text-xs absolute rounded-full flex items-center justify-center w-4 h-4 absolute top-0 right-0 mt-1">{userFavouritesCount}</span>
        </FavoriteBtn>
      )}
      <Notification />
      {isLoading ? <>Loading</> : <Avatar />}
    </UserContainer>
  )
}

export default User
