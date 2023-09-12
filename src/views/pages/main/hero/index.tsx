import Filters from 'src/views/pages/main/filters'
import Typography from 'src/views/components/typography'
import { HeroContainer, Copy } from './styles'

const Hero = () => {
  return (
    <HeroContainer>
      <Copy>
        <Typography
          type='h1'
          className='mt-[120px] md:[mt-0] text-white font-bold  text-[20px] md:text-[40px] lg:text-[48px] xl:text-[54px] lg:leading-[64px] xl:leading-[78px]'
        >
          მიიღეთ მეტი, ვიდრე ავტომობილია
        </Typography>
        <Typography type='h3' className='text-white text-[16px] mt-3 hidden md:inline-block'>
          შეარჩიეთ სასურველი ავტომობილი ონლაინ და გაიმარტივეთ ქირაობის პროცესი. ისარგებლეთ დამატებითი სერვისებით და
          შეიქმენით მაქსიმალური კომფორტი.
        </Typography>
      </Copy>
      <Filters />
    </HeroContainer>
  )
}

export default Hero
