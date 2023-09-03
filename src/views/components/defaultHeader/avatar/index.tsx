import { useContext } from 'react'
import { AuthContext } from 'src/@core/context/AuthContext'
import Image from '../../image'
import Typography from '../../typography'
import { AvatarContainer, AvatarInnerContainer, AvatarResponsiveContainer } from './styles'

const Avatar = () => {
  const { user } = useContext(AuthContext)
  
  return (
    <AvatarContainer>
      <AvatarInnerContainer>
        <Image src='/images/avatar.png' className='rounded-full' alt='avatar' />
      </AvatarInnerContainer>
      <AvatarResponsiveContainer>
        <Typography type='button' color='dark' weight='normal'>
          {user?.FirstName}
        </Typography>
        <Image src='/icons/chevron.svg' alt='img' />
      </AvatarResponsiveContainer>
    </AvatarContainer>
  )
}

export default Avatar
