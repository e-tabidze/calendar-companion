import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'
import Typography from 'src/views/components/typography'
import Image from 'src/views/components/image'

const Container = tw.div<TailwindComponent>``

interface Props {
  src: string
  city: string
  numberOfCars: number
  onClick: () => void
}

const CityCard: React.FC<Props> = ({ src, city, numberOfCars, onClick }) => {
  return (
    <div className='mb-8 lg:mb-0 cursor-pointer' onClick={onClick}>
      <Container>
        <Image src={src} className='rounded-2xl mb-4 max-w-full' alt='img' />
        <Typography
          type='h4'
          weight='normal'
          color='dark'
          className='text-2sm lg:text-md text-center xl:text-left'
        >
          {city}
        </Typography>
        <Typography type='body' color='light' className='text-sm text-black/50 text-center xl:text-left'>
          {numberOfCars} ავტომობილი
        </Typography>
      </Container>
    </div>
  )
}

export default CityCard
