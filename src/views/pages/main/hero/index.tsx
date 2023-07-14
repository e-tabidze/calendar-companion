import Filters from 'src/views/pages/main/filters'
import Typography from 'src/views/components/typography'
import { HeroContainer, Copy } from './styles'

const Hero = () => {
  return (
    <HeroContainer>
      <Copy>
        <Typography
          type='h1'
          className='text-white font-bold max-w-screen-sm text-3md desktop:text-[54px] desktop:leading-tight desktop:heading-[78px]'
        >
          მიიღეთ მეტი, ვიდრე ავტომობილია
        </Typography>
        <Typography type='h3' className='text-white  max-w-lg text-base mt-4 hidden desktop:inline-block'>
          შეარჩიეთ სასურველი ავტომობილი ონლაინ და გაიმარტივეთ ქირაობის პროცესი. ისარგებლეთ დამატებითი სერვისებით და
          შეიქმენით მაქსიმალური კომფორტი.
        </Typography>
      </Copy>
      <Filters />
    </HeroContainer>
  )
}

export default Hero
