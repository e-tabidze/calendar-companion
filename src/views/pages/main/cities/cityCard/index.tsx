import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'
import Typography from 'src/views/components/typography'
import Image from 'src/views/components/image'
import {useTranslation} from "next-i18next";

const Container = tw.div<TailwindComponent>``

interface Props {
  src: string
  city: string
  numberOfCars: number
  onClick: () => void
}

const CityCard: React.FC<Props> = ({ src, city, numberOfCars, onClick }) => {

  const {t} = useTranslation()
    const dynamicTranslateCities = (word:any) => {
        switch (word){
            case 'თბილისი':
                return t('backend_cities.tbilisi');
            case 'ბათუმი':
                return t('backend_cities.batumi');
            case 'გორი':
                return t('backend_cities.gori');
            case 'ზუგდიდი':
                return t('backend_cities.zugdidi');
            case 'თელავი':
                return t('backend_cities.telavi');
            case 'ქუთაისი':
                return t('backend_cities.kutaisi');
            case 'რუსთავი':
                return t('backend_cities.rustavi');
            case 'კასპი':
                return t('backend_cities.kaspi');
            case 'ხაშური':
                return t('backend_cities.khashuri');
            case 'დედოფლისწყარო':
                return t('backend_cities.dedofliswyaro');
            case 'წალენჯიხა':
                return t('backend_cities.tsalenjikha');
            default:
                return word
        }
    }

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
          {dynamicTranslateCities(city)}
        </Typography>
        <Typography type='body' color='light' className='text-sm text-black/50 text-center xl:text-left'>
          {numberOfCars} {t('car')}
        </Typography>
      </Container>
    </div>
  )
}

export default CityCard
