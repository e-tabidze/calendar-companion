import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'
import Typography from 'src/views/components/typography'
import Image from 'src/views/components/image'
import {useTranslation} from "next-i18next";
import { dynamicTranslateCities } from 'src/utils/translationUtils'

const Container = tw.div<TailwindComponent>``

interface Props {
  src: string
  city: string
  numberOfCars: number
  onClick: () => void
}

const CityCard: React.FC<Props> = ({ src, city, numberOfCars, onClick }) => {

  const {t} = useTranslation()

  return (
    <div className='mb-8 lg:mb-0 cursor-pointer transition-all hover:opacity-80' onClick={onClick}>
      <Container>
        <Image
            onError={(ev: any) => {
              ev.target.src = `/images/cities/default.png`
            }}
            src={src}
            className='rounded-2xl mb-4 max-w-full' alt='img' />
        <Typography
          type='h4'
          weight='normal'
          color='dark'
          className='text-2sm lg:text-md text-center xl:text-left'
        >
          {dynamicTranslateCities(city, t)}
        </Typography>
        <Typography type='body' color='light' className='text-sm text-black/50 text-center xl:text-left'>
          {numberOfCars} {t('car')}
        </Typography>
      </Container>
    </div>
  )
}

export default CityCard
