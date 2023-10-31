import { RentBtn,FavoriteBtn, UserContainer } from './styles'
import Image from '../../image'
import Typography from '../../typography'
import LanguagePicker from '../languagePicker'
import Avatar from '../avatar'
import Notification from "../notification";
import useProfile from 'src/hooks/useProfile'

interface Props {
    user: any
}
const User:React.FC<Props> = ({user}) => {
  const {isLoading} = useProfile()
  return (
    <UserContainer>
        {user == 1 &&
            <RentBtn className="hidden md:flex">
                <Image src={'/icons/plus.svg'} alt='img'/>
                <Typography type='button' weight='normal' color='dark'
                            className='font-medium text-orange xl:ml-[8px] hidden xl:flex'>
                    გაქირავება
                </Typography>
            </RentBtn>
        }
      <LanguagePicker />
        {user == 0 &&
            <FavoriteBtn className="hidden md:flex">
                <Image src='/icons/favorite.svg' alt='img'/>
            </FavoriteBtn>
        }
        <Notification />
      {isLoading ? <>Loading</> : <Avatar user={user} />}
    </UserContainer>
  )
}

export default User
