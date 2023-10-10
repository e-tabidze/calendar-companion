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
        <Typography type='button' color='dark' weight='normal' className="text-[#272A37] text-[14px] font-medium text-nowrap">
          name
        </Typography>
        <Image src='/icons/chevron.svg' alt='img' className="flex ml-[8px] transition-all" />
      </AvatarResponsiveContainer>
    </AvatarContainer>
  )
}

export default Avatar
