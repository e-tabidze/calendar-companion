import { RentBtn,FavoriteBtn, UserContainer } from './styles'
import Image from '../../image'
import Typography from '../../typography'
import LanguagePicker from '../languagePicker'
import Avatar from '../avatar'
import Notification from "../notification";

interface Props {
    user: any
}
const User:React.FC<Props> = ({user}) => {
  return (
    <UserContainer>
        {/*{user=1 && <div>gbeijgbeigbei</div>}*/}
        {/*{user=1? <div>ggg</div>:<div>rrrr</div>}*/}
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
      <Avatar user={user}/>
    </UserContainer>
  )
}

export default User
