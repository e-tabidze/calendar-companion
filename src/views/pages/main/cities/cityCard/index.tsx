import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'
import Typography from 'src/views/components/typography'
import Image from 'src/views/components/image'

const Container = tw.div<TailwindComponent>``

interface Props {
  src: string
  city: string
  numberOfCars: number
}

const CityCard = ({ src, city, numberOfCars }: Props) => {
  return (
    <Container>
      <Image src={src} className='rounded-2xl mb-4 max-w-32 xl:w-auto xl:max-w-xs' alt='img' />
      <Typography type='h4' weight='normal' color='dark' className='text-center xl:text-left'>
        {city}
      </Typography>
      <Typography type='body' color='light' className='text-center xl:text-left'>
        {numberOfCars} ავტომობილი
      </Typography>
    </Container>
  )
}

export default CityCard
