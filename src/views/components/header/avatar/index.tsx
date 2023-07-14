import Image from '../../image'
import Typography from '../../typography'
import { AvatarContainer, AvatarInnerContainer, AvatarResponsiveContainer } from './styles'

const Avatar = () => {
  return (
    <AvatarContainer>
      <AvatarInnerContainer>
        <Image src='/images/avatar.png' className='rounded-full' alt='avatar' />
      </AvatarInnerContainer>
      <AvatarResponsiveContainer>
        <Typography type='button' color='dark' weight='normal'>
          ზაური
        </Typography>
        <Image src='/icons/chevron.svg' alt='img' />
      </AvatarResponsiveContainer>
    </AvatarContainer>
  )
} 

export default Avatar
